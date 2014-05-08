var Util = require('./util.js');
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
 * This function also does strict validation
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
  this._year = parseInt(year);
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
  this._month = parseInt(month);
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
  var daysInMonth = Util.daysInMonth(this._month, this._year);

  switch(daysInMonth) {
    case 31:
      if(day.match(/^(0[1-9]|[1-2][0-9]|3[0-1])$/) === null) {
        throw new Error('Invalid Date: Malformed day (31 in '+this._month+')');
      }
      break;
    case 30:
      if(day.match(/^(0[1-9]|[1-2][0-9]|30)$/) === null) {
        throw new Error('Invalid Date: Malformed day (30 in '+this._month+')');
      }
      break;
    case 29:
      if(day.match(/^(0[1-9]|1[0-9]|2[0-9])$/) === null) {
        throw new Error('Invalid Date: Malformed day (29 in '+this._month+' - leapyear)');
      }
      break;
    case 28:
      if(day.match(/^(0[1-9]|1[0-9]|2[0-8])$/) === null) {
        throw new Error('Invalid Date: Malformed day (28 in '+this._month+')');
      }
      break;
  }
  this._day = parseInt(day);
  offset += 3;

  if(offset == end) return;

  // If there is time
  if(str.charAt(offset) == 'T') {
    return this._parseTime(str.substr(offset+1));
  } else {
    throw new Error('Invalid Date');
  }

}

Simple.prototype._parseTime = function(str) {
  
  var offset = 0,
      end = str.length,
      flag24 = false;

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
  this._hours = parseInt(hours);
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
    throw new Error('Invalid Date: Hour od 24 requires 00 minutes');
  }
  this._minutes = parseInt(minutes);
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
    throw new Error('Invalid Date: Hour od 24 requires 00 seconds');
  }
  this._seconds = parseInt(seconds);
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
  this._tzHours = parseInt(tzHours);
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
  this._tzMinutes = parseInt(tzMinutes);
  offset += 3;

  if(offset == end) {
    return;
  } else {
    throw new Error('Invalid Date: Malformed timezone');
  }

}

/**
 * Return single.
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

module.exports = Simple;