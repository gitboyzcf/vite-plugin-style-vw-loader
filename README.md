# vite-plugin-style-vw-loader

A loader that can convert the style px in Vue3 label to vw.  
>  English | [中文](https://github.com/gitboyzcf/vite-plugin-style-vw-loader/blob/master/README.zh-CN.md) 

## Install

```
npm install vite-plugin-style-vw-loader -D

or
pnpm install vite-plugin-style-vw-loader -D

or
yarn add vite-plugin-style-vw-loader -D
```

## Basic use

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

## Examples

### Input

```html
<h3 style="font-size: 28px;margin-top: 10px" width="500px">Test</h3>
```

### Output

```html
<h3 width="66.66667vw" style="font-size: 3.73333vw; margin-top: 1.33333vw;">Test</h3>
```

## Configuration

**default configuration：**

```javascript
{
    unitToConvert: "px", // The unit to be converted is "px" by default.
    viewportWidth: 750, // The viewport width of the design draft, such as the incoming function, whose parameter is the file path currently processed.
    unitPrecision: 5, // Precision retained after unit conversion.
    viewportUnit: "vw", // Viewport units you want to use.
    fontViewportUnit: "vw", // Viewport units used by fonts.
    minPixelValue: 1, // Set the minimum conversion value. If it is 1, only values greater than 1 will be converted.
}
```

## Partake

Only the conversion of Vue3 template is supported, and the React template does not. If you also have the need to transform style, welcome to participate in improving the project.
