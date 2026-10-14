'use strict'

module.exports = (v) => {
  v.setLED.stages[1].wait = 500
  v.setPowerModeLow.stages[1].wait = 2000
  v.setPowerModeNormal.stages[1].wait = 2000
  v.setPowerModeHigh.stages[1].wait = 2000

  v.setPowerModeSleep.stages[1].validate = {
    type: 'schema',
    schema: {
      success: { type: 'boolean', enum: [true] },
      config: {
        type: 'object',
        children: {
          suspended: { type: 'boolean', enum: [true] },
          power_mode: { type: 'string', enum: ['low', 'normal', 'high'] }
        }
      }
    }
  }
}
