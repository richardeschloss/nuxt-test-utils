exports.delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

exports.nextTickP = (ctx) => {
  return new Promise((resolve) => {
    ctx.$nextTick(resolve)
  })
}

exports.watchP = (ctx, prop, changesFn) => {
  return new Promise((resolve) => {
    ctx.$watch(prop, resolve)
    changesFn()
  })
}