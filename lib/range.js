var GedUtil = require('./util.js'),
    Simple = require('./simple.js'),
    Duration = require('./duration.js'),
    Approximate = require('./approximate.js');

/**
 * A GedcomX Range.
 * It will place a Singel date at this.start and this.end,
 * as well as a Duration at this.duration.
 */
function Range(str) {

  var range = str;

  // If range starts with A, its approximate
  if(range.charAt(0) == 'A') {
    this._approximate = true;
    range = str.substr(1);
  }

  var parts = range.split('/');

  if(parts.length != 2 || (!parts[0] && !parts[1])) {
    throw new Error('Invalid Date Range');
  }

  if(parts[0]) {
    try {
      this.start = new Simple(parts[0]);
    } catch(e) {
      throw new Error(e.message+' in Range Start Date');
    }
  }

  if(parts[1]) {
    if(parts[1].charAt(0) == 'P') {
      if(!this.start) {
        throw new Error('A Range may not end with a duration if missing a start date');
      }
      try {
        this.duration = new Duration(parts[1]);
      } catch(e) {
        throw new Error(e.message+' in Range End Date');
      }
      // Use duration and calculate end date
      this.end = GedUtil.addDuration(this.start, this.duration);
    } else {
      try {
        this.end = new Simple(parts[1]);
      } catch(e) {
        throw new Error(e.message+' in Range End Date');
      }
      if(this.start) {
        this.duration = GedUtil.getDuration(this.start, this.end);
      }
    }
  }

}

/**
 * Return the string range.
 */
Range.prototype.getType = function() {
  return 'range';
}

/**
 * Return true if range is approximate.
 */
Range.prototype.isApproximate = function() {
  if(this._approximate) {
    return true;
  } else {
    return false;
  }
}

/**
 * Return the start date or undefined.
 */
Range.prototype.getStart = function() {
  return this.start;
}

/**
 * Return the end date or undefined.
 */
Range.prototype.getDuration = function() {
  return this.duration;
}

/**
 * Return the duration or undefined.
 */
Range.prototype.getEnd = function() {
  return this.end;
}

/**
 * Output Formalized range string.
 */
Range.prototype.toFormalString = function() {
  var range = '';

  if(this._approximate) {
    range += 'A';
  }

  if(this.start) {
    range += this.start.toFormalString();
  }
  range += '/';

  if (this.end) {
    range += this.end.toFormalString();
  } else if (this.duration) {
    range += this.duration.toFormalString();
  }

  return range;
}

module.exports = Range;