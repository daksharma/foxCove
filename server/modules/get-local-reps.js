var localReps = require('./local-officials');

module.exports = function (req, res) {
  var inputPackage  = req.body;
  var outputPackage = {};
  localReps.getOfficials(inputPackage, outputPackage, function () {
    res.send(outputPackage);
  });
};
