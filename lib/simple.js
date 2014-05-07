var util = require("util");

module.exports = function(parent) {


  /**
   * If no arguments are passed in, default to now.
   * Else If one argument is passed in and is a string, parse it.
   * Else Error
   */
  function Simple() {
    // Call the parent's constructor
    parent.call(this);
  };
  
  // Inherit the methods of parent  
  util.inherits(Simple, parent);
  //Simple.prototype = new parent();

  /**
   * Return the subtype
   */
  Simple.prototype.getSubtype = function() {
    return 'simple';
  }

  return Simple;
}