const { getModuleOptions, ModuleContext } = require('./dist/moduleUtils')
const { compilePlugin, injectPlugin } = require('./dist/pluginUtils')

module.exports = {
  getModuleOptions,
  compilePlugin,
  injectPlugin,
  ModuleContext
}