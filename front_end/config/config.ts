import { defineConfig } from '@umijs/max';
import routes from './routes';
import defaultSettings from './defaultSettings';

export default defineConfig({
    antd: {
        dark: false,
        compact: false,
        theme: {
            'primary-color': '#1890ff',
        },
        style: 'css',
        styleProvider: {
            hashPriority: 'high',
            legacyTransformer: true,
        },
        appConfig: {
            message: {
                maxCount: 3
            }
        }
    },
    theme: {
    },
    access: {},
    model: {},
    initialState: {},
    request: {},
    title: 'TJUT教室管理系统',
    favicons: [
        '/favicon.ico'
    ],
    layout: {
        locale: true,
        ...defaultSettings
    },
    routes,
    npmClient: 'cnpm',
    locale: {
        default: 'zh-CN',
        baseSeparator: '-',
    },
    proxy: {
        '/api': {
            target: 'http://localhost:28089',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        }
    }
});
