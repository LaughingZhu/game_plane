/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-06-04 17:24:52
 * @LastEditros:
 * @LastEditTime: 2021-08-10 18:05:22
 */
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'react-redux';
import Main from '../../component/main';
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
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    new Main(ctx);
  });

  return (
    <div className={styles.index} ref={contentRef}>
      <canvas id="canvas" className={styles.canvas}></canvas>
    </div>
  );
}

export default connect((model: any) => ({}))(Index);
