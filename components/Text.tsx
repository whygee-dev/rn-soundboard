import React from "react";
import { Text, TextStyle } from "react-native";

type Props = {
  children?: any;
  color?: string;
  size?: number;
  style?: TextStyle;
  numberOfLines?: number;
};

const _Text = (props: Props) => {
  return (
    <Text
      numberOfLines={props.numberOfLines || 1}
      adjustsFontSizeToFit
      style={[{ color: props.color || "#fff", fontSize: props.size || 16, fontFamily: "Poppins-Regular" }, props.style]}
    >
      {props.children}
    </Text>
  );
};

export default _Text;
