import { Spool } from '@fabrix/fabrix/dist/common'
import { clone, isObject, isFunction } from 'lodash'
import { Validator } from './validator'
import * as elasticsearch from 'elasticsearch'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api from './api/index'

/**
 * ElasticSearch integration for Fabrix
 */
export class ElasticsearchSpool extends Spool {
  public client

  constructor(app) {
    super(app, {
      config: config,
      api: api,
      pkg: pkg
    })

    this.extensions = {
      elasticClient: {
        get: () => {
          return this.client
        },
        set: (newElasticSearchClient) => {
          throw new Error('elasticClient can not be set through FabrixApp, check spool-elasticsearch instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }
  /**
   * Ensure that this spool supports the configured migration
   */
  async validate() {
    if (!isObject(this.app.config.get('elasticsearch'))) {
      return Promise.reject(new Error('No configuration found at config.elasticsearch!'))
    }

    if (!isObject(this.app.config.get('elasticsearch.connection'))) {
      return Promise.reject(new Error('No connection configuration defined!'))
    }

    const stores = this.app.config.get('stores')
    if (stores && Object.keys(stores).length === 0) {
      this.app.log.warn('No store configured at config.stores, models will be ignored')
    }
    const models = this.app.config.get('models')
    if (models && Object.keys(models).length === 0) {
      this.app.log.warn('No models configured at config.models, models will be ignored')
    }
    return Promise.all([
      Validator.validateStoresConfig(stores),
      Validator.validateModelsConfig(models),
      Validator.validateElasticConfig(this.app.config.get('elasticsearch'))
    ])
  }

  configure() {
    // setup default log level to warning
    if (!this.app.config.get('elasticsearch.connection.log')) {
      this.app.config.set('elasticsearch.connection.log', 'warning')
    }
  }

  async initialize() {
    // super.initialize()

    // Notice !!!
    // Elastic tries to change given config onject. So do not remove `clone`
    // Otherwise Fabrix will pass readonly object and Elasticsearch wouldn't
    // be able to connect
    this.client = new elasticsearch.Client(clone(this.app.config.get('elasticsearch.connection')))

    // If no need to validate connection - exit
    if (!this.app.config.get('elasticsearch.validateConnection')) {
      // Migrate the connections and/or models by their migration strategy
      return this.migrate()
    }

    // validating connection using ping command
    return new Promise((resolve, reject) => {
      this.client.ping((err) => {
        if (err) {
          return reject(err)
        }
        // Migrate the connections and/or models by their migration strategy
        return this.migrate()
          .then(() => {
            resolve()
          })
          .catch(_err => {
            reject(_err)
          })
      })
    })
  }

  /**
   * Close connection to Elasticsearch
   */
  unload() {
    if (!this.app.elasticClient || !isFunction(this.app.elasticClient.close)) {
      return
    }

    // Closing elasticsearch connection
    return this.app.elasticClient.close()
  }

  /**
   * Migrate the database connections
   */
  async migrate() {
    const SchemaMigrationService = this.app.services.ElasticsearchSchemaMigrationService
    return SchemaMigrationService.migrateDB([this.app.elasticClient])
  }

}
