"use strict";
const expect = require("chai").expect;
const path = require("path");
const soundPlayer = require("../dist/index").soundPlayer;

describe("soundPlayer test", () => {
  const options = {
    soundPath: path.join(__dirname, "./audios/notify.wav"),
    volume: 2,
    time: 2,
  };
  it("play", async () => {
    console.time("play");
    const result = await soundPlayer
      .play(options)
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
    expect(result).to.equal(true);
    console.timeEnd("play");
  }).timeout(200000);

  it("playAsync", async () => {
    console.time("playAsync");
    const result = await soundPlayer.playAsync(options);
    expect(result.stderr).to.equal("");
    console.timeEnd("playAsync");
  }).timeout(200000);
});
