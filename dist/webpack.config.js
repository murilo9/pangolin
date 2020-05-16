var path = require('path');
module.exports = {
    entry: './pangolin/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                }
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
