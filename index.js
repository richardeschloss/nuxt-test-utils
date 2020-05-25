const { getModuleOptions, ModuleContext } = require('./dist/moduleUtils')
const { compilePlugin, injectPlugin, PluginContext } = require('./dist/pluginUtils')

module.exports = {
  getModuleOptions,
  compilePlugin,
  injectPlugin,
  ModuleContext,
  PluginContext
}