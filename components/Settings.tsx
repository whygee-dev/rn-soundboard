import React, { MutableRefObject, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
// @ts-ignore
import { Picker } from "@react-native-picker/picker";
import { Sample } from "../redux/types";
import { addActiveSampleAt, selectLibrarySamples, updateLibrarySample } from "../redux/slices/samplesSlice";
import { useSelector } from "../redux/hooks";
import Button from "./Button";
import { useDispatch } from "react-redux";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Text from "./Text";
import { mediumPink } from "../theme/colors";

type Props = {
  padInfo: MutableRefObject<{ position: number; sample: Sample } | undefined>;
  close: () => any;
};

const Settings = (props: Props) => {
  const samples = useSelector(selectLibrarySamples);

  const [selectedSample, setSelectedSample] = useState(samples.find((s) => s.id === props.padInfo.current?.sample.id));
  const [trimmingInfo, setTrimmingInfo] = useState({ start: selectedSample?.start || 0, end: selectedSample?.end || selectedSample?.duration });

  console.log("selected", selectedSample);
  useEffect(() => {
    setTrimmingInfo({ start: selectedSample?.start || 0, end: selectedSample?.end || selectedSample?.duration });
  }, [selectedSample]);

  const dispatch = useDispatch();

  const saveSettings = () => {
    if (props.padInfo.current === undefined) {
      console.warn("Couldn't resolve edited pad position");

      return;
    }

    if (!selectedSample) {
      console.warn("A sample must be selected");

      return;
    }

    const sample = { position: props.padInfo.current.position, sample: selectedSample };

    if (selectedSample.duration !== 0) {
      sample.sample = { ...selectedSample, start: trimmingInfo.start, end: Number(trimmingInfo.end) };
    }

    props.close();
    dispatch(addActiveSampleAt(sample));
    dispatch(updateLibrarySample(sample.sample));
  };

  const handleTrimmerChange = (values: number[]) => {
    setTrimmingInfo({ start: values[0], end: values[1] });
  };

  return (
    <View style={styles.container}>
      <Picker
        dropdownIconColor="#ffffff"
        style={styles.picker}
        onValueChange={(value: Sample) => setSelectedSample(value)}
        selectedValue={selectedSample}
      >
        {samples.map((s, index) => (
          <Picker.Item style={styles.pickerItem} label={s.name} value={s} key={s.id + s.name} />
        ))}
      </Picker>

      {selectedSample?.duration && +selectedSample.duration >= 1 && (
        <View>
          <MultiSlider
            selectedStyle={styles.selectedSlider}
            markerStyle={styles.marker}
            min={0}
            max={Number(selectedSample.duration)}
            values={[trimmingInfo.start, Number(trimmingInfo.end) || Number(selectedSample.duration)]}
            onValuesChange={handleTrimmerChange}
            containerStyle={styles.sliderContainer}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>
              {trimmingInfo.start}s - {Math.ceil(Number(trimmingInfo.end))}s
            </Text>
          </View>
        </View>
      )}
      <Button containerStyle={styles.saveButton} title={"Save"} onPress={saveSettings} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: Dimensions.get("window").height / 2.6,
    justifyContent: "space-between",
    position: "relative",
  },
  marker: {
    backgroundColor: mediumPink,
  },
  selectedSlider: {
    backgroundColor: mediumPink,
  },
  picker: {
    marginHorizontal: Dimensions.get("window").width / 8,
    backgroundColor: mediumPink,
    color: "white",
    marginTop: 50,
  },
  pickerItem: {
    backgroundColor: mediumPink,
    color: "white",
  },
  sliderContainer: { alignSelf: "center" },
  borderBottom: {},
  saveButton: {
    marginHorizontal: Dimensions.get("window").width / 3,
  },
});

export default Settings;
