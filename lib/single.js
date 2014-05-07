var Simple = require('./simple.js');

var util = require("util");

function Single() {};

Single.prototype.getType = function() {
  return 'single';
}

/*
var test = new Single();
console.log(test.getType());
*/
module.exports = function(subtype) {
  if(subtype == 'simple') {
    // Return a Simple object that inherits Single
    return Simple(Single);
  } else {
    throw new Error('bad type');
  }
};