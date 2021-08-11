/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-11 14:15:25
 * @LastEditros:
 * @LastEditTime: 2021-08-11 16:12:23
 */

let instance;

export default class Music {
  constructor() {
    if (instance) return instance;

    instance = this;
    this.bgmAudio = new Audio();
    this.bgmAudio.loop = true;
    this.bgmAudio.src = require('../../assets/audio/bgm.mp3').default;
    // this.bgmAudio.setAttribute('src', bgm)

    this.shootAudio = new Audio();
    this.shootAudio.src = require('../../assets/audio/bullet.mp3').default;

    this.boomAudio = new Audio();
    this.boomAudio.src = require('../../assets/audio/boom.mp3').default;

    this.playBgm();
  }

  playBgm() {
    this.bgmAudio.play();
  }

  playShoot() {
    this.shootAudio.currentTime = 0;
    this.shootAudio.play();
  }
  playExplosion() {
    this.boomAudio.currentTime = 0;
    this.boomAudio.play();
  }
}
