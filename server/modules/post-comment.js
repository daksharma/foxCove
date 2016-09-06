
module.exports = function (req, res) {
  var message = "SUCCESSFULLY SENT " + req.body.comment.content;
  res.send(message)
}