/*
 * @Description: 游戏基础的 精灵类
 * @Author: LaughingZhu
 * @Date: 2021-08-09 17:12:38
 * @LastEditros:
 * @LastEditTime: 2021-08-09 17:25:27
 */

export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image();
    this.img.src = imgSrc;
    this.width = width;
    this.height = height;
    (this.x = x), (this.y = y);
    this.visible = true;
  }

  /**
   * 将精灵图绘制在canvas上
   * @param {*} ctx canvas
   * @returns
   */
  drawToCanvas(ctx) {
    if (!this.visible) return;

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * 简单的碰撞检测定义；
   * 另一个精灵的 中心点 处于本精灵所在的矩形内即可
   * @param {Sprite} sp Sprite 的实例
   * @returns
   */
  isCollideWith(sp) {
    const spX = sp.x + sp.width / 2;
    const spY = sp.y + sp.height / 2;

    if (!this.visible || !sp.visible) return false;

    return !!(
      spX >= this.x &&
      spX <= this.x + this.width &&
      spY >= this.y &&
      spY < +this.y + this.height
    );
  }
}
