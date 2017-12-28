let path = require('path');
let rootPath = path.resolve(__dirname,'public/src/pages/index.js');
let outputPath = path.resolve(__dirname,'public/dist');
let fileName = 'bundle.js';

module.exports = {
    entry:rootPath,
    output: {
        path:outputPath,
        filename:fileName
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    },
    resolve: {
        extensions: [' ','.js']
    }
};
