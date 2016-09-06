
module.exports = function(req, res) {
  res.send({comments: [{
    content: "ladyfox checking in",
    username: "ladyfox",
    time:"9/6/2016 14:48:10"
  },
  {
    content: "Nancy Pelosi is awesome!",
    username: "ladyfox",
    time:"9/6/2016 14:55:10"
  }

  ]})


}