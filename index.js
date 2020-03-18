const { getModuleOptions } = require('./dist/moduleUtils')
const { compilePlugin, injectPlugin } = require('./dist/pluginUtils')

module.exports = {
  getModuleOptions,
  compilePlugin,
  injectPlugin
}