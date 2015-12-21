var path = require("path");

module.exports = {
    resolve: {
        root: [
            path.join(__dirname, 'public'),
            path.join(__dirname, 'client'),
            path.join(__dirname, 'node_modules'),
        ]
    },

    entry: {
        app: './client/js/index.js'
    },

    output: {
        filename: './public/bundle.js',
    },

    devtool: 'source-map',

    module: {
        loaders: [
            { test: /\.html$/, loader: 'raw' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(?:png|jpe?g|gif)$/, loader: 'file' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /^(?:app|spec|node_modules)/,
                query: { presets: ['es2015'], cacheDirectory: true } }
        ]
    }
}
