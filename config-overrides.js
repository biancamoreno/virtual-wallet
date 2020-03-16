/* eslint-disable no-param-reassign */
const rewireReactHotLoader = require("react-app-rewire-hot-loader")
const rewireSass = require("react-app-rewire-scss")
const {alias} = require('react-app-rewire-alias')

module.exports = function override(config, env) {
  alias({
    '@src': 'src',
    '@css': 'src/assets/styles/css',
    '@atoms': 'src/atoms',
    '@molecules': 'src/atoms',
    '@organisms': 'src/organisms',
    '@pages': 'src/pages',
    '@templates': 'src/templates',
    '@images': 'src/assets/images'
  })(config)
  config = rewireSass(config, env)
  config = rewireReactHotLoader(config, env)
  return config
}
