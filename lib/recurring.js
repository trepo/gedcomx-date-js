var util = require('util'),
    GedUtil = require('./util.js'),
    Range = require('./range.js');

/**
 * A GedcomX Recurring Date.
 */
function Recurring(str) {
  
  var parts = str.split('/');

  if(str.charAt(0) != 'R' || parts.length != 3) {
    throw new Error('Invalid Recurring Date');
  }

  // We must have start and end. error if both aren't set
  if(!parts[1] || !parts[2]) {
    throw new Error('Recurring must have a start and end');
  }

  var countNum = parts[0].substr(1);

  // Validate count is a number if set
  if(countNum) {
    if(!(/^[0-9]+$/.test(countNum))) {
      throw new Error('Invalid recurrence count: not a number')
    }
    this.count = parseInt(countNum, 10);
    if(this.count < 0) throw new Error('Invalid recurrence count');
  }

  Range.call(this, parts[1]+'/'+parts[2]);

  // If we have a count, replace end with the actual end date or undefined.
  delete this.end;
  if(this.count) {
    this.end = this.getNth(this.count);
  }
}

util.inherits(Recurring, Range);

/**
 * Return the string recurring.
 */
Recurring.prototype.getType = function() {
  return 'recurring';
}

/**
 * Return the count or Infinity.
 */
Recurring.prototype.getCount = function() {
  if(this.count == undefined) {
    return Infinity;
  } else {
    return this.count;
  }
}

/**
 * Returns the nth instance of this recurring date.
 */
Recurring.prototype.getNth = function(multiplier) {
  
  var duration = GedUtil.multiplyDuration(this.duration, multiplier);

  return GedUtil.addDuration(this.start, duration);
  
}

/**
 * Output Formalized range string.
 */
Recurring.prototype.toFormalString = function() {
  var range = Recurring.super_.prototype.toFormalString.call(this);

  if(this.count) {
    return 'R'+this.count+'/'+range;
  } else {
    return 'R/'+range;
  }
}

module.exports = Recurring;