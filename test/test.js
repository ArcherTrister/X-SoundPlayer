"use strict";
const expect = require("chai").expect;
const path = require("path");
const soundPlayer = require("../dist/index").soundPlayer;

describe("soundPlayer test", () => {
  it("play", async () => {
    console.log(soundPlayer);
    const options = {
      soundPath: path.join(__dirname, "./audios/notify.wav"),
      volume: 2,
      time: 3,
    };
    const result = await soundPlayer
      .play(options)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    expect(result).to.equal(true);
  }).timeout(200000);
});
