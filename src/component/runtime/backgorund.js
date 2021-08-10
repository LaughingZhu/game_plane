/*
 * @Description: 游戏背景类
 * @Author: LaughingZhu
 * @Date: 2021-08-09 16:38:40
 * @LastEditros:
 * @LastEditTime: 2021-08-10 18:01:41
 */

import Sprite from '../base/sprites';

const screenWidth = window.innerWidth;
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

  update() {
    this.top += 2;

    if (this.top >= screenHeight) this.top = 0;
  }

  render(ctx) {
    console.log(ctx, 'background');
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      -screenHeight + this.top,
      screenWidth,
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
