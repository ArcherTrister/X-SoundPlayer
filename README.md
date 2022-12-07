# SoundPlayer

NodeJS SoundPlayer

========================

Supports the following sound players

- `AFPLAY`(mac)
- `FFPLAY`
- `APLAY`,
- `MPG321`,
- `MPG123`
- `SoundPlayer`(windows)

Nodejs soundplayer wrapper for several command line sound players (above). It is important to note that each of these players need to be installed before they can be used by the lib.

> Tip: Use 'aplay' to play '.wav' audio files, 'mpg321' and 'mpg123' for playing 'mp3' files.

    /**
     * Window: soundplayer's does not support setting the volume, and only supports audio files in WAV format.
     * Linux: If the system is not integrated, you need to install a third-party package.
     * Mac: afplay's volume is from 0 to 255, default is 1. However, volume > 2 usually result in distortion.
     * Therefore, it is better to limit the volume on Mac, and set a common scale of 0 to 1 for simplicity
     */

This library also attempts to provide additional support for parameters such as specifying `audio device` and `gain` (volume). These are specified using the `options` parameter.

## Installation

### Great idea to update your OS

> sudo apt-get update
> sudo apt-get upgrade

### Debian/Ubuntu - MPG123

> sudo apt-get install mpg123
> npm install sound-player

### Debian/Ubuntu - MPG321

> sudo apt-get install mpg321
> npm install sound-player

### Debian/Ubuntu - APLAY

> sudo apt-get install alsa-base alsa-utils

### Install Npm Package

> npm install at-sound-player

> yarn add at-sound-player

## Example Usage

```javascript
import { soundplayer, PlayOptions } from "at-sound-player";

// All options
const options: PlayOptions = {
  soundPath: "C:\\Windows\\Media\\notify.wav",
  volume: 2,
  time: 3,
};

// instantiation with options
await soundplayer
  .play(options)
  .then(() => {
    console.log("play success");
  })
  .catch((error) => {
    console.error("play fail");
  });
```

### See the tests folder for more samples.

> Note: On a mac, `afplay` is selected by default if no player parameter is provided. `aplay` is selected by default on other OS types.

#### Test

> npm run test

## What is my audio device id?

You can check your audio device using the following command (you need aplay installed.)

> aplay -L
