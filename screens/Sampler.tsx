import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { dimensions, MAX_COLUMNS, MAX_ROWS } from "../tools/constants";
import Pad from "../components/Pad";
import { selectActiveSamples } from "../redux/slices/samplesSlice";
import Modal from "react-native-modal";
import { Sample } from "../redux/types";
import { primaryBlue } from "../theme/colors";
import Text from "../components/Text";
import Recorder from "../components/Recorder";
import Settings from "../components/Settings";
import FreeSoundDownloader from "../components/FreeSoundDownloader";

const Sampler = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const padInEditionInfo = useRef<{ position: number; sample: Sample }>();
  const samples = useSelector(selectActiveSamples);

  const generateGridArray = useCallback(() => {
    if (samples.length !== MAX_ROWS * MAX_COLUMNS) {
      console.error(`Samples length mismatch ${samples.length} !== ${MAX_ROWS * MAX_COLUMNS}`);

      return [];
    }

    const result = [];

    for (let i = 0; i < MAX_ROWS; i++) {
      const row = [];

      for (let j = 0; j < MAX_COLUMNS; j++) {
        const index = i * MAX_ROWS + j;

        const sample = samples[index];

        row.push(<Pad onEdit={() => onEditPad(sample, index)} sample={sample} key={sample.id + String(i) + String(j) + sample.name} />);
      }

      result.push(row);
    }

    return result;
  }, [samples]);

  const [modalShown, setModalShown] = useState(false);

  const onClose = () => {
    setModalShown(false);
  };

  const onEditPad = (sample: Sample, position: number) => {
    padInEditionInfo.current = { sample, position };
    setModalShown(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {generateGridArray().map((row, i) => {
          return (
            <View style={styles.row} key={i}>
              {row.map((pad) => {
                return pad;
              })}
            </View>
          );
        })}
      </View>
      <Modal
        style={{ padding: 0, margin: 0, justifyContent: "flex-end" }}
        isVisible={modalShown}
        onBackdropPress={() => onClose()}
        onSwipeComplete={() => onClose()}
        swipeDirection="down"
        animationIn={"slideInUp"}
      >
        <View style={styles.modalContainer}>
          <View style={styles.swipableIndicator}></View>

          <View style={styles.content}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={() => setActiveMenu(1)} style={[styles.menuItem, activeMenu === 1 ? styles.activeMenu : undefined]}>
                <Text>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveMenu(2)} style={[styles.menuItem, activeMenu === 2 ? styles.activeMenu : undefined]}>
                <Text>FreeSound</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveMenu(3)} style={[styles.menuItem, activeMenu === 3 ? styles.activeMenu : undefined]}>
                <Text>Record</Text>
              </TouchableOpacity>
            </View>

            {activeMenu === 1 && <Settings close={onClose} padInfo={padInEditionInfo} />}
            {activeMenu === 2 && <FreeSoundDownloader close={onClose} padInfo={padInEditionInfo} />}
            {activeMenu === 3 && <Recorder close={onClose} padInfo={padInEditionInfo} />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: dimensions.height / 2 - dimensions.height / 1.75 / 2,
  },

  gridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    height: dimensions.height / 1.75,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 18,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  modalContainer: {
    height: dimensions.height / 2,
    width: dimensions.width,
    backgroundColor: "#7209b7",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    position: "absolute",
    bottom: 0,
  },

  swipableIndicator: {
    position: "absolute",
    top: 20,
    left: dimensions.width / 2 - 25,
    width: 50,
    height: 5,
    backgroundColor: "#050527",
    borderRadius: 8,
  },

  content: {
    position: "absolute",
    width: dimensions.width,
    top: 50,
  },

  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuItem: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  activeMenu: {
    borderBottomWidth: 2,
    borderColor: "#fff",
  },
});

export default Sampler;
