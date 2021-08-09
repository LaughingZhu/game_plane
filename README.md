<!--
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-06-07 14:51:41
 * @LastEditros: 
 * @LastEditTime: 2021-08-02 09:24:25
-->
# 项目：新年flag项目


## Branch 开发分支

master   线上主分支

dev      测试服

zhu      晓琛的开发分支

liu      仲庆的开发分支


## 框架介绍

**umi version**: 
3.x


**plugins:**: 
@alitajs/hd
通过该插件扩展移动端项目，与umi 2.x中 hd 相同


**postcss-px-to-viewport， dynamicImport**：
通过该包扩展移动端px 转换 vw ，优化移动适配


**chainWebpack**：
在build时，配置分包，减少包体积


*注意*
1.less文件不需要 global 包含
2. umi2.x 升级到 umi3.x 一些api的变化
   https://umijs.org/zh-CN/docs/upgrade-to-umi-3
