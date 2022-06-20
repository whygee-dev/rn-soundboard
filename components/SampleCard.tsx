import React from "react";
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { Sample } from "../redux/types";
import Text from "./Text";
import { useDispatch } from "react-redux";
import { removeLibrarySample } from "../redux/slices/samplesSlice";
import MusicPlayer from "./AudioPlayer";
import Icon from "react-native-vector-icons/Entypo";
import { blue, lightPink } from "../theme/colors";

type Props = {
  sample: Sample;
  removable?: boolean;
};

const SampleCard = (props: Props) => {
  const dispatch = useDispatch();

  const removeFromList = async () => {
    dispatch(removeLibrarySample(props.sample));
  };

  return (
    <View style={styles.container}>
      <View style={styles.infosContainer}>
        <Text numberOfLines={2}>{props.sample.name}</Text>

        <View style={styles.row}>
          <MusicPlayer sample={props.sample}></MusicPlayer>

          {props.removable && (
            <View style={[styles.remove]}>
              <TouchableOpacity onPress={removeFromList}>
                <Icon name="trash" size={24} color="#fff"></Icon>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: window.width / 8,
    flexDirection: "row",
    backgroundColor: blue,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  infosContainer: {
    width: window.width - 120,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  artwork: {
    height: 90,
    width: 90,
    marginRight: 10,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  remove: {
    backgroundColor: lightPink,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "12.5%",
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default SampleCard;
