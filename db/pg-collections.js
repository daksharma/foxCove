var bookshelf = require('./pg-db-config')
var models = require('./pg-models')

module.exports = {
  Zips: bookshelf.Collection.extend({
    model: models.Zip
  }),
  Legislators: bookshelf.Collection.extend({
    model: models.Legislator
  })
};