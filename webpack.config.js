const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html + webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //плагин, который каждый раз при сборке проекта удаляет содержимое /dist.

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css+webpack



module.exports = {
  entry: { main: './src/index.js' },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },

  mode: 'development', // добавили режим разработчика

  // настройки сервера
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },

  // babel правила, чтобы Webpack задействовал Babel при сборке
  module: {
    rules: [
    // для js
    // rules — это массив правил, добавим в него объект правил для бабеля
    // «если тебе попадётся файл с расширением .js,
    // сначала отдай этот файл модулю babel-loader, а затем добавляй в сборку.
    // Но не применяй это правило к пакетам, скачанным из NPM, которые лежат в папке node_modules».
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },

      {// для изображений и шрифтов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        //переносить исходные файлы в конечную сборку в том же формате
        type: 'asset/resource'
      },


      {// применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',

          // Значение 1 говорит о том, что некоторые трансформации PostCSS применить до css-loader (чтобы работали @import в css)
          options: { importLoaders: 1 }
        },

        'postcss-loader'
      ]
      }

    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin(),

  ]

}
