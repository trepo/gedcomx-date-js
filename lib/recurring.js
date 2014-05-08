var util = require('util'),
    Range = require('./range.js');

function Recurring(countNum, startString, endString) {
  
  // TODO we must have start and end. error if both aren't set

  Range.call(this, startString, endString);
  this.count = countNum;

  if(this.count < 0) throw new Error('Invalid recurrence count');
}

util.inherits(Recurring, Range);

Recurring.prototype.getType = function() {
  return 'recurring';
}

Recurring.prototype.getCount = function() {
  if(this.count == undefined) {
    return Infinity;
  } else {
    return this.count;
  }
}

module.exports = Recurring;