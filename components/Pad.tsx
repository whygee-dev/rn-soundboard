import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { dimensions } from "../tools/constants";
import { AVPlaybackStatus, Sample, SampleType } from "../redux/types";
import { ExtendedAudio } from "../tools/ExtendedAudio";
import { Audio } from "expo-av";
import { primaryBlue } from "../theme/colors";
import { AVPlaybackSource, AVPlaybackStatus as OGAV } from "expo-av/build/AV.types";
import { soundMap } from "../tools/SoundMap";

type Props = { sample: Sample; onEdit: () => any };

const Pad = React.memo((props: Props) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const soundRef = useRef<Audio.Sound>();

  const onLongPress = () => props.onEdit();

  const onPositionUpdate = async (s: OGAV, end?: number) => {
    const status = s as AVPlaybackStatus;

    if (end && status && status.positionMillis && soundRef.current) {
      if (status.positionMillis >= end * 1000) {
        console.log("stopping");
        await soundRef.current.stopAsync();
      }
      console.log("pos", status.positionMillis, end);
    }
  };

  const onPress = async () => {
    console.log(props.sample);
    const key = props.sample.id + (props.sample.start ? "start" + props.sample.start : "") + (props.sample.end ? "end" + props.sample.end : "");
    const cached = soundMap.get(key);

    if (cached && cached.sound._loaded) {
      await cached.sound.setPositionAsync(cached.start * 1000 || 0);
      await cached.sound.setProgressUpdateIntervalAsync(100);
      await cached.sound.setOnPlaybackStatusUpdate((s: OGAV) => onPositionUpdate(s, cached.end));
      await cached.sound.playAsync();

      soundRef.current = cached.sound;
      console.log("Using cache", cached.start, cached.end);
    } else {
      const source = props.sample.type === SampleType.DEFAULT ? (props.sample.path as AVPlaybackSource) : { uri: String(props.sample.path) };
      const initialStatus = props.sample.start ? { positionMillis: props.sample.start * 1000, progressUpdateIntervalMillis: 100 } : undefined;
      const onPlaybackStatusUpdate = (s: OGAV) => onPositionUpdate(s, props.sample.end);

      const { sound } = await (await new ExtendedAudio().getInstance()).Sound.createAsync(source, initialStatus, onPlaybackStatusUpdate);

      soundRef.current = sound;
      await sound.playAsync();

      soundMap.set(key, { sound, start: props.sample.start || 0, end: props.sample.end || props.sample.duration });
    }
  };

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound " + props.sample.path);
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    // @ts-ignore
    <Pressable unstable_pressDelay={0} android_disableSound style={styles.container} onLongPress={onLongPress} onPress={onPress}>
      <View style={styles.borderBottom}></View>
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  container: {
    width: dimensions.width / 6,
    height: dimensions.width / 6,
    backgroundColor: primaryBlue,
    position: "relative",
    borderRadius: 10,
    zIndex: 1,
  },
  borderBottom: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: "100%",
    height: 8,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Pad;
