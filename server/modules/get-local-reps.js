var localReps = require('./local-officials');

module.exports = function(req, res){
    console.log("HELLO")
    var inputPackage = req.body;
    console.log(inputPackage)
    var outputPackage = {};
    localReps.getOfficials(inputPackage, outputPackage, function(){
        res.send(outputPackage)
    })
}
