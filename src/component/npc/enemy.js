/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-10 14:27:47
 * @LastEditros:
 * @LastEditTime: 2021-08-11 11:02:44
 */
import Animation from '../base/animation';
import DataBus from '../databus';

const ENEMY_IMG_SRC = require('../../assets/img/enemy.png');
const ENEMY_WIDTH = 60;
const ENEMY_HEIGHT = 60;

const __ = {
  speed: Symbol('speed'),
};

const databus = new DataBus();

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT);
    this.initExplosionAnimation();
  }
  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH);
    this.y = -this.height;

    this[__.speed] = speed;
    this.visible = true;
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    console.log('被击中，爆照');
    const frames = [];

    const EXPLO_IMG_PREFIX = '.';
    const EXPLO_FRAME_COUNT = 19;

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(require(`../../assets/img/explosion${i + 1}.png`));
    }
    this.initFrames(frames);
  }

  // 每一帧更新子弹位置
  update() {
    this.y += this[__.speed];

    // 对象回收
    if (this.y > window.innerHeight + this.height) databus.removeEnemey(this);
  }
}
