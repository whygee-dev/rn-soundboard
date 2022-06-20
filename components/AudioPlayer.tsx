import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { default as FontAwesomeIcon } from "react-native-vector-icons/FontAwesome";
import { AVPlaybackStatus, Sample, SampleType } from "../redux/types";
import { Audio } from "expo-av";
import Text from "./Text";
import * as Progress from "react-native-progress";
import { INTERRUPTION_MODE_ANDROID_DUCK_OTHERS } from "expo-av/build/Audio";
import { AVPlaybackSource } from "expo-av/build/AV.types";

type Props = {
  sample: Sample;
};

const AudioPlayer = (props: Props) => {
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();

  const playAudio = async () => {
    setLoading(true);
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    });
    const { sound } = await Audio.Sound.createAsync(
      props.sample.type === SampleType.DEFAULT ? (props.sample.path as AVPlaybackSource) : { uri: String(props.sample.path) }
    );

    sound._onPlaybackStatusUpdate = (v) => setPlaybackStatus(v as AVPlaybackStatus);
    setSound(sound);
    await sound.playAsync();
    setTimeout(() => setLoading(false), 300);
  };

  const pauseAudio = async () => {
    await sound?.pauseAsync();
  };

  const control = async () => {
    if (playbackStatus?.isPlaying) {
      await pauseAudio();
    } else {
      await playAudio();
    }
  };

  const positionPercentage =
    playbackStatus?.positionMillis && playbackStatus?.durationMillis ? playbackStatus.positionMillis / playbackStatus.durationMillis : 0;

  const formatMs = (ms: number) => {
    const s = Math.round(ms / 1000);
    return s < 10 ? "0" + s : s;
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound " + props.sample.path);
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating size={30} color="#000" style={styles.loader} />
      ) : (
        <TouchableOpacity onPress={control} style={styles.touchable}>
          {playbackStatus?.isPlaying ? (
            <FontAwesomeIcon name="pause" size={22}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon name="play" size={22}></FontAwesomeIcon>
          )}
        </TouchableOpacity>
      )}

      {!loading && playbackStatus?.isPlaying && (
        <Progress.Bar style={styles.progress} progress={positionPercentage} height={5} width={100} color="#000" />
      )}

      <Text style={styles.position} size={14}>
        {playbackStatus?.isPlaying && playbackStatus?.positionMillis ? formatMs(playbackStatus.positionMillis) : "--"} /
        {playbackStatus?.isPlaying && playbackStatus?.durationMillis ? formatMs(playbackStatus.durationMillis) : "--"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "transparent",
    backgroundColor: "white",
    position: "relative",
    width: "75%",
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },

  touchable: {
    top: 15,
    left: 15,
    width: 30,
  },

  loader: {
    top: 10,
  },

  position: {
    position: "absolute",
    top: 16,
    left: "75%",
    color: "#000",
  },

  progress: {
    top: 1,
    left: 50,
    borderColor: "#000",
  },
});

export default AudioPlayer;
