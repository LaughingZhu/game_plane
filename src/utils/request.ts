/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-02-01 08:47:16
 * @LastEditros:
 * @LastEditTime: 2021-07-20 17:44:47
 */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { Toast } from 'antd-mobile';
/**
 * 异常处理程序
 */

const errorHandler = (error: any) => {
  const { response, data } = error;
  if (response && response.status === 400) {
    Toast.fail(data.message, 2);
    return data;
  } else if (response.status === 466) {
    // console.log(data, 22222)
    Toast.info(data.message, 0);
  }
  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  // 默认错误处理
  errorHandler,
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options: any) => {
  // Toast.loading('加载中', 0)
  const dev =
    // 'eyJpdiI6ImlycSt6YkVvejcyZFQrSGYybXFvMGc9PSIsInZhbHVlIjoiQmR0dGpTaldiaGcyVXJraHptZlN6QlBpVW54dWpzMmNcL1M1SlM2cEtjSVpJK3RmYTVHUGVpT0czcktVVnZaa0dRblJYOTRcLyttM0FFazYrZE1FUXU4WnVickx5SFFLaHVlNk5CSXY5eVRDXC82NHZSXC9paFV0bE5nZXhsaWFmQ0M0czMzdlBBem9abEtnOWIwVTBDUWFmSTZFNzFIanQxQ2F0XC92ajZjVCtQZDBjYktydkFwVlAzdUc2YkFoQ2xHV3ZTMUgrZ3pqQ204bGcwNW1JXC9rTnh4ZTJ1dHlIc0lMMGFrOHBiVG14amN4RUpUWE1KZUt6UlJkajFuUEg5TDkwckhYcGhcL2FMa0xYM0N3U3VNNFA0UWRBck5RN1wvekpWanluXC9kNWROVW5DVjhWTkt2a01SSHphUnFQOTJOXC9RRk1CbGFHYTU2bitzWmxnM3VHRGM1SkV5QnJBR3VQUzd1czRudFE3V3UyNWI3dFhFVUd2OHh5Rnc3OFVSNW1aZlVKaGEzT3o2Rks1VlJhXC84VXY2QXIzRnNBPT0iLCJtYWMiOiJjOTRkOTdjZDQ5YzVmN2VjYmJjNDkxNTQ4OWYzN2NjZjgzNjRhMWUwMjY0ZGM4MDUyZWMzNDU0OTQ3ZjdiYjRlIn0=';
    'eyJpdiI6Iis0enBjM2JhSFZDeVZEV09LZmJmd3c9PSIsInZhbHVlIjoiK2FhYkpiSVwvMDk5VDNDZUxBU3I0U2cyc3NRK09oTGVsY25HclIxUmMzTHBweW16aXQycnljNU04empxaGVMaU5zTlwvUDg1RVh5cllkRjBnbEQra1dNQXp4ZzBRcE9DbmZRWXhBV0lhU2hNbExwbkhndHVsc2RIaU55ZnR0dDFub0FMWDJQTkp2dlJ3YVV5S1dvZ1BMcm5FSHE2VzgzWHhFVWdoQ0EwdkZIU1wvZ2wzTkdcL3A3d3dGU0pvNSs1XC9RV1QzWDlhWnh3QmVxeFE2K3Y3QzJEUnM5V204YWR2UXJZTnhuUzArRXdSK0JiMm1vcG9hOG5IMUJHOWRuaTNURDBZKzloT1ZXcHdtbU9NUlI5TW9ZUVJ2U2hsUldrK2lKVlNGbzBSZm16Z0Y3VDl0R003RnhDRWY2TXNYWnFCVGJXXC9UMGNEODRXMkVJcHZEeDNYV1l4dHV1Q2hUUlJBaWgxSmFrektoclVLaVBnZlh5cHBlU3BlV1wvT3JBbWN3cHJxbkNCZ1hTTFFGcElBNGNYazdUVmxcL2R3PT0iLCJtYWMiOiJhNDU1YmRmMDFlZTg0NGY2MjA1ZDljMzk4NGNlYmUwOTBlZTFjYjYyOGE0MjlkY2JkMDM0ZjE2Yjg1NWZjNzdkIn0=';
  const pre = localStorage.getItem('bjxes_token');
  const access_token = process.env.NODE_ENV === 'development' ? dev : pre;

  options.headers = {
    oauthCode: access_token,
  };
  return {
    url,
    options: { ...options },
  };
});

request.interceptors.response.use((response: any) => {
  const { status } = response;
  // Toast.hide()

  if (status === 401) {
    // 未授权，授权过程出现错误，可能token没有带
    Toast.fail('请重新登录！', 2, () => {
      window.location.href =
        'https://sc.peiyou.eaydu.com/api/wechat/oauth/middleBless';
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    return;
  }

  return response;
});

export default request;
