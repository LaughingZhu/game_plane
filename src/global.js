/*
 * @Description:
 * @Author: LaughingZhu
 * @Date: 2021-02-01 08:47:16
 * @LastEditros:
 * @LastEditTime: 2021-07-27 10:21:00
 */
import './global.less';
// import Vconsole from 'vconsole'
import { wxJssdk } from '@/utils/wx';
import { weChatJssdk } from '@/services/api';
// new Vconsole()

// 添加背景音乐 wxSDK
// const bgmusic = require('@/assets/audio/bgm.mp3');
// const elAudio = new Audio();
// // @ts-ignore
// window.el_audio = elAudio;
// elAudio.setAttribute('src', bgmusic);
// elAudio.setAttribute('id', 'audio')
// elAudio.loop = true;
// elAudio.play()
// weChatJssdk(window.location.href).then((response) => {
//   wxJssdk(
//     response.data,
//     {
//       title: '小习惯，大未来！',
//       desc: '点击养成五大好习惯',
//       link: `https://sc.peiyou.eaydu.com/api/wechat/oauth/middleBless`,
//       imgUrl:
//         'https://sckc-1256037416.cos.ap-beijing.myqcloud.com/wish/zk/wechat_share.png',
//     },
//     null,
//   );
// });
