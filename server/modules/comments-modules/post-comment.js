var db = require('../../../db/mdb-config');


module.exports = function (req, res) {
  db.saveComment(req, res);
};
