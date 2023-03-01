<img src="https://img.shields.io/badge/gitHub-%E8%AE%A9%E8%87%AA%E6%88%91%E4%BB%8B%E7%BB%8D%E5%8F%98%E5%BE%97%E6%9B%B4%E5%A5%BD-brightgreen" />

# vite-plugin-style-vw-loader

一个可以将vue标签内样式px转换vw的 loader，适用于Vite+Vue3

## 安装

```
npm install vite-plugin-style-vw-loader -D

or
pnpm install vite-plugin-style-vw-loader -D

or
yarn add vite-plugin-style-vw-loader -D
```

## 使用

vite.config.js

```javascript
import vitePluginStyleVwLoader from 'vite-plugin-style-vw-loader';

import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    plugins: [vitePluginStyleVwLoader(), vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    }
})
```

## 示例

### 输入

```html
<h3 style="font-size: 28px;margin-top: 10px" width="500px">Test</h3>
```

### 输出

```html
<h3 width="66.66667vw" style="font-size: 3.73333vw; margin-top: 1.33333vw;">Test</h3>
```

## 配置参数

**默认配置：**

```javascript
{
    unitToConvert: "px", // 需要转换的单位，默认为"px"
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    unitPrecision: 5, // 单位转换后保留的精度
    viewportUnit: "vw", // 希望使用的视口单位
    fontViewportUnit: "vw", // 字体使用的视口单位
    minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
}
```

## 参与

只支持vue3模板的转换，react模板未提供支持。如果你也有转换style的需求、欢迎参与完善该项目。
