/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-10 16:30:29
 * @LastEditros:
 * @LastEditTime: 2021-08-11 09:53:52
 */
import Sprite from '../base/sprites';
import Bullet from './bullet';
import DataBus from '../databus';

const srceenWidth = window.innerWidth;
const srceenHeight = window.innerHeight;

// 玩家相关设置
const PLAYER_IMG_SRC = require('../../assets/img/hero.png');
const PLAYER_WIDTH = 80;
const PLAYER_HEIGHT = 80;

const databus = new DataBus();

export default class Player extends Sprite {
  constructor(ctx) {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT);

    // 玩家默认处于屏幕底部居中位置
    this.x = srceenWidth / 2 - this.width / 2;
    this.y = srceenHeight - this.height - 30;

    // 用于在手指移动的时候标识手指是否已经在飞机上
    this.touched = false;
    this.bullets = [];

    // 初始化事件监听
    this.initEvent(ctx);
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {NUmber} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30;

    return !!(
      x >= this.x - deviation &&
      y >= this.y - deviation &&
      x <= this.x + this.width + deviation &&
      y <= this.y + this.height + deviation
    );
  }

  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2;
    let disY = y - this.height / 2;

    if (disX < 0) disX = 0;
    else if (disX > srceenWidth - this.width) disX = srceenWidth - this.width;

    if (disY <= 0) disY = 0;
    else if (disY > srceenHeight - this.height)
      disY = srceenHeight - this.height;

    this.x = disX;
    this.y = disY;
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent(ctx) {
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      if (this.checkIsFingerOnAir(x, y)) {
        this.touched = true;

        this.setAirPosAcrossFingerPosZ(x, y);
      }
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      if (this.touched) this.setAirPosAcrossFingerPosZ(x, y);
    });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();

      this.touched = false;
    });
  }

  shoot() {
    const bullet = databus.pool.getItemByClass('bullet', Bullet);

    bullet.init(this.x + this.width / 2 - bullet.width / 2, this.y - 10, 10);

    databus.bullets.push(bullet);
  }
}
