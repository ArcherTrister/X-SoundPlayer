"use strict";
const expect = require("chai").expect;
const path = require("path");
const soundPlayer = require("../dist/index").soundPlayer;

describe("soundPlayer test", () => {
  it("play", async () => {
    const options = {
      soundPath: path.join(__dirname, "./audios/notify.wav"),
      volume: 2,
      time: 2,
    };
    // console.time();
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
    // console.timeEnd();
  }).timeout(200000);
});
