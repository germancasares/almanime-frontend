declare module 'wfplayer' {
  interface Options {
    container: HTMLDivElement,
    mediaElement: HTMLVideoElement,
  }

  declare class WFPlayer {
    constructor(options: Options);

    /**
     * Loads instance
     */
    load(mediaElement: HTMLVideoElement | string): void;

    /**
     * Destroy instance
     */
    destroy(): void;
  }

  export default WFPlayer;
}
