/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-10 16:10:02
 * @LastEditros:
 * @LastEditTime: 2021-08-10 16:30:23
 */

import Sprite from '../base/sprites';

import DataBus from '../databus';

const BULLET_IMG_SRC = require('../../assets/img/bullet.png');
const BULLET_WIDTH = 16;
const BULLET_HEIGHT = 30;

const __ = {
  speed: Symbol('speed'),
};

const databus = new DataBus();

export default class Bullet extends Sprite {
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT);
  }

  init(x, y, speed) {
    this.x = x;
    this.y = y;
    this[__.speed] = speed;
    this.visible = true;
  }

  // 每一帧更新子弹位置
  update() {
    this.y -= this[__.speed];

    // 超出屏幕外回收自身
    if (this.y < -this.height) databus.removeBullets(this);
  }
}
