const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 3001;
const mockPort = port + 1;
const reload = require('require-reload')(require);

module.exports = {
    context: paths.context,
    entry: {
        application: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:' + port,
            'webpack/hot/only-dev-server',
            paths.appIndexJs,
            paths.appStyle,
        ],

        vendor: [
            'react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux',
        ],

    },
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.(css|scss)$/,
                    /\.json$/
                ],
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),

        new webpack.DefinePlugin({
            __DEVELOPMENT__: true,
            __TEST__: false,
        }),
    ],

    resolve: {
        modules: [
            paths.context,
            './',
            'node_modules'
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './',
        port: port,
        hot: true,
        inline: false,
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: {
            '/mock/*': {
                target: `http://localhost:${port + 1}`
            }
        },

        setup: (app) => {

            app.use(require('cors')({
                credentials: true,
                origin: function (origin, callback) {
                    callback(null, true);
                }
            }));

            app.use('/mock', (req, res) => {
                let module = reload(path.resolve(`./mock${req.path}.js`));
                setTimeout(function(){
                    res.json(module(req.query));
                }, 1e3);

            });

            app.listen(port + 1, () => {
                console.log(`mock server listening to port ${mockPort}`);
            });
        }
    },
};