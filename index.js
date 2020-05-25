const { getModuleOptions, ModuleContext } = require('./dist/moduleUtils')
const { compilePlugin, injectPlugin, PluginContext } = require('./dist/pluginUtils')

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const nextTickP = (ctx) => {
  return new Promise((resolve) => {
    ctx.$nextTick(resolve)
  })
}

module.exports = {
  delay,
  nextTickP,
  getModuleOptions,
  compilePlugin,
  injectPlugin,
  ModuleContext,
  PluginContext
}