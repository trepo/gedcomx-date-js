var util = require('util'),
    Range = require('./range.js');

function Recurring(startString, endString, countNum) {
  Range.call(this, startString, endString);
  this.count = countNum;

  if(this.count < 0) throw new Error('Invalid recurrence count');
}

util.inherits(Recurring, Range);

Recurring.prototype.getType = function() {
  return 'recurring';
}

module.exports = Recurring;