
module.exports = function(req, res) {
  res.send({comments: [{
    content: "hello",
    username: "ladyfox",
    time:"9/6/2016 14:48:10"
  },
  {
    content: "hi",
    username: "ladyfox",
    time:"9/6/2016 14:55:10"
  }

  ]})


}