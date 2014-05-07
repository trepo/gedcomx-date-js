var Single = require('./single.js');

module.exports = function() {

  // If no arguments return a new single of subtype simple
  // The extra parents are for scoping
  return new (Single('simple'))();
}