# spool-elasticsearch
:package: Elasticsearch Spool [https://www.elastic.co/products/elasticsearch](https://www.elastic.co/products/elasticsearch)

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

Provides a simple integration with elasticsearch

## Usage

###Configure

```js
// config/main.ts
import { ElasticsearchSpool } from '@fabirx/spool-elasticsearch'
export const main = {

  // ...
  spools: [
    ElasticsearchSpool
  ]  
}
```

### Configure connection

Configuration file for Elasticsearch spool is: `config/elasticsearch.ts`
Otherwise you could use `config/env/{env}.ts` files with `elasticsearch` property

```js

// config/elasticsearch.ts

export const elasticsearch = {

  connection: {
    // List of hosts for elastic cluster
    // hosts: [],

    // One elastic instance host
    host: 'localhost:9200',
    // Log level
    log: 'trace'
  },

  // Will validate if elastic connection is alive on Fabrix app start
  validateConnection: true
}
```

### Using Elasticsearch API

This spool creates an app propertry with elasticseach client. `app.elasticClient`
So you could use it whatever you want

```js
// api/controller/SomeController.ts

export class SomeController extends Controller {

  someAction (request, reply) {
    // Perform an action
    this.app.elasticClient
      .search({
        q: 'something'
      })
      .then(function (body) {
        const hits = body.hits.hits;
      }, function (error) {
        console.trace(error.message);
      })
  }
}
```

More information about Elasticsearch client could be found here: https://github.com/elastic/elasticsearch-js

## License
[MIT](https://github.com/fabrix-app/spool-elasticsearch/blob/master/LICENSE)



[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-elasticsearch.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-elasticsearch
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-elasticsearch/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-elasticsearch/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-elasticsearch.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-elasticsearch
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-elasticsearch.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-elasticsearch/coverage
