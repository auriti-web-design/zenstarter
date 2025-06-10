import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  
  return {
    base: isDev ? '/' : './',
    
    build: {
      outDir: 'assets/dist',
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'assets/js/main.js'),
          editor: path.resolve(__dirname, 'assets/js/editor.js'),
          style: path.resolve(__dirname, 'assets/scss/main.scss'),
          'editor-style': path.resolve(__dirname, 'assets/scss/editor.scss')
        },
        output: {
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) {
              return 'assets/[name]-[hash][extname]'
            }
            
            const info = assetInfo.name.split('.')
            let extType = info[info.length - 1]
            
            if (/\.(css)$/.test(assetInfo.name)) {
              extType = 'css'
            }
            
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              extType = 'img'
            }
            
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              extType = 'fonts'
            }
            
            return `${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js'
        }
      },
      minify: isDev ? false : 'terser',
      sourcemap: isDev ? true : false,
      watch: isDev ? {} : null
    },
    
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    
    server: {
      hmr: {
        host: 'localhost'
      }
    }
  }
})