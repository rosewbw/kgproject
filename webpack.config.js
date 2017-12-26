let path = require('path');
let rootPath = path.resolve(__dirname,'public/src/index.js');
let outputPath = path.resolve(__dirname,'dist');
let fileName = 'buddle.js';

module.exports = {
    entry:rootPath,
    output: {
        path:outputPath,
        filename:fileName
    },
    module: {
        loaders: [
            {
                test:/\.css$/,
                loaders:['style','css'],
                include:rootPath
            },
            {
                test:/\.(png|jpg)$/,
                loaders:"url-loader?limit=8192"
            },
            {
                test:/\.jsx$/,
                loaders:'babel',
                include:rootPath,
                query: {
                    present:['react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
