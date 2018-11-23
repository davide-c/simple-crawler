const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        server: './src/entry.ts',
    },
    target: 'node',
    resolve: { extensions: ['.ts', '.js'] },
    optimization: {
        minimize: false
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
        ]
    },
};
