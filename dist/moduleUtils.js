const { compilePlugin } = require('./pluginUtils')

exports.ModuleContext = function({ options, module, compileOpts }) {
  this.options = options
  this.module = module
  this.addTemplate = (opts) => {
    this.templateAdded = opts
  }

  this.addPlugin = (opts) => {
    if (compileOpts) {
      compileOpts.options = Object.assign({}, opts.options)
      this.compilePlugin(compileOpts)
    }
    this.pluginAdded = opts
  }
  this.compilePlugin = compilePlugin
  this.registerModule = () => {
    this.module(this.options)
  }
}

exports.getModuleOptions = function(config, moduleName, optsContainer = moduleName) {
  const opts = {}
  const containers = ['buildModules', 'modules', optsContainer]
  containers.some((container) => {
    if (container === optsContainer) {
      Object.assign(opts, { [optsContainer]: config[optsContainer] })
      return true
    }
    const arr = config[container]
    const mod = arr.find((item) => {
      if (typeof item === 'string') {
        return item === moduleName
      } else if (Array.isArray(item)) {
        return item[0] === moduleName
      }
    })
    if (mod) {
      if (Array.isArray(mod)) {
        Object.assign(opts, mod[1])
      }
      return true
    }
  })
  return opts
}