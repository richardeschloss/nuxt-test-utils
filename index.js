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

const watchP = (ctx, prop, changesFn) => {
  return new Promise((resolve) => {
    ctx.$watch(prop, resolve)
    changesFn()
  })
}

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