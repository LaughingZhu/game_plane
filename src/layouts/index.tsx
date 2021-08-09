/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-02-01 08:47:16
 * @LastEditros:
 * @LastEditTime: 2021-08-09 14:05:26
 */
import React, { Component } from 'react';
import { connect } from 'dva';

import './index.less';

interface IProps {
  children: any;
  location: any;
  dispatch: any;
  userInfo: any;
}
interface IState {}
class BasicLayout extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render = () => {
    const { children } = this.props;

    return (
      <div className={`layout flex`}>
        <div className="layout-content flex"> {children} </div>
      </div>
    );
  };
}

function mapStateToProps(state: any) {
  const { userInfo } = state.model;
  return {
    userInfo,
  };
}

export default connect(mapStateToProps)(BasicLayout);
