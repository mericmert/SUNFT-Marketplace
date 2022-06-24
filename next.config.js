/** @type {import('next').NextConfig} */
const webpack = require("webpack");


module.exports = {
  reactStrictMode: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  );
  return config;
  },
  images: {
    domains: ['localhost',"mertd.pythonanywhere.com"],
  },

};
