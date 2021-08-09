/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-06-04 17:24:52
 * @LastEditros:
 * @LastEditTime: 2021-08-09 16:20:29
 */
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'react-redux';
import { history } from 'umi';

interface IProps {
  dispatch: any;
}
let planeTarget = {
  planeX: 0,
  planeY: 500,
};
function Index(props: IProps) {
  const contentRef: { current: any } = useRef();

  const {} = props;
  useEffect(() => {
    __initCanvas();
  }, [planeTarget.planeX, planeTarget.planeY]);

  const __initCanvas = () => {
    const canvas = document.getElementById('canvas');
    let screenWidth = contentRef.current.clientWidth || 0;
    let screenHeight = contentRef.current.clientHeight || 0;
    const rectX = screenWidth / 2 - 50;
    let rectY = 0;

    if (canvas === null) return false;
    // 获取页面宽高

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    const context = canvas.getContext('2d');

    // 支持canvas，开始逻辑

    // 绿色矩形，敌人
    context.fillStyle = '#1aad19';

    // 矩形渲染函数
    const drawRect = (x: number, y: number) => {
      context.clearRect(0, 0, screenWidth, screenHeight);
      context.fillRect(x, y, 100, 100);
    };

    const plane = new Image();
    let imageLoad = false;

    plane.onload = () => {
      imageLoad = true;
    };

    plane.src = require('../../assets/img/hero.png');

    let renderCanvas = setInterval(() => {
      const { planeX, planeY } = planeTarget;
      if (rectY === screenHeight) rectY = 0;
      drawRect(rectX, rectY++);
      if (imageLoad) {
        context.drawImage(plane, planeX, planeY, 100, 100);
      }
      if (
        planeX >= rectX - 100 &&
        planeX <= rectX + 100 &&
        planeY >= rectY - 100 &&
        planeY <= rectY + 100
      ) {
        alert('失败');
        clearInterval(renderCanvas);
      }
    }, 16);

    // 渲染到页面中
    contentRef.current.appendChild(canvas);

    return () => {
      clearInterval(renderCanvas);
    };
  };

  const touchMove = (e: any) => {
    if (
      e.touches[0].screenX !== planeTarget.planeX ||
      e.touches[0].screenY !== planeTarget.planeY
    ) {
      planeTarget = {
        planeX: e.touches[0].screenX,
        planeY: e.touches[0].screenY,
      };
    }
  };

  return (
    <div
      className={styles.index}
      ref={contentRef}
      onTouchMove={(e: any) => touchMove(e)}
    >
      <canvas id="canvas" className={styles.canvas}></canvas>
    </div>
  );
}

export default connect((model: any) => ({}))(Index);
