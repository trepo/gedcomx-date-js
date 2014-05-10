var util = require('util'),
    GedUtil = require('./util.js'),
    Range = require('./range.js');

function Recurring(countNum, startString, endString) {
  
  // We must have start and end. error if both aren't set
  if(!startString || !endString) {
    throw new Error('Recurring must have a start and end');
  }

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

Recurring.prototype.getEnd = function() {
  
  if(this.count) {
    return this.getNth(this.count);
  } else {
    return Infinity;
  }
  
}

Recurring.prototype.getNth = function(multiplier) {
  
  var duration = GedUtil.multiplyDuration(this.duration, multiplier);

  return GedUtil.addDuration(this.start, duration);
  
}

module.exports = Recurring;