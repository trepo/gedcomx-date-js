/**
 * The simplest representation of a date
 */
function Simple() {

  // If arguments passed in, try and parse the simple date
}

/**
 * The type is simple
 */
Simple.prototype.getType = function() {
  return 'simple';
}

/**
 * A simple date is not approximate
 */
Simple.prototype.isApproximate = function() {
  return false;
}

module.exports = Simple;