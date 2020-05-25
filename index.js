const { getModuleOptions, ModuleContext } = require('./dist/moduleUtils')
const { compilePlugin, PluginContext } = require('./dist/pluginUtils')
const { delay, nextTickP, watchP } = require('./dist/waitUtils')

module.exports = {
  delay,
  nextTickP,
  watchP,
  getModuleOptions,
  compilePlugin,
  ModuleContext,
  PluginContext
}