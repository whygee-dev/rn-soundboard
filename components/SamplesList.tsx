import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Sample, SampleType } from "../redux/types";
import SampleCard from "./SampleCard";

type Props = {
  samples: Sample[];
};

const SamplesList = (props: Props) => {
  return (
    <ScrollView style={styles.scrollView} persistentScrollbar>
      {props.samples.map((sample) => {
        return <SampleCard removable={sample.type !== SampleType.DEFAULT} key={sample.id + sample.name} sample={sample} />;
      })}
    </ScrollView>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: (window.height * 4) / 5 - 50,
    position: "absolute",
    top: window.height / 5,
    width: window.width,
  },
});

export default SamplesList;
