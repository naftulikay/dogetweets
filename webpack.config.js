var path = require("path");

module.exports = {
    resolve: {
        root: [
            path.join(__dirname, 'public'),
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'bower_components'),
        ]
    },

    entry: {
        app: './public/js/index.js'
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
            { test: /\.js$/, loader: 'babel-loader', exclude: /^(?:app|spec|node_modules|bower_components)/,
                query: { presets: ['es2015'], cacheDirectory: true } }
        ]
    }
}
