var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var  webpack=require('webpack');
module.exports = {
    entry: {
        app: "./src/app.js", //giving a 'name' to the script
        index: './src/index.js', //adding multiple scripts
        bootstrap:'bootstrap-loader'
    },
    output: {
        path: __dirname + '/dist', //specifying destination folder for webpack-computed files
        filename: '[name].bundle.js' //using 'name' of script in entry, this is computed by webpack
    },
    devServer: { //used to 'watch' files in dev mode, autosyncs any changes on the hosted files
        contentBase: __dirname + "/dist", //destination of server files 
        compress: true, //http compression
        port: 9000 //specify a port
    },
    module: {
        rules: [
            {
                test: /\.css$/, //regular expression for css files
                //use:['style-loader', 'css-loader'] // uses these to run the css
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // this is used when the CSS is not extracted
                    use: ['css-loader'] // this is used to extract the css
                })
            },
            {
                test: /\.(ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test:/\.(woff2?|svg)$/,
                use:{
                    loader: 'url-loader',
                    options:{
                        limit:10000,
                        name:'[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "My app", //changes content of <title> IF NOT GIVEN in template
            filename: "home.html",
            template: __dirname + "/src/html/index.html", //template for the html file
            hash: true, //adds a hashed value to the script, changes with every generation of file
            chunks: ['app','bootstrap'], //adds only this script to the html
            minify: {
                collapseBooleanAttributes: true // e.g. disabled="disabled" in the template is collapsed to "disabled" in the minified html
            }
        }),
        new HtmlWebPackPlugin({

            filename: "about.html",
            template: __dirname + "/src/html/about.html",
            // minify: {
            //     collapseWhitespace: true
            // }
            excludeChunks: ['app'] // excludes the listed script
        }),
        new ExtractTextPlugin({
            filename: 'mystyle.css' // extracts the specified file and saves it under this name in the destination
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })

    ]
}