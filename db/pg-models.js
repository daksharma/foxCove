var bookshelf = require('./pg-db-config')

module.exports = {
  Zip: bookshelf.Model.extend({
    tableName: 'zips',
    zips: function() {
      return this.belongsToMany(Legislator);
    }
  }),

  Legislator: bookshelf.Model.extend({
    tableName: 'legislators',
    legislators: function() {
      return this.belongsToMany(Zip).withPivot(['state', 'district']);
    }
  })
};
