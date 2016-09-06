
module.exports = function (req, res) {
  var message = "SUCCESSFULLY SENT " + req.body.comment.content + "  " + req.body.comment.time.toString();
  res.send(message)
}