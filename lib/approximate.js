var util = require('util'),
    Simple = require('./simple.js');

/**
 * An approximate GedcomX Date.
 * Inherits from Simple.
 */
function Approximate() {

  if(arguments.length > 0) {

    if(arguments[0].length < 1 || arguments[0].charAt(0) != 'A') {
      throw new Error('Invalid Approximate Date');
    }
    try {
      Simple.call(this, arguments[0].substr(1));
    } catch(e) {
      throw new Error(e.message+' in Approximate Date');
    }
  } else {
    Simple.call(this);
  }
}

util.inherits(Approximate, Simple);

/**
 * An approximate date is approximate.
 */
Approximate.prototype.isApproximate = function() {
  return true;
}

module.exports = Approximate;