//capitalizes every word in a string, probably needs some refactoring
module.exports = function (str) {
  var arr = str.split(" ");
  var results = [];
  for(var i = 0; i < arr.length;i++){
    var lower = arr[i].toLowerCase().slice(1);
    var result = arr[i][0].toUpperCase() + lower;
    results.push(result);
  }
  return results.join(" ");
};
