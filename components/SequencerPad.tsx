import React from "react";
import { View, StyleSheet } from "react-native";
import { dimensions } from "../tools/constants";

type Props = {
  rotate: number;
  width: number;
  height: number;
  color: string;
  top: number;
  left: number;
  translateX: number;
  translateY: number;
  scale: number;
};

const SequencerPad = (props: Props) => {
  console.log(props.rotate);
  return (
    <View
      style={[
        styles.container,
        {
          position: "absolute",
          top: props.top,
          left: props.left,
          width: props.width,
          height: props.height,
          backgroundColor: props.color,
          transform: [{ rotate: props.rotate + "deg" }, { translateX: props.translateX }, { translateY: props.translateY }, { scale: props.scale }],
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100000,
  },
});

export default SequencerPad;
