(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GedcomXDate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var util = require('util'),
    Simple = require('./simple.js');

/**
 * An approximate GedcomX Date.
 * Inherits from Simple.
 */
function Approximate() {

  if(arguments.length > 0) {

    if(arguments[0].length < 1 || arguments[0].charAt(0) != 'A') {
      throw new Error('Invalid Approximate Date');
    }
    try {
      Simple.call(this, arguments[0].substr(1));
    } catch(e) {
      throw new Error(e.message+' in Approximate Date');
    }
  } else {
    Simple.call(this);
  }
}

util.inherits(Approximate, Simple);

/**
 * An approximate date is approximate.
 */
Approximate.prototype.isApproximate = function() {
  return true;
}

/**
 * Output Formalized approximate string.
 */
Approximate.prototype.toFormalString = function() {
  return 'A'+Approximate.super_.prototype.toFormalString.call(this);
}

module.exports = Approximate;
},{"./simple.js":6,"util":12}],2:[function(require,module,exports){
/**
 * A gedcomX Duration
 */
function Duration(str) {

  // There must be at least a P
  if(str.length < 1 || str.charAt(0) != 'P') {
    throw new Error('Invalid Duration');
  }

  var duration = str.substr(1);

  if(duration.length < 1) {
    throw new Error('Invalid Duration');
  }

  // 5.3.2 allows for NON normalized durations
  // We assume that if there is a space, it is non-normalized
  if(/\s/.test(duration)) {
    throw new Error('Non normalized durations not implemented');
    //this._parseNonNormalized(duration);
  } else {
    this._parseNormalized(duration);
  }

}

/**
 * Parse a normalized duration.
 */
Duration.prototype._parseNormalized = function(str) {

  var duration = str.split(''),
      currentNum = '',
      inTime = false,
      seen = [],
      valid = ['Y', 'Mo', 'D', 'T', 'H', 'Mi', 'S'];

  for(var x in duration) {
    var character = duration[x];

    if(/[0-9]/.test(character)) {
      currentNum += character+'';
      continue;
    }

    switch(character) {
      case 'Y':
        if(currentNum.length < 1) {
          throw new Error('Invalid Duration: invalid years');
        }
        if(seen.indexOf('Y') != -1) {
          throw new Error('Invalid Duration: duplicate years');
        }
        if(valid.indexOf('Y') == -1) {
          throw new Error('Invalid Duration: years out of order');
        }
        this._years = parseInt(currentNum, 10);
        seen.push('Y');
        valid = valid.slice(valid.indexOf('Y')+1);
        currentNum = '';
        break;
      case 'M':
        if(inTime) {
          if(currentNum.length < 1) {
            throw new Error('Invalid Duration: invalid minutes');
          }
          if(seen.indexOf('Mi') != -1) {
            throw new Error('Invalid Duration: duplicate minutes');
          }
          if(valid.indexOf('Mi') == -1) {
            throw new Error('Invalid Duration: minutes out of order');
          }
          this._minutes = parseInt(currentNum, 10);
          seen.push('Mi');
          valid = valid.slice(valid.indexOf('Mi')+1);
          currentNum = '';
        } else {
          if(currentNum.length < 1) {
            throw new Error('Invalid Duration: invalid months');
          }
          if(seen.indexOf('Mo') != -1) {
            throw new Error('Invalid Duration: duplicate months');
          }
          if(valid.indexOf('Mo') == -1) {
            throw new Error('Invalid Duration: months out of order');
          }
          this._months = parseInt(currentNum, 10);
          valid = valid.slice(valid.indexOf('Mo')+1);
          seen.push('Mo');
          currentNum = '';
        }
        break;
      case 'D':
        if(currentNum.length < 1) {
          throw new Error('Invalid Duration: invalid days');
        }
        if(seen.indexOf('D') != -1) {
          throw new Error('Invalid Duration: duplicate days');
        }
        if(valid.indexOf('D') == -1) {
          throw new Error('Invalid Duration: days out of order');
        }
        this._days = parseInt(currentNum, 10);
        seen.push('D');
        valid = valid.slice(valid.indexOf('D')+1);
        currentNum = '';
        break;
      case 'H':
        if(!inTime) {
          throw new Error('Invalid Duration: Missing T before hours');
        }
        if(currentNum.length < 1) {
          throw new Error('Invalid Duration: invalid hours');
        }
        if(seen.indexOf('H') != -1) {
          throw new Error('Invalid Duration: duplicate hours');
        }
        if(valid.indexOf('H') == -1) {
          throw new Error('Invalid Duration: hours out of order');
        }
        this._hours = parseInt(currentNum, 10);
        seen.push('H');
        valid = valid.slice(valid.indexOf('H')+1);
        currentNum = '';
        break;
      case 'S':
        if(!inTime) {
          throw new Error('Invalid Duration: Missing T before seconds');
        }
        if(currentNum.length < 1) {
          throw new Error('Invalid Duration: invalid seconds');
        }
        if(seen.indexOf('S') != -1) {
          throw new Error('Invalid Duration: duplicate seconds');
        }
        // Note that you cannot have seconds out of order because it is last
        this._seconds = parseInt(currentNum, 10);
        seen.push('S');
        valid = [];
        currentNum = '';
        break;
      case 'T':
        if(seen.indexOf('T') != -1) {
          throw new Error('Invalid Duration: duplicate T');
        }
        inTime = true;
        seen.push('T');
        valid = valid.slice(valid.indexOf('T')+1);
        break;
      default:
        throw new Error('Invalid Duration: Unknown Letter '+character);
    }
  }

  // If there is leftover we have an invalid
  if(currentNum != '') {
    throw new Error('Invalid Duration: No letter after '+currentNum);
  }

}

/**
 * Return the string recurring.
 */
Duration.prototype.getType = function() {
  return 'duration';
}

/**
 * A duration is never approximate.
 */
Duration.prototype.isApproximate = function() {
  return false;
}

/**
 * Return the years as a number or undefined.
 */
Duration.prototype.getYears = function() {
  return this._years;
}

/**
 * Return the months as a number or undefined.
 */
Duration.prototype.getMonths = function() {
  return this._months;
}

/**
 * Return the days as a number or undefined.
 */
Duration.prototype.getDays = function() {
  return this._days;
}

/**
 * Return the hours as a number or undefined.
 */
Duration.prototype.getHours = function() {
  return this._hours;
}

/**
 * Return the minutes as a number or undefined.
 */
Duration.prototype.getMinutes = function() {
  return this._minutes;
}

/**
 * Return the seconds as a number or undefined.
 */
Duration.prototype.getSeconds = function() {
  return this._seconds;
}

/**
 * Output Formalized duration string.
 */
Duration.prototype.toFormalString = function() {
  var duration = 'P';

  if(this._years) {
    duration += this._years+'Y';
  }

  if(this._months) {
    duration += this._months+'M';
  }

  if(this._days) {
    duration += this._days+'D';
  }

  if(this._hours || this._minutes || this._seconds) {
    duration += 'T';

    if(this._hours) {
      duration += this._hours+'H';
    }

    if(this._minutes) {
      duration += this._minutes+'M';
    }

    if(this._seconds) {
      duration += this._seconds+'S';
    }
  }

  return duration;
}

module.exports = Duration;
},{}],3:[function(require,module,exports){
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
    return new Recurring(str);
  } else if(/\//.test(str)) {
    return new Range(str);
  } else if(str.charAt(0) == 'A') {
    return new Approximate(str);
  } else {
    return new Simple(str);
  }
}

/**
 * The version of this library.
 */
GedcomXDate.version = '0.3.2';

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

/**
 * Expose now.
 */
GedcomXDate.now = GedUtil.now;

/**
 * Expose fromJSDate.
 */
GedcomXDate.fromJSDate = GedUtil.fromJSDate;

module.exports = GedcomXDate;
},{"./approximate.js":1,"./duration.js":2,"./range.js":4,"./recurring.js":5,"./simple.js":6,"./util.js":8}],4:[function(require,module,exports){
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

  if(this.duration) {
    range += this.duration.toFormalString();
  } else if(this.end) {
    range += this.end.toFormalString();
  }

  return range;
}

module.exports = Range;
},{"./approximate.js":1,"./duration.js":2,"./simple.js":6,"./util.js":8}],5:[function(require,module,exports){
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
},{"./range.js":4,"./util.js":8,"util":12}],6:[function(require,module,exports){
var GlobalUtil = require('./util-global.js');
/**
 * The simplest representation of a date.
 */
function Simple() {

  // If arguments passed in, try and parse the simple date
  if(arguments.length > 0) {
    this._parse(arguments[0]);
  } else {
    // Note that all dates and times are UTC internally!
    var date = new Date();
    this._year = date.getUTCFullYear();
    this._month = date.getUTCMonth();
    this._day = date.getUTCDay();
    this._hours = date.getUTCHours();
    this._minutes = date.getUTCMinutes();
    this._seconds = date.getUTCSeconds();
    this._tzHours = 0;
    this._tzMinutes = 0;
  }
}

/**
 * Parse a simple date.
 * This function also does strict validation.
 */
Simple.prototype._parse = function(str) {

  var end = str.length;
      offset = 0;

  // There is a minimum length of 5 characters
  if(str.length < 5) throw new Error('Invalid Date');

  // Extract and validate year
  var year = str.substr(offset,5);
  if(year.match(/^[+-][0-9]{4}$/) === null) {
    throw new Error('Invalid Date: Malformed year');
  }
  this._year = parseInt(year, 10);
  offset += 5;

  if(offset == end) {
    return;
  }

  // If there is time
  if(str.charAt(offset) == 'T') {
    return this._parseTime(str.substr(offset+1));
  }

  if(str.charAt(offset) != '-') {
    throw new Error('Invalid Date: Malformed year-month separator');
  }

  if(end-offset < 3) {
    throw new Error('Invalid Date: Malformed month');
  }

  // Extract and validate month
  var month = str.substr(offset+1,2);
  if(month.match(/^(0[1-9]|1[0-2])$/) === null) {
    throw new Error('Invalid Date: Malformed month');
  }
  this._month = parseInt(month, 10);
  offset += 3;

  if(offset == end) {
    return;
  }

  // If there is time
  if(str.charAt(offset) == 'T') {
    return this._parseTime(str.substr(offset+1));
  }

  if(str.charAt(offset) != '-') {
    throw new Error('Invalid Date: Malformed month-day separator');
  }

  if(end-offset < 3) {
    throw new Error('Invalid Date: Malformed day');
  }

  // Extract and validate day
  var day = str.substr(offset+1,2);
  var daysInMonth = GlobalUtil.daysInMonth(this._month, this._year);

  switch(daysInMonth) {
    case 31:
      if(day.match(/^(0[1-9]|[1-2][0-9]|3[0-1])$/) === null) {
        throw new Error('Invalid Date: Malformed day (31 in month '+this._month+')');
      }
      break;
    case 30:
      if(day.match(/^(0[1-9]|[1-2][0-9]|30)$/) === null) {
        throw new Error('Invalid Date: Malformed day (30 in month '+this._month+')');
      }
      break;
    case 29:
      if(day.match(/^(0[1-9]|1[0-9]|2[0-9])$/) === null) {
        throw new Error('Invalid Date: Malformed day (29 in month '+this._month+' - leapyear)');
      }
      break;
    case 28:
      if(day.match(/^(0[1-9]|1[0-9]|2[0-8])$/) === null) {
        throw new Error('Invalid Date: Malformed day (28 in month '+this._month+')');
      }
      break;
  }
  this._day = parseInt(day, 10);
  offset += 3;

  if(offset == end) return;

  // If there is time
  if(str.charAt(offset) == 'T') {
    return this._parseTime(str.substr(offset+1));
  } else {
    throw new Error('Invalid Date');
  }

}

/**
 * Parse the time component.
 */
Simple.prototype._parseTime = function(str) {
  
  var offset = 0,
      end = str.length,
      flag24 = false;

  // Always initialize the Timezone to the local offset.
  // It may be overridden if set
  var tempDate = new Date(),
      tempOffset = tempDate.getTimezoneOffset();
  
  this._tzHours = tempOffset/60;
  this._tzMinutes = tempOffset%60;

  // There is a minimum length of 2 characters
  if(str.length < 2) throw new Error('Invalid Date: Malformed hours');

  // Extract and validate hours
  var hours = str.substr(offset,2);
  if(hours.match(/^([0-1][0-9]|2[0-3])$/) === null) {
    if(hours == '24') {
      flag24 = true;
    } else {
      throw new Error('Invalid Date: Malformed hours');
    }
  }
  this._hours = parseInt(hours, 10);
  offset += 2;

  if(offset == end) {
    return;
  }

  // If there is timezone offset
  if(str.charAt(offset) == '+' || str.charAt(offset) == '-' || str.charAt(offset) == 'Z') {
    return this._parseTimezone(str.substr(offset));
  }

  if(str.charAt(offset) != ':') {
    throw new Error('Invalid Date: Malformed hour-minute separator');
  }

  if(end-offset < 3) {
    throw new Error('Invalid Date: Malformed minutes');
  }

  var minutes = str.substr(offset+1,2);
  if(minutes.match(/^[0-5][0-9]$/) === null) {
    throw new Error('Invalid Date: Malformed minutes');
  }
  if(flag24 && minutes != '00') {
    throw new Error('Invalid Date: Hour of 24 requires 00 minutes');
  }
  this._minutes = parseInt(minutes, 10);
  offset += 3;

  if(offset == end) {
    return;
  }

  // If there is timezone offset
  if(str.charAt(offset) == '+' || str.charAt(offset) == '-' || str.charAt(offset) == 'Z') {
    return this._parseTimezone(str.substr(offset));
  }

  if(str.charAt(offset) != ':') {
    throw new Error('Invalid Date: Malformed minute-second separator');
  }

  if(end-offset < 3) {
    throw new Error('Invalid Date: Malformed seconds');
  }

  var seconds = str.substr(offset+1,2);
  if(seconds.match(/^[0-5][0-9]$/) === null) {
    throw new Error('Invalid Date: Malformed seconds');
  }
  if(flag24 && seconds != '00') {
    throw new Error('Invalid Date: Hour of 24 requires 00 seconds');
  }
  this._seconds = parseInt(seconds, 10);
  offset += 3;

  if(offset == end) {
    return;
  }

  // If there is timezone offset
  if(str.charAt(offset) == '+' || str.charAt(offset) == '-' || str.charAt(offset) == 'Z') {
    return this._parseTimezone(str.substr(offset));
  } else {
    throw new Error('Invalid Date: Malformed Time');
  }

}

/**
 * Parse the timezone component.
 */
Simple.prototype._parseTimezone = function(str) {
  
  var offset = 0,
      end = str.length;

  // If Z we're done
  if(str.charAt(0) == 'Z') {
    if(str.length == 1) {
      this._tzHours = 0;
      this._tzMinutes = 0;
      return;
    } else {
      throw new Error('Invalid Date: malformed timezone');
    }
  }

  if(end-offset < 3) {
    throw new Error('Invalid Date: Malformed timezone');
  }

  var tzHours = str.substr(offset,3);
  if(tzHours.match(/^[+-]([0-1][0-9]|2[0-3])$/) === null) {
    throw new Error('Invalid Date: Malformed timezone hours');
  }
  this._tzHours = parseInt(tzHours, 10);
  // set tz minutes to clear out default local tz offset
  this._tzMinutes = 0;
  offset += 3;

  if(offset == end) {
    return;
  }

  if(str.charAt(offset) != ':') {
    throw new Error('Invalid Date: Malformed timezone hour-minute separator');
  }

  if(end-offset < 3) {
    throw new Error('Invalid Date: Malformed timezone minutes');
  }
  
  var tzMinutes = str.substr(offset+1,2);
  if(tzMinutes.match(/^[0-5][0-9]$/) === null) {
    throw new Error('Invalid Date: Malformed timezone minutes');
  }
  this._tzMinutes = parseInt(tzMinutes, 10);
  offset += 3;

  if(offset == end) {
    return;
  } else {
    throw new Error('Invalid Date: Malformed timezone');
  }

}

/**
 * Return the string single.
 */
Simple.prototype.getType = function() {
  return 'single';
}

/**
 * A simple date is not approximate.
 */
Simple.prototype.isApproximate = function() {
  return false;
}

/**
 * Return the year as a number. 
 */
Simple.prototype.getYear = function() {
  return this._year;
}

/**
 * Return the month as a number. 
 */
Simple.prototype.getMonth = function() {
  return this._month;
}

/**
 * Return the day as a number. 
 */
Simple.prototype.getDay = function() {
  return this._day;
}

/**
 * Return the hours as a number. 
 */
Simple.prototype.getHours = function() {
  return this._hours;
}

/**
 * Return the minutes as a number. 
 */
Simple.prototype.getMinutes = function() {
  return this._minutes;
}

/**
 * Return the seconds as a number. 
 */
Simple.prototype.getSeconds = function() {
  return this._seconds;
}

/**
 * Return the timezone hours as a number. 
 */
Simple.prototype.getTZHours = function() {
  return this._tzHours;
}

/**
 * Return the timezone minutes as a number. 
 */
Simple.prototype.getTZMinutes = function() {
  return this._tzMinutes;
}

/**
 * Output Formalized simple string.
 */
Simple.prototype.toFormalString = function() {
  var simple = '';

  if(this._year >= 0) {
    simple += '+'+('0000'+this._year).substr(-4,4);
  } else {
    simple += '-'+('0000'+Math.abs(this._year)).substr(-4,4);
  }

  if(this._month) {
    simple += '-'+('00'+this._month).substr(-2,2);
  }

  if(this._day) {
    simple += '-'+('00'+this._day).substr(-2,2);
  }

  if(this._hours != undefined || this._minutes != undefined || this._seconds != undefined) {
    simple += 'T';
  }

  if(this._hours != undefined) {
    simple += ('00'+this._hours).substr(-2,2);
  }

  if(this._minutes != undefined) {
    simple += ':'+('00'+this._minutes).substr(-2,2);
  }

  if(this._seconds != undefined) {
    simple += ':'+('00'+this._seconds).substr(-2,2);
  }

  if(this._hours != undefined || this._minutes != undefined || this._seconds != undefined) {
    if(this._tzHours === 0 || this._tzMinutes === 0) {
      simple += 'Z';
    } else {
      if(this._tzHours != undefined) {
        if(this._tzHours >= 0) {
          simple += '+';
        } else {
          simple += '-';
        }
        simple += ('00'+Math.abs(this._tzHours)).substr(-2,2);
      }
      if(this._tzMinutes != undefined) {
        simple += ':'+('00'+this._tzMinutes).substr(-2,2);
      }
    }
  }

  return simple;
}

module.exports = Simple;
},{"./util-global.js":7}],7:[function(require,module,exports){
module.exports = {
  daysInMonth: daysInMonth
}

/**
 * Return the number of days in a month, 
 * taking leapyear into account.
 */
function daysInMonth(month, year) {
  switch(month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      var leapyear;
      if(year % 4 != 0) {
        leapyear = false;
      } else if(year % 100 != 0) {
        leapyear = true;
      } else if(year % 400 != 0) {
        leapyear = false;
      } else {
        leapyear = true;
      }
      if(leapyear) {
        return 29;
      } else {
        return 28;
      }
    default:
      throw new Error('Unknown Month');
  }
}
},{}],8:[function(require,module,exports){
var GlobalUtil = require('./util-global.js'),
    Duration = require('./duration.js'),
    Simple = require('./simple.js'),
    Approximate = require('./approximate.js');

module.exports = {
  getDuration: getDuration,
  daysInMonth: GlobalUtil.daysInMonth,
  addDuration: addDuration,
  multiplyDuration: multiplyDuration,
  now: now,
  fromJSDate: fromJSDate
}

/**
 * Takes in a start duration and a multiplier,
 * and returns a new Duration.
 * Rounds using Math.round
 */
function multiplyDuration(startDuration, multiplier) {

  if(!isFinite(multiplier) || multiplier <= 0) {
    throw new Error('Invalid Multiplier');
  }

  var newDuration = {},
      hasTime = false,
      duration = '';

  if(startDuration.getSeconds()) {
    newDuration.seconds = Math.round(startDuration.getSeconds()*multiplier);
  }

  if(startDuration.getMinutes()) {
    newDuration.minutes = Math.round(startDuration.getMinutes()*multiplier);
  }

  if(startDuration.getHours()) {
    newDuration.hours = Math.round(startDuration.getHours()*multiplier);
  }

  if(startDuration.getDays()) {
    newDuration.days = Math.round(startDuration.getDays()*multiplier);
  }

  if(startDuration.getMonths()) {
    newDuration.months = Math.round(startDuration.getMonths()*multiplier);
  }

  if(startDuration.getYears()) {
    newDuration.years = Math.round(startDuration.getYears()*multiplier);
  }

  if(newDuration.seconds) {
    hasTime = true;
    duration = newDuration.seconds+'S'+duration;
  }

  if(newDuration.minutes) {
    hasTime = true;
    duration = newDuration.minutes+'M'+duration;
  }

  if(newDuration.hours) {
    hasTime = true;
    duration = newDuration.hours+'H'+duration;
  }

  if(hasTime) {
    duration = 'T'+duration;
  }

  if(newDuration.days) {
    duration = newDuration.days+'D'+duration;
  }

  if(newDuration.months) {
    duration = newDuration.months+'M'+duration;
  }

  if(newDuration.years) {
    duration = newDuration.years+'Y'+duration;
  }

  if(!duration) {
    throw new Error('Invalid Duration Multiplier');
  }

  return new Duration('P'+duration);

}

/**
 * Adds a duration to a date, returning the new date.
 */
function addDuration(startDate, duration) {
  var end = getObjFromDate(startDate, false),
      endString = '';

  // Initialize all the values we need in end based on the duration
  zipDuration(end, duration);

  // Add Timezone offset to endString
  if(startDate.getTZHours() != undefined) {
    if(startDate.getTZHours() < 0) {
      endString += '-';
    } else {
      endString += '+';
    }
    endString += ('00'+Math.abs(startDate.getTZHours())).substr(-2,2);
    endString += ':'+('00'+Math.abs(startDate.getTZMinutes())).substr(-2,2);
  }

  if(duration.getSeconds()) {
    end.seconds += duration.getSeconds();
  }
  while(end.seconds && end.seconds >= 60) {
    end.seconds -= 60;
    end.minutes += 1;
  }
  if(end.seconds != undefined) {
    endString = ':'+('00'+end.seconds).substr(-2,2)+endString;
  }

  if(duration.getMinutes()) {
    end.minutes += duration.getMinutes();
  }
  while(end.minutes && end.minutes >= 60) {
    end.minutes -= 60;
    end.hours += 1;
  }
  if(end.minutes != undefined) {
    endString = ':'+('00'+end.minutes).substr(-2,2)+endString;
  }

  if(duration.getHours()) {
    end.hours += duration.getHours();
  }
  while(end.hours && end.hours >= 24) {
    end.hours -= 24;
    end.day += 1;
  }
  if(end.hours != undefined) {
    endString = 'T'+('00'+end.hours).substr(-2,2)+endString;
  }

  if(duration.getDays()) {
    end.day += duration.getDays();
  }
  while(end.day && end.day > GlobalUtil.daysInMonth(end.month, end.year)) {
    end.month += 1;
    if(end.month > 12) {
      end.month -= 12;
      end.year += 1;
    }
    end.day -= GlobalUtil.daysInMonth(end.month, end.year);
  }
  if(end.day != undefined) {
    endString = '-'+('00'+end.day).substr(-2,2)+endString;
  }

  if(duration.getMonths()) {
    end.month += duration.getMonths();
  }
  while(end.month && end.month > 12) {
    end.month -= 12;
    end.year += 1;
  }
  if(end.month != undefined) {
    endString = '-'+('00'+end.month).substr(-2,2)+endString;
  }

  if(duration.getYears()) {
    end.year += duration.getYears();
  }
  if(end.year != undefined) {
    endString = ('0000'+Math.abs(end.year)).substr(-4,4)+endString;
    if(end.year < 0) {
      endString = '-'+endString;
    } else {
      endString = '+'+endString;
    }
  }

  // After adding year we could have bumped into a non leap year
  // TODO fix this

  if(end.year > 9999) {
    throw new Error('New date out of range');
  }

  // TODO return actual simple or approximate dates
  if(startDate.isApproximate()) {
    endString = 'A'+endString;
    return new Approximate(endString);
  } else {
    return new Simple(endString);
  }

}

/**
 * Returns the duration between the starting and ending date.
 */
function getDuration(startDate, endDate) {
  
  if(!(startDate instanceof Simple && endDate instanceof Simple)){
    throw new Error('Start and end dates must be simple dates');
  }
  
  var start = getObjFromDate(startDate, true),
      end = getObjFromDate(endDate, true),
      hasTime = false,
      duration = '';

  zipDates(start, end);

  if(end.seconds != undefined) {
    while(end.seconds-start.seconds < 0) {
      end.minutes -= 1;
      end.seconds += 60;
    }
    if(end.seconds-start.seconds > 0) {
      hasTime = true;
      duration = ('00'+(end.seconds-start.seconds)).substr(-2,2)+'S'+duration;
    }
  }

  if(end.minutes != undefined) {
    while(end.minutes-start.minutes < 0) {
      end.hours -= 1;
      end.minutes += 60;
    }
    if(end.minutes-start.minutes > 0) {
      hasTime = true;
      duration = ('00'+(end.minutes-start.minutes)).substr(-2,2)+'M'+duration;
    }
  }

  if(end.hours != undefined) {
    while(end.hours-start.hours < 0) {
      end.day -= 1;
      end.hours += 24;
    }
    if(end.hours-start.hours > 0) {
      hasTime = true;
      duration = ('00'+(end.hours-start.hours)).substr(-2,2)+'H'+duration;
    }
  }

  if(hasTime) {
    duration = 'T'+duration;
  }

  if(end.day != undefined) {
    while(end.day-start.day < 0) {
      end.day += GlobalUtil.daysInMonth(end.month,end.year);
      end.month -= 1;
      if(end.month < 1) {
        end.year -= 1;
        end.month += 12;
      }
    }
    if(end.day-start.day > 0) {
      duration = ('00'+(end.day-start.day)).substr(-2,2)+'D'+duration;
    }
  }

  if(end.month != undefined) {
    while(end.month-start.month < 0) {
      end.year -= 1;
      end.month += 12;
    }
    if(end.month-start.month > 0) {
      duration = ('00'+(end.month-start.month)).substr(-2,2)+'M'+duration;
    }
  }

  if(end.year-start.year > 0) {
    duration = ('0000'+(end.year-start.year)).substr(-4,4)+'Y'+duration;
  }

  if(end.year-start.year < 0 || duration == '') {
    throw new Error('Start Date must be less than End Date');
  }

  return new Duration('P'+duration);
}

/**
 * Ensures that both start and end have values where the other has values.
 * For example, if start has minutes but end does not, this function
 * will initialize minutes in end.
 */
function zipDates(start, end) {
  if(start.month != undefined && end.month == undefined) {
    end.month = 1;
  }
  if(start.month == undefined && end.month != undefined) {
    start.month = 1;
  }

  if(start.day != undefined && end.day == undefined) {
    end.day = 1;
  }
  if(start.day == undefined && end.day != undefined) {
    start.day = 1;
  }

  if(start.hours != undefined && end.hours == undefined) {
    end.hours = 0;
  }
  if(start.hours == undefined && end.hours != undefined) {
    start.hours = 0;
  }

  if(start.minutes != undefined && end.minutes == undefined) {
    end.minutes = 0;
  }
  if(start.minutes == undefined && end.minutes != undefined) {
    start.minutes = 0;
  }

  if(start.seconds != undefined && end.seconds == undefined) {
    end.seconds = 0;
  }
  if(start.seconds == undefined && end.seconds != undefined) {
    start.seconds = 0;
  }
}

/**
 * Ensures that date has its proeprties initialized based on what the duration has.
 * For example, if date does not have minutes and duration does, this will
 * initialize minutes in the date.
 */
function zipDuration(date, duration) {
  var toSet = {};

  if(duration.getSeconds()) {
    toSet = {
      seconds: true,
      minutes: true,
      hours: true,
      days: true,
      months: true
    };
  } else if(duration.getMinutes()) {
    toSet = {
      minutes: true,
      hours: true,
      days: true,
      months: true
    };
  } else if(duration.getHours()) {
    toSet = {
      hours: true,
      days: true,
      months: true
    };
  } else if(duration.getDays()) {
    toSet = {
      days: true,
      months: true
    };
  } else if(duration.getMonths()) {
    toSet = {
      months: true
    };
  } else {
    return;
  }

  if(toSet.seconds && date.seconds == undefined) {
    date.seconds = 0;
  }

  if(toSet.minutes && date.minutes == undefined) {
    date.minutes = 0;
  }

  if(toSet.hours && date.hours == undefined) {
    date.hours = 0;
  }

  if(toSet.days && date.day == undefined) {
    date.day = 1;
  }

  if(toSet.months && date.month == undefined) {
    date.month = 1;
  }

}

/**
 * Returns an object representing a date, optionally normalizing to UTC time.
 */
function getObjFromDate(date, adjustTimezone) {
  var obj = {
    year: date.getYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }

  if(adjustTimezone) {
    if(obj.minutes != undefined && date.getTZMinutes() != undefined) {
      obj.minutes += date.getTZMinutes();
    }

    if(obj.hours != undefined && date.getTZHours() != undefined) {
      obj.hours += date.getTZHours();
    }
  }
  return obj;
}

/**
 * Returns a new single date representing the current date
 */
function now(){
  return fromJSDate(new Date());
}

/**
 * Return a simple date object from a JavaScript date object
 */
function fromJSDate(date){
  // Remove the millisecond time component
  return new Simple('+' + date.toISOString().replace(/\.\d{3}/,''));
};
},{"./approximate.js":1,"./duration.js":2,"./simple.js":6,"./util-global.js":7}],9:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],11:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],12:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":11,"_process":10,"inherits":9}]},{},[3])(3)
});