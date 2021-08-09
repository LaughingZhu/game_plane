/*
 * @Description: 游戏背景类
 * @Author: LaughingZhu
 * @Date: 2021-08-09 16:38:40
 * @LastEditros:
 * @LastEditTime: 2021-08-09 17:36:11
 */

import Sprite from '../base/sprites';

const srceenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const BG_IMG_SRC = require('../../assets/img/bg.jpg');
const BG_WIDTH = 512;
const BG_HEIGHT = 512;

export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);

    this.top = 0;

    this.render(ctx);
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      -screenHeight + this.top,
      srceenWidth,
      screenHeight,
    );
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.top,
      screenWidth,
      screenHeight,
    );
  }
}
