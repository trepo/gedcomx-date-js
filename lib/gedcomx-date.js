var GedUtil = require('./util.js'),
    Simple = require('./simple.js'),
    Duration = require('./duration.js'),
    Approximate = require('./approximate.js'),
    Recurring = require('./recurring.js'),
    Range = require('./range.js');

/**
 * A GedcomX Date.
 * This will parse the passed in string and return
 * the appropriate GedcomX Date object.
 */
function GedcomXDate(str) {

  if(str == '') {
    throw new Error('Invalid Date');
  }

  if(str.charAt(0) == 'R') {
    var parts = str.substr(1).split('/');
    if(parts.length != 3) {
      throw new Error('Invalid Recurring Date');
    }
    return new Recurring(parts[0], parts[1], parts[2]);
  } else if(/\//.test(str)) {
    var parts = str.substr(0).split('/');
    if(parts.length != 2) {
      throw new Error('Invalid Date Range');
    }
    return new Range(parts[0], parts[1]);
  } else if(str.charAt(0) == 'A') {
    return new Approximate(str);
  } else {
    return new Simple(str);
  }
}

/**
 * The version of this library.
 */
GedcomXDate.version = '0.1.0';

/**
 * Expose addDuration.
 */
GedcomXDate.addDuration = GedUtil.addDuration;

/**
 * Expose multiplyDuration.
 */
GedcomXDate.multiplyDuration = GedUtil.multiplyDuration;

/**
 * Expose getDuration.
 */
GedcomXDate.getDuration = GedUtil.getDuration;

/**
 * Expose daysInMonth.
 */
GedcomXDate.daysInMonth = GedUtil.daysInMonth;

module.exports = GedcomXDate;