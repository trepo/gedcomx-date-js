var util = require("util");

module.exports = function(parent) {


  /**
   * If no argument are passed in, default to now.
   * Else If one argument is passed in and is a string, parse it.
   * Else Error
   */
  function Duration() {
    // Call the parent's constructor
    parent.call(this);
  };
  
  // Inherit the methods of parent  
  util.inherits(Duration, parent);

  /**
   * Return the subtype
   */
  Duration.prototype.getSubtype = function() {
    return 'duration';
  }

  return Duration;
}