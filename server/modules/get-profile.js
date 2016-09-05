
module.exports = function(req, res){
  var inputPackage = req.body.inputPackage;
  var outputPackage = {};
  newsfeed.getNews(inputPackage, outputPackage, function(){
    info.getGovTrack(inputPackage, outputPackage, function(){
      res.send(outputPackage);
    });
  });
};
