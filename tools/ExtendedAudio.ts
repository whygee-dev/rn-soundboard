import { Audio } from "expo-av";
import { INTERRUPTION_MODE_ANDROID_DUCK_OTHERS } from "expo-av/build/Audio";

/**
 * Singleton class for Audio in order to set audio mode only one time in the whole app.
 */
export class ExtendedAudio {
  instance: typeof Audio | null = null;

  constructor() {}

  async getInstance() {
    if (!this.instance) {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      });

      this.instance = Audio;
    }

    return this.instance;
  }
}
