'use strict'

const { proxyState, createSuccessResponse, getHashrate } = require('../utils')

module.exports = proxyState(function (ctx, state) {
  state.elapsed = +new Date()
  state.uptime = +new Date()
  state.suspended = false
  Object.assign(state.summary, getHashrate(), {
    Power: state.summary['Power Limit'] || 8000
  })
  return createSuccessResponse()
})
