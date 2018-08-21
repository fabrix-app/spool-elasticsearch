'use strict'

const FabrixApp = require('fabrix')
const assert = require('assert')
const _ = require('lodash')
const config = require('./app')

describe('Elasticsearh Spool with validate connection', () => {
  before(() => {
    global.app = new FabrixApp(config.validate)
    return global.app.start()
  })

  after(() => {
    return global.app.stop()
  })
  describe('spool connected', () => {
    it('should load pack', () => {
      assert(global.app.packs.elasticsearch)
      assert(global.app.packs.elasticsearch.client)
    })
  })

  describe('#initialize', () => {

    it('create elasticClient', () => {
      assert(_.isObject(global.app.elasticClient))
    })

    it('should have .ping()', () => {
      assert(_.isFunction(global.app.elasticClient.ping))
    })

    it('shuold ping without problems', () => {
      return new Promise((resolve) => {
        global.app.elasticClient
          .ping((err) => {
            assert(!err) //check for no error

            resolve()
          })
      })
    })
  })

})
