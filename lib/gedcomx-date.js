var Util = require('./util.js'),
    Simple = require('./simple.js'),
    Duration = require('./duration.js'),
    Approximate = require('./approximate.js'),
    Recurring = require('./recurring.js'),
    Range = require('./range.js');

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

GedcomXDate.prototype.getDuration = Util.getDuration;

GedcomXDate.prototype.daysInMonth = Util.daysInMonth;

module.exports = GedcomXDate;