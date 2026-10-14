'use strict'

const { proxyState, createSuccessResponse } = require('../utils')

module.exports = proxyState(function (ctx, state) {
  state.suspended = true
  Object.assign(state.summary, {
    'MHS av': 0,
    'MHS 5s': 0,
    'MHS 1m': 0,
    'MHS 5m': 0,
    'MHS 15m': 0,
    'HS RT': 0,
    Power: 13
  })
  return createSuccessResponse()
})
