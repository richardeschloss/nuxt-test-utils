# nuxt-test-utils

[![npm version][npm-version-src]][npm-version-href]
[![npm][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Nuxt testing utils (a single home for all your favorite testing utils).

Some of these utils may help your tests shave off many minutes of run time!

## Installation

> npm i -D nuxt-test-utils 

What's in the box:
* Module Utilities 
  * `getModuleOptions`
  * `ModuleContext`
* Plugin Utilities
  * `compilePlugin` 
  * `PluginContext`
* Wait Utilities
  * `delay`
  * `nextTickP`
  * `watchP`

This package will come with:

* Required dependencies:
  * [lodash.template](https://www.npmjs.com/package/lodash.template) - to compile ERB templates
  * [serialize-javascript](https://www.npmjs.com/package/serialize-javascript) - also for compiling ERB templates; alternative to JSON.stringify. Only used if your plugin uses `serialize`.
 
* Optional dependencies: (but highly recommended!)
  * [@nuxtjs/module-test-utils](https://www.npmjs.com/package/@nuxtjs/module-test-utils) - Additional testing utilities for *modules*
  * [@vue/test-utils](https://www.npmjs.com/package/@vue/test-utils) - Test utils for Vue components
  * [jsdom-global](https://www.npmjs.com/package/jsdom-global) - Required by @vue/test-utils
  * [jsdom-global](https://www.npmjs.com/package/jsdom-global) - Required by @vue/test-utils
  * [browser-env](https://www.npmjs.com/package/browser-env) - Usually required when it is desired to have a browser-like environment in Node.js. 
  

## Usage

Suppose your nuxt.config is set up like this:
```js
module.exports = {
  modules: ['./lib/module.js'],
  myModOpts: { } // NOTE: example purposes only! Use a name best suited for *your* module!
}
```

```js
import TestUtils from 'nuxt-test-utils'
// or, just pick the utils you need
import { getModuleOptions, ModuleContext, PluginContext } from 'nuxt-test-utils'
import config from '@/nuxt.config' // optional, but useful for utilities.
import path from 'path'
import Module from '@/lib/module'

const ctx = new ModuleContext({
  options: getModuleOptions(config, 'myModOpts'),
  module: Module,
  compileOpts: {
    src: path.resolve('./lib/plugin.js'),
    tmpFile: path.resolve('./lib/plugin.compiled.js'),
    overwrite: true
  }
})

// Finally, load the module
ctx.registerModule() 

// Check if the plugin got added:
t.truthy(ctx.pluginAdded) // ava
expect(ctx.pluginAdded).toBeTruthy() // jest
```

## Utilities

### Module Utilities
1. `getModuleOptions(config, moduleName, optsContainer)`:
  * Params:
    - config: Object - provide nuxt.config
    - moduleName: String
    - optsContainer: Object - specify the container holding your options. defaults to moduleName. Options will be searched in this order: buildModules, then modules, then your optsContainer. As options are found, they'll be merged in.
  
  * Returns: module options
 
2. `ModuleContext({ options, module, compileOpts })`:
  * Params:
    - options: Object - module options
    - module: Object - module instance
    - compileOpts: Object - compile options to be used for adding the plugin (see plugin utils)
  * Actions:
    - addTemplate: If `this.addTemplate` were used by the module, this simply mocks the function. It sets `this.templateAdded` with the template options provided.
    - `addPlugin`: If `this.addPlugin` were used by the module, this actually compiles the plugin using the compileOpts provided to `ModuleContext`. It also sets `this.pluginAdded` with the plugin options provided.
    - `compilePlugin`: it also wires up compilePlugin to the ModuleContext, in case you need to use it yourself
    - `registerModule`: It registers the module with the provided `options` to `ModuleContext`. 

### Plugin Utilities

1. `compilePlugin({ src, tmpFile, options, overwrite })`
  * Params:
    - `src`: String - plugin source filename
    - `tmpFile`: String - filename to save the compiled plugin to
    - `options`: Object - plugin options; i.e., where <%= JSON.stringify(options) %> exists, that will be replaced by the options specified here.
    - `overwrite`: Boolean - overwrite the compiled plugin if it already exists. Default: `false`.
  * Returns: none
 
2. `PluginContext(Plugin)` 
  * Params: 
    - `Plugin` - Object - plugin function, usually the export default from your plugin.js file. It usually wraps around an injector.
  * Actions:
    - Plugin context is instantiated with the `new` operator
    - If the plugin.js calls `inject`, a mock `inject` will be called and set `this.injected[label]` to the object that the plugin is injecting.
  
### Wait utilities
1. `delay(ms)` - promisified delay...nothing fancy, just a wrapper around `setTimeout` that you can `await` on. 
2. `nextTickP(ctx)` - promisified wrapper around `ctx.$nextTick`. Lets you do `await nextTickP(ctx)` for cleaner code.
3. `watchP(ctx, prop, changesFn)` - promisified wrapper around `ctx.$watch` so you can `await watchP(ctx, 'someData', () => { ctx.someData = 123 })`. It will resolve once the data has changed. 

## Suggested Prep and Reading

Getting your test environment set up correctly for Nuxt is more than half the battle. Even though test environment is technically beyond the scope of this repo, to avoid having issues being opened on this topic, here are some bullets that may help:

* When you first create a Nuxt app using create-nuxt-app, you are asked for choice of test framework. Try running that sample code first before proceeding. If you skipped the test framework selection, you can have a look at their [templates](https://github.com/nuxt/create-nuxt-app/tree/master/packages/cna-template/template/frameworks) and start with those, most likely for ava or jest.

* Alternatively, you may find it just as useful to clone Vinayak's repo: https://github.com/vinayakkulkarni/nuxt-ava-e2e-unit-testing 

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-test-utils
[npm-version-href]: https://npmjs.com/package/nuxt-test-utils

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-test-utils.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-test-utils

[license-src]: https://img.shields.io/npm/l/nuxt-test-utils.svg
[license-href]: https://npmjs.com/package/nuxt-test-utils
