module.exports = {
    entry:  './app/assets/scripts/main.js',
    output: {
        path:     '/app/assets/scripts/',
        filename: 'main.compiled.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|vendor)/,
                // loader: 'babel-loader',
                loader: 'babel-loader!eslint-loader',
            }
        ]
    },
    eslint: {
        configFile: './.eslintrc'
    },
    debug: true
};