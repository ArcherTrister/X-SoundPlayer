"use strict";
const expect = require("chai").expect;
const soundplayer = require("../dist/index").soundplayer;

describe("soundplayer test", () => {
  it("play", async () => {
    const options = {
      soundPath: "C:\\Windows\\Media\\notify.wav",
      volume: 2,
      time: 3,
    };
    const result = await soundplayer
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
