/* eslint-disable no-param-reassign */
const rewireReactHotLoader = require("react-app-rewire-hot-loader")
const rewireSass = require("react-app-rewire-scss")

module.exports = function override(config, env) {
  config = rewireSass(config, env)
  config = rewireReactHotLoader(config, env)
  return config
}
