import React from "react";
import { Text, StyleSheet, Pressable, GestureResponderEvent, ViewStyle, TextStyle, TouchableOpacity } from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  containerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle;
  children?: any;
};

export default function Button(props: Props) {
  const { onPress, title = "Save" } = props;

  const containerStyles = Array.isArray(props.containerStyle) ? [styles.button, ...props.containerStyle] : [styles.button, props.containerStyle];

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Text style={[styles.text, props.titleStyle]}>{title}</Text>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#232356",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
