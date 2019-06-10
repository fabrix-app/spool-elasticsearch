import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
/**
 * @module SchemaMigrationService
 * @description Schema Migrations
 */
export class ElasticsearchSchemaMigrationService extends Service {

  /**
   * Drop collection
   */
  async dropIndex(index, connection) {
    // const dialect = connection.dialect.connectionManager.dialectName
    // return index.sequelize.query(dialect === 'sqlite' ? 'PRAGMA foreign_keys = OFF' : 'SET FOREIGN_KEY_CHECKS = 0')
    //   .then(() => {
    //     return index.sync({force: true})
    //   })
    //   .then(() => {
    //     return index.sequelize.query(dialect === 'sqlite' ? 'PRAGMA foreign_keys = ON' : 'SET FOREIGN_KEY_CHECKS = 1')
    //   })
    //   .catch(err => {
    //     return index.sync({force: true})
    //   })
  }

  /**
   * Alter an existing schema
   */
  async alterIndex(index, connection) {
    // const dialect = connection.dialect.connectionManager.dialectName
    // return connection.sync(index)
    // return index.sync()
  }

  migrateIndexs(indexs, connection) {
    // let promises = []
    // Object.entries(indexs).forEach(([ _, index ]: [ any, {[key: string]: any}]) => {
    //   if (index.migrate === 'drop') {
    //     promises.push(this.dropIndex(index, connection))
    //   }
    //   else if (index.migrate === 'alter') {
    //     promises.push(this.alterIndex(index, connection))
    //   }
    //   else if (index.migrate === 'none') {
    //     return
    //   }
    //   else {
    //     return
    //   }
    // })
    // return promises
  }

  /**
   * Drop collections in current connection
   * @param connection connection object
   */
  async dropDB(connection) {
    // const dialect = connection.dialect.connectionManager.dialectName
    // return connection.query(dialect === 'sqlite' ? 'PRAGMA foreign_keys = OFF' : 'SET FOREIGN_KEY_CHECKS = 0')
    //   .then(() => {
    //     return connection.sync({force: true})
    //   })
    //   .then(() => {
    //     return connection.query(dialect === 'sqlite' ? 'PRAGMA foreign_keys = ON' : 'SET FOREIGN_KEY_CHECKS = 1')
    //   })
    //   .catch(err => {
    //     return connection.sync({force: true})
    //   })
  }

  /**
   * Alter an existing database
   */
  async alterDB(connection) {
    // return connection.sync()
  }

  /**
   * Migrate the DB
   * Checks the connection level instances first and the reverts to index level migration strategy
   */
  async migrateDB(connections) {
    let promises = []

    // Object.entries(connections).forEach(([ _, store ]: [ any, {[key: string]: any}]) => {
    //   if (store.migrate === 'drop') {
    //     promises.push(this.dropDB(store))
    //   }
    //   else if (store.migrate === 'alter') {
    //     promises.push(this.alterDB(store))
    //   }
    //   else if (store.migrate === 'none') {
    //     return
    //   }
    //   else {
    //     promises = [...promises, ...this.migrateIndexs(store.indexs, store)]
    //   }
    // })

    return Promise.all(promises)
  }
}
