'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

exports.noValidate = _.defaultsDeep({
  pkg: {
    name: 'spool-elasticsearch-test',
    version: '1.6.0'
  },
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    main: {
      spools: [
        require('../../dist').ElasticsearchSpool // spool-elasticsearch
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
    name: 'spool-elasticsearch-test',
    version: '1.6.0'
  },
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    main: {
      spools: [
        require('../../dist').ElasticsearchSpool // spool-elasticsearch
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
