import { exec } from "child_process";
import { SoundPlayer, PlayOptions, Player } from "./types";

export type { SoundPlayer, PlayOptions, Player } from "./types";

/**
 * MAC PLAY COMMAND
 * @param {string!} path 文件路径
 * @param {number!} time 播放时长
 * @param {number!} volume 音量
 * @returns {string} 命令行
 */
const macPlayCommand = (path: string, time: number, volume: number): string =>
  `afplay "${path}" -d ${time} -v ${volume}`;

/**
 * WINDOW PLAY COMMANDS
 * @param {string!} path 文件路径
 * @param {number!} time 播放时长
 * @returns {string} 命令行
 */
const windowPlayCommand = (path: string, time: number): string =>
  `powershell -c Add-Type -AssemblyName presentationCore;$mediaPlayer = (New-Object -TypeName Media.SoundPlayer "${path}");$mediaPlayer.Play();Start-Sleep -s ${time};$mediaPlayer.Stop();Exit;`;

/**
 * LINUX PLAY COMMAND
 * @param {string!} path 文件路径
 * @param {number!} time 播放时长
 * @returns {string} 命令行
 */
const linuxPlayCommand = (path: string, time: number): string =>
  `aplay "${path}" -d ${time} -N`;

export const soundPlayer: SoundPlayer = {
  /**
   * 播放
   * @param options 播放配置
   * @returns
   */
  async play(options: PlayOptions): Promise<void> {
    /**
     * Window: soundplayer's does not support setting the volume, and only supports audio files in WAV format.
     * Linux: If the system is not integrated, you need to install a third-party package.
     * Mac: afplay's volume is from 0 to 255, default is 1. However, volume > 2 usually result in distortion.
     * Therefore, it is better to limit the volume on Mac, and set a common scale of 0 to 1 for simplicity
     */

    let playCommand: string;
    options.time =
      options.time === undefined || options.time <= 0 ? 3 : options.time;
    options.volume = options.volume <= 0 ? 2 : options.volume;
    switch (options.player) {
      case Player.afplay:
        playCommand = `afplay "${options.soundPath}" -d ${options.time} -v ${options.volume}`;
        break;
      case Player.aplay:
        playCommand = `aplay "${options.soundPath}" -d ${options.time} -N`;
        break;
      case Player.ffplay:
        //stdio: 'ignore'
        playCommand = `ffplay "${options.soundPath}" -nodisp -autoexit -volume ${options.volume}`;
        break;
      case Player.mpg123:
        //-a device
        playCommand = `mpg123 "${options.soundPath}" -g ${options.volume}`;
        break;
      case Player.mpg321:
        //-a device
        playCommand = `mpg321 "${options.soundPath}" -g ${options.volume}`;
        break;
      default:
        if (
          getExtension(options.soundPath) !== ".wav" &&
          process.platform === "win32"
        )
          throw new Error(
            "This player only supports audio files in WAV format"
          );
        playCommand =
          process.platform === "darwin"
            ? macPlayCommand(options.soundPath, options.time, options.volume)
            : process.platform === "win32"
            ? windowPlayCommand(options.soundPath, options.time)
            : linuxPlayCommand(options.soundPath, options.time);
        break;
    }
    return new Promise((resolve, reject) => {
      exec(playCommand, (err, _stdout, stderr) => {
        if (err || stderr) {
          reject(stderr);
        }
        resolve();
      });
    });
  },
};

/**
 * 获取文件扩展名
 * @param {string} fileName 文件全名称，可以是完整路径
 * @returns {string} 文件扩展名
 */
function getExtension(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf("."));
}
