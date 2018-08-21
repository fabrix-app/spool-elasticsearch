'use strict'

const FabrixApp = require('@fabrix/fabrix').FabrixApp
const assert = require('assert')
const _ = require('lodash')
const config = require('../fixtures/app')

describe('Elasticsearh Spool', () => {

  before(() => {
    global.app = new FabrixApp(config.noValidate)
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

    it('shuold ping without problems', () => {
      // have to wrap in promise
      return new Promise((resolve, reject) => {
        global.app.elasticClient
          .ping((err) => {
            assert(!err)

            resolve()
          })
      })
    })
  })
})
