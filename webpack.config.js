const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    reset: './scss/reset.scss',
    main: './scss/main.scss',
    meal_plan: './scss/meal-plan.scss',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node-modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
