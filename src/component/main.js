/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-09 17:37:08
 * @LastEditros:
 * @LastEditTime: 2021-08-10 18:04:25
 */

import Background from './runtime/backgorund';
import Enemy from './npc/enemy';
import dataBus from './databus';
import Player from './player/index';
import GameInfo from './runtime/gameinfo';

const databus = new dataBus();

export default class Main {
  constructor(ctx) {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0;
    this.props = ctx;
    this.restart(ctx);
  }

  restart(ctx) {
    databus.reset();

    canvas.removeEventListener('touchStart', this.touchHandle);

    this.bg = new Background(ctx);
    this.player = new Player(ctx);
    this.gameInfo = new GameInfo(ctx);

    this.bindLoop = this.loop.bind(this);
    this.hasEventBind = false;

    // 清除上一局的动画

    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop, ctx);
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义生成的频率
   */
  enemyGenerate() {
    if (databus.frame % 30 === 0) {
      const enemy = databus.pool.getItemByClass('enemy', Enemy);
      enemy.init(6);
      databus.enemys.push(enemy);
    }
  }

  collisionDetection() {}

  touchEventHandler(e) {}

  /**
   * canvas 重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    const ctx = this.props;
    ctx.clearRect(0, 0, ctx.width, ctx.height);

    this.bg.render(ctx);

    databus.bullets.concat(databus.enemys).forEach((item) => {
      item.drawToCanvas(ctx);
    });

    this.player.drawToCanvas(ctx);

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx);
      }
    });

    this.gameInfo.renderGameScore(ctx, databus.score);

    // 游戏结束
    if (databus.gameOver) {
      this.gameInfo.renderGameOver(ctx, databus.score);

      if (!this.hasEventBind) {
        this.hasEventBind = true;
        this.touchHandle = this.touchEventHandler.bind(this);
        ctx.addEventListener('touchstart', this.touchHandle);
      }
    }
  }

  /**
   * 实现游戏逻辑更新主函数
   */
  update() {
    if (databus.gameOver) return;

    this.bg.update();

    databus.bullets.concat(databus.enemys).forEach((item) => {
      item.update();
    });

    this.enemyGenerate();
    this.collisionDetection();

    if (databus.frame % 20 === 0) {
      this.player.shoot();
      // this.music.playShoot()
    }
  }

  /**
   * 实现游戏帧循环
   * @param {*} ctx
   */
  loop(ctx) {
    databus.frame++;

    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(this.bindLoop, ctx);
  }
}
