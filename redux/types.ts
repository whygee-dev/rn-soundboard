export type Track = {
  trackName: string;
  artistName: string;
  previewUrl: string;
  trackId: number;
  artworkUrl100: string;
  kind: string;
  description?: string;
  collectionId?: number;
  collectionName?: string;
  wrapperType?: string;
};

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

export type Filter = {
  name: string;
  display: string;
};
