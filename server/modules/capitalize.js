//capitalizes every word in a string, probably needs some refactoring
module.exports = function (str) {
  var arr = str.split(" ")
  var results = [];
  for(var i = 0; i < arr.length;i++){
    var result = arr[i][0].toUpperCase();
    for(var j = 1; j < arr[i].length; j++){
      result += arr[i][j].toLowerCase();
    }
    // console.log(result)
    results.push(result)
  }
  return results.join(" ")
}
