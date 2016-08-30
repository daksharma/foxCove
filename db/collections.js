var bookshelf = require('./postgres-db-config')
var models = require('./models')

module.exports = {
  zips: bookshelf.Collection.extend({
    model: models.Zip
  }),
  legislators: bookshelf.Collection.extend({
    model: models.Legislator
  })
};