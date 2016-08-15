const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const hostname = 'localhost';
const app = express();
const port = 4000;
const PUBLIC_DEV_SERVER = `http://${hostname}:${port}/`

config.entry = [
  'webpack-hot-middleware/client?path=' + PUBLIC_DEV_SERVER + "__webpack_hmr",
  'whatwg-fetch',
  './src/index'
]
config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
]
config.output = {
    path: path.join(__dirname, 'public'),
    filename: 'react-app-bundle.js',
    publicPath: PUBLIC_DEV_SERVER
}
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

console.log(config.output.publicPath);
app.use(require('webpack-hot-middleware')(compiler));


app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at ${PUBLIC_DEV_SERVER}`);
});
