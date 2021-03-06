var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extensions: ['css'],
      filter: function (module, regex, options, log) {
        if (process.env.NODE_ENV !== 'production') {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
        } else {
          return regex.test(module.name)
        }
      },
      path: function (module, options, log) {
        if (process.env.NODE_ENV !== 'production') {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
        } else {
          return module.name
        }
      },
      parser: function (module, options, log) {
        if (process.env.NODE_ENV !== 'production') {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
        } else {
          return module.source
        }
      }
    }
  }
}
