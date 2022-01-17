export type Episode = {
  id: string;

  number: number;
  name: string;
  aired: string | null;
  duration: number | null;
};

export type FansubSubtitles = {
  [fansub: string]: string
};

export type EpisodeFansubs = {
  [episode: number]: FansubSubtitles
};
