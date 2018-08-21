'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

exports.noValidate = _.defaultsDeep({
  pkg: {
    name: 'elasticsearch-spool-test'
  },
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    main: {
      packs: [
        require('spool-core'),
        require('../') // spool-elasticsearch
      ]
    },
    elasticsearch: {

      connection: {
        host: 'localhost:9200',
        log: 'error'
      },
      validateConnection: false
    }
  }
}, smokesignals.FailsafeConfig)

exports.validate = _.defaultsDeep({
  pkg: {
    name: 'elasticsearch-spool-test'
  },
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    main: {
      packs: [
        require('spool-core'),
        require('../') // spool-elasticsearch
      ]
    },
    elasticsearch: {

      connection: {
        host: 'localhost:9200',
        log: 'error'
      },
      validateConnection: true
    }
  }
}, smokesignals.FailsafeConfig)
