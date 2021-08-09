/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-02-07 09:36:01
 * @LastEditros:
 * @LastEditTime: 2021-08-02 09:32:26
 */
// @ts-ignore
import request from '@/utils/request';

// 是否开启mock数据
const mock = false;
const baseUrl = mock ? 'http://yapi.laughingzhu.cn/mock/44' : '';

// 微信配置
export const weChatJssdk = async (params: any) => {
  return request(`/api/wechat/bj/jssdk?url=${params}`, {
    method: 'GET',
  });
};

/**
 * 获取用户信息
 */
export const getInfo = async (params: any) => {
  return request(baseUrl + `/api/summerSign/info`, {
    method: 'GET',
    params,
  });
};

/**
 * 获取短信验证码
 *
 */
export const getCode = async (data: any) => {
  return request(`/api/time/sendCode`, {
    method: 'POST',
    data,
  });
};

/**
 * 新用户注册
 *
 */
export const toLogin = async (data: any) => {
  return request(`/api/summerSign/phoneLogin`, {
    method: 'POST',
    data,
  });
};

// cos鉴权

export const getCOSSetting = async () => {
  return request(`/api/common/getTempKeys`, {
    method: 'POST',
  });
};

/**
 * 切换用户
 *
 */
export const switchUser = async (data: any) => {
  return request(`/api/common/switchUser`, {
    method: 'POST',
    data,
  });
};

// 过去地址信息
export const myAddress = async () => {
  return request(`/api/common/myAddress`, {
    method: 'GET',
  });
};

// 埋点
export const setPoint = async (data: any) => {
  return request(`/api/common/setPoint`, {
    method: 'POST',
    data,
  });
};

// 用户中心
export const getCenterInfo = async () => {
  return request(`/api/summerSign/userInfo`, {
    method: 'GET',
  });
};

// 上传
export const upload = async (data: any) => {
  return request(`/api/summerSign/upload`, {
    method: 'POST',
    data,
  });
};
