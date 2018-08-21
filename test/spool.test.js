'use strict'

const FabrixApp = require('fabrix')
const assert = require('assert')
const _ = require('lodash')

describe('Elasticsearh Spool', () => {

  before(() => {
    global.app = new FabrixApp(require('./app').noValidate)
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
