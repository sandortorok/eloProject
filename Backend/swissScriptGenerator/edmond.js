var blossom = require('edmonds-blossom');
// var data = [
//       [0, 1, 6],
//       [0, 2, 10],
//       [1, 2, 5]
//     ];
module.exports = {
  generate: function (matrix){
    var results = blossom(matrix);
    return results
  }
}
