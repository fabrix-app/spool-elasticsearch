'use strict'
const joi = require('joi')

export const Schemas = {
  storesConfig: joi.object().keys({

  }).unknown(),
  modelsConfig: joi.object().keys({

  }).unknown(),
  pluginsConfig: joi.object().keys({

  }).unknown(),

  elasticConfig: joi.object().keys({
    connection: joi.object().keys({
      log: joi.string()
    }).unknown(),
    validateConnection: joi.boolean()
  }).unknown(),
}
