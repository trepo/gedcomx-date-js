var Simple = require('./simple.js'),
    Duration = require('./duration.js'),
    Approximate = require('./approximate.js');

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
        throw new Error(e.message+' in Range Start Date');
      }
    } else if(endString.charAt(0) == 'P') {
      try {
        this.duration = new Duration(endString);
      } catch(e) {
        throw new Error(e.message+' in Range Start Date');
      }
      // TODO use duration and calculate end date
    } else {
      try {
        this.end = new Simple(endString);
      } catch(e) {
        throw new Error(e.message+' in Range Start Date');
      }
      // TODO use end date and calculate duration
    }
  }

  if(this.start && this.end) {
    // TODO validate start < end
  }

}

Range.prototype.getType = function() {
  return 'range';
}

Range.prototype.isApproximate = function() {
  if(this.start && this.start.isApproximate()) {
    return true;
  }
  if(this.end && this.end.isApproximate()) {
    return true;
  }
  return false;
}

module.exports = Range;