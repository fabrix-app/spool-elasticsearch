import { Spool } from '@fabrix/fabrix/dist/common'
import { isObject, isFunction } from 'lodash'
const elasticsearch = require('elasticsearch')

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api from './api/index'

/**
 * ElasticSearch integration for Fabrix
 */
export class ElasticsearchSpool extends Spool {

  constructor(app) {
    super(app, {
      config: config,
      api: api,
      pkg: pkg
    })
  }
  /**
   * Ensure that this spool supports the configured migration
   */
  validate() {
    if (!isObject(this.app.config.get('elasticsearch')))
      return Promise.reject(new Error('No configuration found at config.elasticsearch !'))

    if (!isObject(this.app.config.get('elasticsearch.connection')))
      return Promise.reject(new Error('No connection configuration defined !'))
  }

  configure() {
    // setup default log level to warning
    if (!this.app.config.get('elasticsearch.connection.log')) {
      this.app.config.set('elasticsearch.connection.log', 'warning')
    }
  }

  initialize() {
    super.initialize()

    // Notice !!!
    // Elastic try to change given config onject. So do not remove `clone`
    // Otherwise Fabrix will pass readonly object and Elasticsearch wouldn't
    // be able to connect
    this.client = new elasticsearch.Client(clone(this.app.config.get('elasticsearch.connection')))
    this.app.elasticClient = this.client

    // If no need to validate connection - exit
    if (!this.app.config.get('elasticsearch.validateConnection'))
      return Promise.resolve()

    // validating connection using ping command
    return new Promise((resolve, reject) => {
      this.client.ping((err) => {
        if (err)
          return reject(err)

        resolve()
      })
    })
  }

  /**
   * Close connection to Elasticsearch
   */
  unload() {
    if (!this.app.elasticClient || !isFunction(this.app.elasticClient.close))
      return

    // Closing elasticsearch connection
    this.app.elasticClient.close()
  }

}
