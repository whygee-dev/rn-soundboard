export type Sample = {
  type: SampleType;
  path: string | number;
  id: number | string;
  name: string;
  duration?: number | string;
  start?: number;
  end?: number;
};

export enum SampleType {
  "DEFAULT",
  "FREESOUND",
  "RECORDED",
}

export type SampleFilter = {
  type: SampleType;
  display: string;
};

export const SAMPLE_FILTERS: SampleFilter[] = [
  { type: SampleType.DEFAULT, display: "Default" },
  { type: SampleType.FREESOUND, display: "FreeSound" },
  { type: SampleType.RECORDED, display: "Recorded" },
];

export type AVPlaybackStatus = {
  isLoaded: true;
  androidImplementation?: string;
  uri: string;
  progressUpdateIntervalMillis: number;
  durationMillis?: number;
  positionMillis: number;
  playableDurationMillis?: number;
  seekMillisToleranceBefore?: number;
  seekMillisToleranceAfter?: number;
  shouldPlay: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  didJustFinish: boolean;
} | null;
