'use strict'

const { createV3SuccessResponse, createV3ErrorResponse, validateArgs, getHashrate } = require('../utils')

/**
 * V3 API set.miner.power command handler
 * Handles power_on, power_off, pre_power_on
 * param: 'on' | 'off' | 'pre'
 */
module.exports = function (ctx, state, req) {
  if (!validateArgs([['param']], req)) {
    return createV3ErrorResponse(-1, 'Missing param', 'set.miner.power')
  }

  const powerAction = req.param
  if (!['on', 'off', 'pre'].includes(powerAction)) {
    return createV3ErrorResponse(-1, 'Invalid power action', 'set.miner.power')
  }

  if (powerAction === 'off') {
    state.suspended = true
    state.pre_power_on = false
    Object.assign(state.summary, {
      'MHS av': 0,
      'MHS 5s': 0,
      'MHS 1m': 0,
      'MHS 5m': 0,
      'MHS 15m': 0,
      'HS RT': 0,
      Power: 13
    })
  } else if (powerAction === 'pre') {
    state.pre_power_on = true
  } else if (powerAction === 'on') {
    state.suspended = false
    state.pre_power_on = false
    Object.assign(state.summary, getHashrate(), {
      Power: state.summary['Power Limit'] || 8000
    })
  }

  return createV3SuccessResponse({
    power: powerAction
  }, 'set.miner.power')
}
