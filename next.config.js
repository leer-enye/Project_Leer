const path = require('path');
const glob = require('glob');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    webpack: (config, { dev }) => {
        config.module.rules.push(
            {
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]',
                },
                test: /\.(css|scss)/,
            },
            {
                test: /\.css$/,
                use: ['babel-loader', 'raw-loader', 'postcss-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'babel-loader',
                    'raw-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['scss', 'node_modules']
                                .map(d => path.join(__dirname, d))
                                .map(g => glob.sync(g))
                                .reduce((a, c) => a.concat(c), []),
                        },
                    },
                ],
            }
        );
        // Fixes npm packages that depend on `fs` module
        // eslint-disable-next-line no-param-reassign
        config.node = {
            fs: 'empty',
        };

        return config;
    },
};

const withSass = require('@zeit/next-sass');

module.exports = withSass();
