var bookshelf = require('./pg-db-config')
var models = require('./pg-models')

module.exports = {
  zips: bookshelf.Collection.extend({
    model: models.Zip
  }),
  legislators: bookshelf.Collection.extend({
    model: models.Legislator
  })
};