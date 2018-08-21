/**
 * Base configuration for elasticsearch
 */
export const elasticsearch = {

  connection: {
    /*
    // Elastic hosts configs
    hosts: [],
    */

    /**
     * Elasticsearch host
     */
    host: 'localhost:9200',

    /**
     * Log level
     */
    log: 'trace'
  },

  /**
   * If true spool will validate connection to elasticsearch
   * @type {Boolean}
   */
  validateConnection: false

}
