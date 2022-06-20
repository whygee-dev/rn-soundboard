import { Dimensions } from "react-native";
import { Sample, SampleType } from "../redux/types";
import { Asset } from "expo-asset";
import Constants from "expo-constants";

const { manifest } = Constants;

export const HOST = `http://${manifest?.debuggerHost}`;
export const MAX_ROWS = 4;
export const MAX_COLUMNS = 4;

export const SAMPLES_PATH = `../assets/samples`;
export const DEFAULT_SAMPLES_PATH = `${SAMPLES_PATH}/default/`;

//console.log(Asset.fromModule(require("../images/bg.png")));

export const DEFAULT_SAMPLES: Sample[] = [
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "808a-clap.wav"),
    id: 0,
    name: "808 Clap",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "808a-hihat-closed.wav"),
    id: 1,
    name: "808 Closed Hihat",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "808a-snare.wav"),
    id: 2,
    name: "808 Snare",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "808a-tom-hi.wav"),
    id: 3,
    name: "808 Hitom",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "bass2.wav"),
    id: 4,
    name: "Bass",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "clap.wav"),
    id: 5,
    name: "Clap",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "floortom2.wav"),
    id: 6,
    name: "Floor tom",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "fm-closed-hi-hat.wav"),
    id: 7,
    name: "FM Closed Hihat",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "fm-hi-tom.wav"),
    id: 8,
    name: "FM Hitom",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "snare_2.wav"),
    id: 9,
    name: "FM Snare",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "hihat-closed.wav"),
    id: 10,
    name: "Closed Hihat",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "hihat.wav"),
    id: 11,
    name: "Hihat",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "kick.wav"),
    id: 12,
    name: "Kick",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "snare.wav"),
    id: 13,
    name: "Snare",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "snared15.wav"),
    id: 14,
    name: "Snare 15",
  },
  {
    type: SampleType.DEFAULT,
    path: require(DEFAULT_SAMPLES_PATH + "tom.wav"),
    id: 15,
    name: "Tom",
  },
];

export const dimensions = Dimensions.get("window");
