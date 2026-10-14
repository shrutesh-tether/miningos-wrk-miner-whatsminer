'use strict'

const { proxyState, createSuccessResponse, getHashrate } = require('../utils')

module.exports = proxyState(function (ctx, state) {
  state.suspended = false
  state.elapsed = +new Date()
  Object.assign(state.summary, getHashrate(), {
    Power: state.summary['Power Limit'] || 8000
  })
  return createSuccessResponse()
})
