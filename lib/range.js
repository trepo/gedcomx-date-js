var GedUtil = require('./util.js'),
    Simple = require('./simple.js'),
    Duration = require('./duration.js'),
    Approximate = require('./approximate.js');

/**
 * A GedcomX Range.
 * It will place a Singel date at this.start and this.end,
 * as well as a Duration at this.duration.
 */
function Range(startString, endString) {

  if(startString && startString.length > 0) {
    if(startString.charAt(0) == 'A') {
      try {
        this.start = new Approximate(startString);
      } catch(e) {
        throw new Error(e.message+' in Range Start Date');
      }
    } else {
      try {
        this.start = new Simple(startString);
      } catch(e) {
        throw new Error(e.message+' in Range Start Date');
      }
    }
  }

  if(endString && endString.length > 0) {
    if(endString.charAt(0) == 'A') {
      try {
        this.end = new Approximate(endString);
      } catch(e) {
        throw new Error(e.message+' in Range End Date');
      }
      if(this.start) {
        this.duration = GedUtil.getDuration(this.start, this.end);
      }
    } else if(endString.charAt(0) == 'P') {

      // If we have no start date, this is invalid
      if(!this.start) {
        throw new Error('A Range may not end with a duration if missing a start date');
      }

      try {
        this.duration = new Duration(endString);
      } catch(e) {
        throw new Error(e.message+' in Range End Date');
      }

      // Use duration and calculate end date
      this.end = GedUtil.addDuration(this.start, this.duration);
    } else {
      try {
        this.end = new Simple(endString);
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
 * Return true if either start or end is approximate.
 */
Range.prototype.isApproximate = function() {
  if(this.start && this.start.isApproximate()) {
    return true;
  }
  if(this.end && this.end.isApproximate()) {
    return true;
  }
  return false;
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

module.exports = Range;