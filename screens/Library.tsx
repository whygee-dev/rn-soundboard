import React from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Text from "../components/Text";
import Filters from "../components/Filters";
import { selectFilteredLibrarySamples, selectLibrarySamples } from "../redux/slices/samplesSlice";
import { SAMPLE_FILTERS } from "../redux/types";
import SamplesList from "../components/SamplesList";

const Library = () => {
  const samples = useSelector(selectFilteredLibrarySamples);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Filters filters={SAMPLE_FILTERS}></Filters>
      </View>

      {samples.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyText} size={24} numberOfLines={2}>
            Your list is emptier than Eren Yeager's eyes :(
          </Text>

          <Image style={{ width: 300, height: 200 }} source={{ uri: "https://i.ibb.co/3sqN6Tp/eren-empty-eyes.webp" }} />
        </View>
      ) : (
        <SamplesList samples={samples}></SamplesList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    position: "absolute",
    top: 10,
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 2,
    height: 95,
  },
  emptyListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 30,
  },
});

export default Library;
