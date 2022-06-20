import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import Text from "./Text";
import { SampleFilter } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, addFilter, removeFilter } from "../redux/slices/samplesSlice";

type Props = {
  filters: SampleFilter[];
};

const Filters = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userFilters = useSelector(selectFilters);

  const onFilterSelect = (filter: SampleFilter) => {
    if (isFilterIn(filter, userFilters)) {
      dispatch(removeFilter(filter));
    } else {
      dispatch(addFilter(filter));
    }
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const isFilterIn = (filter: SampleFilter, filters: SampleFilter[]) => {
    return filters.map((f) => f.type).includes(filter.type);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalOpen(true)} style={styles.container}>
        <Icon name="filter" size={20} color="#fff"></Icon>
      </TouchableOpacity>
      <Modal
        style={{ padding: 0, margin: 0 }}
        isVisible={modalOpen}
        onBackdropPress={() => onClose()}
        onSwipeComplete={() => onClose()}
        swipeDirection="up"
        animationIn={"slideInDown"}
        animationOut={"bounceInUp"}
      >
        <View style={styles.filters}>
          <View style={styles.swipableIndicator}></View>
          {props.filters.map((f) => {
            return (
              <TouchableOpacity key={f.display} onPress={() => onFilterSelect(f)}>
                <View style={[styles.filter, { backgroundColor: isFilterIn(f, userFilters) ? "#f72585" : "#b5179e" }]}>
                  <Text color="#fff">{f.display}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "white",
  },

  filters: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: window.height / 3.25,
    width: window.width,
    backgroundColor: "#7209b7",
    position: "absolute",
    top: 0,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  filter: {
    margin: window.height / 100,
    borderRadius: 10,
    padding: 8,
  },

  swipableIndicator: {
    position: "absolute",
    bottom: 20,
    left: window.width / 2 - 25,
    width: 50,
    height: 5,
    backgroundColor: "#050527",
    borderRadius: 8,
  },
});

export default Filters;
