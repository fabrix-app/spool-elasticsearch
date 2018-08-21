'use strict'

const FabrixApp = require('@fabrix/fabrix').FabrixApp
const assert = require('assert')
const _ = require('lodash')
const config = require('../fixtures/app')

describe('Elasticsearh Spool with valid connection', () => {
  before(() => {
    global.app = new FabrixApp(config.validate)
    return global.app.start()
  })

  after(() => {
    return global.app.stop()
  })

  describe('spool connected', () => {
    it('should load pack', () => {
      assert(global.app.spools.elasticsearch)
      assert(global.app.spools.elasticsearch.client)
    })
  })

  describe('#initialize', () => {

    it('create elasticClient', () => {
      assert(_.isObject(global.app.elasticClient))
    })

    it('should have .ping()', () => {
      assert(_.isFunction(global.app.elasticClient.ping))
    })

    it('should ping without problems', () => {
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
