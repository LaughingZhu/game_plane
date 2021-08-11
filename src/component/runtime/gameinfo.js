/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-08-10 16:59:44
 * @LastEditros:
 * @LastEditTime: 2021-08-11 11:18:16
 */
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const atlas = new Image();

atlas.src = require('../../assets/img/Common.png');
console.log(atlas);

export default class GameInfo {
  constructor(ctx) {
    this.props = ctx;
  }
  renderGameScore(ctx, score) {
    this.props.fillStyle = '#ffffff';
    this.props.font = '20px Arial';

    this.props.fillText(score, 10, 30);
  }

  renderGameOver(ctx, score) {
    this.props.drawImage(
      atlas,
      0,
      0,
      119,
      108,
      screenWidth / 2 - 150,
      screenHeight / 2 - 100,
      300,
      300,
    );

    this.props.fillStyle = '#ffffff';
    this.props.font = '20px Arial';

    this.props.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50,
    );

    this.props.fillText(
      `得分: ${score}`,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130,
    );

    this.props.drawImage(
      atlas,
      120,
      6,
      39,
      24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120,
      40,
    );

    this.props.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205,
    );

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 255,
    };
  }
}
