import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { MutableRefObject, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Dimensions, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectFetchTimeout, setFetchTimeout } from "../redux/slices/extrasSlice";
import { Sample, SampleType } from "../redux/types";
import Button from "./Button";
import * as FileSystem from "expo-file-system";
import { addActiveSampleAt, addLibrarySample, selectLibrarySamples } from "../redux/slices/samplesSlice";
import { now } from "../tools/Date";

type Props = {
  padInfo: MutableRefObject<{ position: number; sample: Sample } | undefined>;
  close: () => any;
};

type FreeSoundItem = {
  name: string;
  id: number;
  username: string;
};

const FreeSoundDownloader = (props: Props) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<FreeSoundItem[]>([]);
  const [selectedResult, setSelectedResult] = useState<FreeSoundItem>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const librarySamples = useSelector(selectLibrarySamples);
  const fetchTimeout = useSelector(selectFetchTimeout);

  const searchQuery = async (search: string) => {
    if (search.replace(/\s/g, "") === "") return;

    setLoading(true);

    try {
      const results =
        (await axios.get(`https://freesound.org/apiv2/search/text?query=${search}&token=${process.env.FREESOUND_TOKEN}`)).data?.results || [];
      setResults(results);
      results.length > 0 && setSelectedResult(results[0]);
      dispatch(setFetchTimeout(null));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search || search.length === 0) {
      setResults([]);

      if (fetchTimeout) clearTimeout(fetchTimeout);

      return;
    }

    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    dispatch(setFetchTimeout(setTimeout(() => searchQuery(search), 1000)));
  }, [search]);

  const download = async () => {
    setLoading(true);

    if (props.padInfo.current === undefined) {
      console.warn("Couldn't resolve edited pad position, please close this modal and reopen it.");
      return;
    }

    if (!selectedResult) {
      console.warn("Please select a sample to download");
      return;
    }

    selectedResult.name = selectedResult.name + " " + now();

    if (librarySamples.find((s) => selectedResult.name === s.name)) {
      console.warn("You have already a local/downloaded sample named " + selectedResult.name);
      return;
    }

    const instance = (await axios.get(`https://freesound.org/apiv2/sounds/${selectedResult.id}?token=${process.env.FREESOUND_TOKEN}`)).data;

    if (!instance) {
      console.warn("Error fetching Free Sound");
      return;
    }

    const download = await FileSystem.downloadAsync(instance.previews["preview-hq-mp3"], FileSystem.documentDirectory + selectedResult.name + ".mp3");

    const sample = {
      name: selectedResult.name,
      path: download.uri,
      id: selectedResult.id,
      type: SampleType.FREESOUND,
      duration: instance.duration,
    };

    props.close();
    dispatch(
      addActiveSampleAt({
        position: props.padInfo.current.position,
        sample,
      })
    );

    dispatch(addLibrarySample(sample));

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a sample"
        placeholderTextColor="#ffffff"
        style={styles.input}
        onChangeText={setSearch}
        value={search}
      ></TextInput>

      {results.length > 0 && (
        <>
          <Picker style={styles.picker} onValueChange={(value: FreeSoundItem) => setSelectedResult(value)} selectedValue={selectedResult}>
            {results.map((s, index) => (
              <Picker.Item style={styles.pickerItem} label={s.name} value={s} key={s.id} />
            ))}
          </Picker>
          {loading ? <ActivityIndicator size={48} color="#b5179e" /> : <Button title="Save" onPress={download}></Button>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: Dimensions.get("window").height / 2.6,
    justifyContent: "space-between",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  itemName: {
    maxWidth: "80%",
  },
  picker: {
    marginHorizontal: Dimensions.get("window").width / 8,
    backgroundColor: "#b5179e",
    color: "white",
  },
  pickerItem: {
    backgroundColor: "#b5179e",
    color: "white",
  },
  input: {
    height: 40,
    marginTop: 40,
    marginHorizontal: Dimensions.get("window").width / 8,
    borderWidth: 0,
    borderRadius: 8,
    padding: 10,
    color: "white",
    backgroundColor: "#b5179e",
  },
  flatlist: {
    flexGrow: 1,
    padding: 10,
  },
});

export default FreeSoundDownloader;
