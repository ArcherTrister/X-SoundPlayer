/**
 * 播放器
 */
export enum Player {
  afplay = 0,
  aplay,
  ffplay,
  mpg123,
  mpg321,
}

/**
 * 播放配置
 * @property soundPath {string} 音频文件路径
 * @property player {Player} 播放器
 * @property time {number?} 播放时长
 * @property volume {number} 播放音量
 */
export interface PlayOptions {
  /**
   * 音频文件路径
   * @type {string}
   */
  soundPath: string;
  /**
   * 播放器
   * @type {Player}
   */
  player?: Player;
  /**
   * 播放时长
   * @type {number?}
   */
  time?: number | undefined;
  /**
   * 播放音量
   * @type {number}
   */
  volume: number;
}

export interface SoundPlayer {
  /**
   * 播放
   * @typedef { import('./xxx').PlayOptions } PlayOptions
   * @param options 播放配置
   * @returns
   */
  play: (options: PlayOptions) => Promise<void>;
}
