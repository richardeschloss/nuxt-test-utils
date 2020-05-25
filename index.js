const { getModuleOptions, ModuleContext } = require('./dist/moduleUtils')
const { compilePlugin, injectPlugin, PluginContext } = require('./dist/pluginUtils')
const { delay, nextTickP, watchP } = require('./dist/waitUtils')

module.exports = {
  delay,
  nextTickP,
  watchP,
  getModuleOptions,
  compilePlugin,
  injectPlugin,
  ModuleContext,
  PluginContext
}