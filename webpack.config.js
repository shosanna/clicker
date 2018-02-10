const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },

    devServer: {
        contentBase: './dist'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new CheckerPlugin()
    ]
}
