var bookshelf = require('./postgres-db-config.js')

module.exports = {
  Zip: bookshelf.Model.extend({
    tableName: 'zips',
    authors: function() {
      return this.belongsToMany(Legislator);
    }
  }),

  Legislator: bookshelf.Model.extend({
    tableName: 'legislators',
    books: function() {
      return this.belongsToMany(Zip);
    }
  })
};
