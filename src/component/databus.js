/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-10 09:44:24
 * @LastEditros:
 * @LastEditTime: 2021-08-10 14:27:17
 */
import Pool from './base/pool';

let instance;

export default class DataBus {
  constructor() {
    if (instance) return instance;

    instance = this;

    this.pool = new Pool();

    this.reset();
  }

  reset() {
    this.frame = 0;
    this.score = 0;
    this.bullets = []; // 敌人
    this.enemys = []; // 子弹
    this.animations = [];
    this.gameOver = false;
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   * @param {} enemy
   */
  removeEnemey(enemy) {
    const temp = this.enemys.shift();
    temp.visible = false;
    this.pool.recover('enemy', enemy);
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   * @param {}} bullet
   */
  removeBullets(bullet) {
    const temp = this.bullets.shift();

    temp.visible = false;

    this.pool.recover('bullet', bullet);
  }
}
