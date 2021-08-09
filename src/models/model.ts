import { Reducer } from 'redux';
import { Effect } from 'dva';
import { wxJssdk } from '@/utils/wx';
import { getInfo, weChatJssdk } from '../services/api';
import { Toast } from 'antd-mobile';
import { history } from 'umi';

export interface StateType {
  userInfo?: any;
  changeStatus?: boolean;
  newStatus?: boolean;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    getInfo: Effect;
    changeUserStatus: Effect;
    getNewStatus: Effect;
  };
  reducers: {
    setUserInfo: Reducer<StateType>;
    setChangeUserStatus: Reducer<StateType>;
    setNewStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'model',

  state: {
    userInfo: {},
    changeStatus: false,
    newStatus: false,
  },

  effects: {
    // 获取用户信息
    *getInfo({ payload }, { put, call }) {
      let res = yield call(getInfo, {});
      if (res.status === 200) {
        if (res.data.area_code !== '010') {
          Toast.info('非常抱歉！本活动仅限北京学而思用户参加', 0);
          return false;
        }
        // if (payload && payload.first !== undefined && payload.first) {
        //   weChatJssdk(window.location.href).then((response) => {
        //     wxJssdk(
        //       response.data,
        //       {
        //         title: '小习惯，大未来！',
        //         desc: '点击养成五大好习惯',
        //         link: `https://sc.peiyou.eaydu.com/api/wechat/inviteOauth/summerSign?invite_code=${res.data.stu_number}`,
        //         imgUrl:
        //           'https://sckc-1256037416.cos.ap-beijing.myqcloud.com/program/habit/prize/habit_wechat.png',
        //       },
        //       null,
        //     );
        //   });
        // }
        yield put({
          type: 'setUserInfo',
          payload: {
            userInfo: res.data,
            new: res.data.bind === 0 ? true : false,
          },
        });
      }
    },
    // 切换用户
    *changeUserStatus({ payload }, { put, call }) {
      yield put({
        type: 'setChangeUserStatus',
        payload: payload,
      });
    },
    // 新用户注册
    *getNewStatus({ payload }, { put }) {
      yield put({
        type: 'setNewStatus',
        payload,
      });
    },
  },

  reducers: {
    // 存储用户信息
    setUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload.userInfo,
        newStatus: payload.new,
      };
    },
    // 切换用户
    setChangeUserStatus(state, { payload }) {
      return {
        ...state,
        changeStatus: payload.status,
      };
    },
    // 新用户注册
    setNewStatus(state, { payload }) {
      return {
        ...state,
        newStatus: payload.status,
      };
    },
  },
};

export default Model;
