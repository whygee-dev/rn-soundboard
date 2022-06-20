import React from "react";
import { StyleSheet, View } from "react-native";
import SequencerPad from "../components/SequencerPad";

import Text from "../components/Text";
import { dimensions } from "../tools/constants";

const INITIAL_DIMENSION = 30;
const DIMENSION_STEP = 5;
const INITIAL_TOP = 10;
const TOP_STEP = 30;

const Sequencer = () => {
  const arrays: number[][] = new Array(5).fill(new Array(8).fill(0));
  const colors = ["#fff", "#000", "#123", "#333", "#222"];

  console.log(arrays[0].length);

  return (
    <View style={styles.container}>
      {arrays.map((sequence, i) =>
        sequence.map((_, j: number) => {
          return (
            <SequencerPad
              rotate={(360 / sequence.length) * j}
              top={dimensions.height / 2}
              left={dimensions.width / 2 - 15}
              translateX={dimensions.width / 3.2 - 25 * i}
              translateY={dimensions.width / 3.2 - 25 * i}
              scale={1 - i * 0.15}
              width={INITIAL_DIMENSION}
              height={INITIAL_DIMENSION}
              color={colors[i]}
              key={String(i) + String(j)}
            />
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});

export default Sequencer;
