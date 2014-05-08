var util = require('util'),
    Range = require('./range.js');

function Recurring(countNum, startString, endString) {
  
  // TODO we must have start and end. error if both aren't set

  // Validate count is a number if set
  if(countNum) {
    if(!(/^[0-9]+$/.test(countNum))) {
      throw new Error('Invalid recurrence count: not a number')
    }
    this.count = parseInt(countNum);
    if(this.count < 0) throw new Error('Invalid recurrence count');
  }

  Range.call(this, startString, endString);
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