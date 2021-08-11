/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-06-04 17:24:52
 * @LastEditros:
 * @LastEditTime: 2021-08-11 16:08:41
 */
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { connect } from 'react-redux';
import Main from '../../component/main';
import { history } from 'umi';
import { weChatJssdk } from '@/services/api';
import { wxJssdk } from '@/utils/wx';

interface IProps {
  dispatch: any;
}
let planeTarget = {
  planeX: 0,
  planeY: 500,
};
function Index(props: IProps) {
  const contentRef: { current: any } = useRef();
  const [status, setStatus] = useState(true);

  const {} = props;
  let instance;
  let ctxCanvas;
  useEffect(() => {
    // const canvas = document.getElementById('canvas');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // const ctx = canvas.getContext('2d');
    // ctxCanvas = ctx
    // instance = new Main(ctx);
  });

  const startGame = () => {
    // instance.restart(ctx)
    setStatus(false);
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    new Main(ctx);
  };

  return (
    <div className={styles.index} ref={contentRef}>
      <canvas id="canvas" className={styles.canvas}></canvas>
      {status && (
        <div className={styles.modal}>
          {' '}
          <button onClick={startGame}>开始</button>{' '}
        </div>
      )}
    </div>
  );
}

export default connect((model: any) => ({}))(Index);
