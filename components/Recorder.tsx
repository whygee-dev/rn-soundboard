import React, { MutableRefObject, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Button from "./Button";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import { addActiveSampleAt, addLibrarySample, selectLibrarySamples } from "../redux/slices/samplesSlice";
import * as FileSystem from "expo-file-system";
import { Sample, SampleType } from "../redux/types";
import { useSelector } from "../redux/hooks";

type Props = {
  padInfo: MutableRefObject<{ position: number; sample: Sample } | undefined>;
  close: () => any;
};

const Recorder = (props: Props) => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [shouldAskForName, setShouldAskForName] = useState(false);
  const [name, setName] = useState("");
  const librarySamples = useSelector(selectLibrarySamples);
  const dispatch = useDispatch();

  const startRecording = async () => {
    setShouldAskForName(false);
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    await recording?.stopAndUnloadAsync();
    setShouldAskForName(true);
  };

  const saveRecording = async () => {
    const uri = recording?.getURI();

    if (props.padInfo.current === undefined) {
      console.warn("Couldn't resolve edited pad position");
    } else if (uri) {
      const split = uri.split("/");
      const id = split[split.length - 1];
      const newLocation = FileSystem.documentDirectory + id;

      await FileSystem.moveAsync({ from: uri, to: newLocation });

      if (!(await FileSystem.getInfoAsync(newLocation)).exists) {
        console.warn("Failed to save recorded audio");
      } else {
        if (librarySamples.find((s) => s.name === name)) {
          console.warn("A sample with the specified name already exists. Please choose another one");
        } else {
          const sample = { name, path: FileSystem.documentDirectory + id, id: split[split.length - 1], type: SampleType.RECORDED };

          props.close();

          dispatch(
            addActiveSampleAt({
              position: props.padInfo.current.position,
              sample,
            })
          );

          dispatch(addLibrarySample(sample));
        }
      }
    } else {
      console.log("Failed to save recorded audio");
    }

    setRecording(undefined);
  };

  return (
    <View style={styles.container}>
      <Button title={recording && !shouldAskForName ? "Stop Recording" : "Start Recording"} onPress={recording ? stopRecording : startRecording} />

      {shouldAskForName && (
        <>
          <TextInput style={styles.input} onChangeText={setName} value={name}></TextInput>
          <Button title={"Save"} onPress={saveRecording} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Recorder;
