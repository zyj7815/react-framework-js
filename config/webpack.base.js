const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');
const getClientEnvironment = require('./env');

const APP_PATH = path.resolve(__dirname, '../src');

const bundleAnalyzerReport = argv.report;
const env = getClientEnvironment(config.publicPath);

const webpackConfig = {
    plugins: []
};
if (bundleAnalyzerReport) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(config.assetsRoot, './report.html')
    }));
}

module.exports = merge(webpackConfig, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: './src/index.js',
        vendor: ['react', 'react-dom'] // 不变的代码分包
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: config.assetsRoot,
        publicPath: config.publicPath
    },
    module: {
        rules: [
            // 把这个配置放在所有loader之前
            {
                enforce: 'pre',
                test: /\.js|jsx?$/,
                exclude: /node_modules/,
                include: [APP_PATH],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                    emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                    fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
                }
            },
            {
                oneOf: [
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
                    },
                    {
                        test: /\.(j|t)sx?$/,
                        include: APP_PATH,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [["@babel/preset-env", {
                                        targets: {
                                            edge: "17",
                                            firefox: "60",
                                            chrome: "67",
                                            safari: "11.1",
                                            ie: "11"
                                        },
                                        useBuiltIns: 'entry',
                                        corejs: 2
                                    }]],
                                    plugins: [
                                        '@babel/plugin-syntax-dynamic-import',
                                        "@babel/plugin-proposal-object-rest-spread",
                                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                        ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
                                    ],
                                    cacheDirectory: true // 加快编译速度
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(less|css)$/,
                        use: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: false
                                }
                            },
                            'postcss-loader',
                            {
                                loader: 'less-loader',
                                options: { javascriptEnabled: true }
                            }
                        ]
                    },
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack']
                    },
                    {
                        test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: 'img/[name].[hash:8].[ext]',
                            outputPath: config.assetsDirectory,
                            publicPath: config.assetsRoot
                        }
                    },
                    {
                        exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
                        loader: 'file-loader',
                        options: {
                            name: 'media/[path][name].[hash:8].[ext]',
                            outputPath: config.assetsDirectory,
                            publicPath: config.assetsRoot
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src/')
        }
    },
    plugins: [
        // 清理打包目录
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: config.indexPath,
            showErrors: true
        }),
        // 在html模板中能够使用环境变量
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        new InterpolateHtmlPlugin(env.raw),
        // 在js代码中能够使用环境变量(demo: process.env.NODE_ENV === 'production')
        new webpack.DefinePlugin(env.stringified),
        // 忽略moment的国际化库
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        new CopyWebpackPlugin([
            {
                from: 'public',
                ignore: ['index.html']
            }
        ])
    ],
    optimization: {}
});
