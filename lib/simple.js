var moment = require('moment');

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
  switch(this._month) {
    case 1:
    case 3:
    case 5:
    case 6:
    case 8:
    case 10:
    case 12:
      if(day.match(/^(0[1-9]|[1-2][0-9]|3[0-1])$/) === null) {
        throw new Error('Invalid Date: Malformed day (31 in '+this._month+')');
      }
      break;
    case 4:
    case 7:
    case 9:
    case 11:
      if(day.match(/^(0[1-9]|[1-2][0-9]|30)$/) === null) {
        throw new Error('Invalid Date: Malformed day (30 in '+this._month+')');
      }
      break;
    case 2:
      var leapyear;
      if(this._year % 4 != 0) {
        leapyear = false;
      } else if(this._year % 100 != 0) {
        leapyear = true;
      } else if(this._year % 400 != 0) {
        leapyear = false;
      } else {
        leapyear = true;
      }
      if(leapyear) {
        if(day.match(/^(0[1-9]|1[0-9]|2[0-9])$/) === null) {
          throw new Error('Invalid Date: Malformed day (29 in '+this._month+' - leapyear)');
        }
      } else {
        if(day.match(/^(0[1-9]|1[0-9]|2[0-8])$/) === null) {
          throw new Error('Invalid Date: Malformed day (30 in '+this._month+')');
        }
      }
      break;
  }
  //if(month.match(/^(0[0-9]|1[0-2])$/) === null) throw new Error('Invalid Date: Malformed month');
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
  console.log(str);
}

/**
 * Return simple.
 */
Simple.prototype.getType = function() {
  return 'simple';
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

module.exports = Simple;