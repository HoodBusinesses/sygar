const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices',
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-express',
    '@grpc/grpc-js',
    '@grpc/proto-loader',
    'kafkajs',
    'mqtt',
    'nats',
    'ioredis',
    'amqplib',
    'amqp-connection-manager',
    'pg-native',
    'cache-manager',
    'class-validator',
    'class-transformer',
    'class-transformer/storage',
    '@nestjs/axios',
  ];

  return {
    ...options,
    entry: {
      main: './src/main.ts', // where lambda handler function is exported
    },
    externals: {
      'mock-aws-s3': 'commonjs mock-aws-s3',
      nock: 'commonjs nock',

      fsevents: "require('fsevents')",
    },
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.(html|cs)$/,
          use: 'null-loader', // Ignore these files
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.d\.ts$/,
          loader: 'ignore-loader',
        },
        {
          test: /\.js\.map$/,
          loader: 'ignore-loader',
        },
      ],
    },
    plugins: [
      ...(options.plugins || []),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'serverless.yml', to: path.resolve(__dirname, 'dist') },
          { from: './public/', to: path.resolve(__dirname, 'dist', 'public') },
          {
            from: 'package.json',
            to: path.resolve(__dirname, 'dist', 'package.json'),
          },
          {
            from: './src/templates/',
            to: path.resolve(__dirname, 'dist', 'static'),
          }, // Adjust this for other static files
        ],
      }),
      new webpack.IgnorePlugin({
        resourceRegExp:
          /^@mikro-orm\/core|^@nestjs\/mongoose|^@nestjs\/sequelize|^@nestjs\/typeorm/,
      }),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
      new webpack.ProvidePlugin({
        WebSocket: 'ws',
        fetch: ['node-fetch', 'default'],
      }),
    ],
  };
};
