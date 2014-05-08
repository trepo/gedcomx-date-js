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
        throw new Error(e.message+' in Range End Date');
      }
      if(this.start) {
        // TODO if start is set, make sure start < end

        // TODO make sure start and end match in set values

        // Use end date and calculate duration
        this.duration = this._getDurationFromDates(this.start, this.end);
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
      this.end = this._getDateFromDuration(this.start, this.duration);
    } else {
      try {
        this.end = new Simple(endString);
      } catch(e) {
        throw new Error(e.message+' in Range End Date');
      }
      if(this.start) {
        // TODO if start is set, make sure start < end

        // TODO make sure start and end match in set values

        // Use end date and calculate duration
        this.duration = this._getDurationFromDates(this.start, this.end);
      }
    }
  }

}

Range.prototype._getDurationFromDates = function(startDate, endDate) {
  
  var start = this._getObjFromDate(startDate),
      end = this._getObjFromDate(endDate),
      hasTime = false;
      duration = '';

  this._zipDates(start, end);

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
      end.day += this._daysInMonth(end.month,end.year);
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

  if(duration == '') {
    throw new Error('Start Date must be less than End Date');
  }

  return new Duration('P'+duration);
}

Range.prototype._daysInMonth = function(month, year) {
  switch(month) {
    case 1:
    case 3:
    case 5:
    case 6:
    case 8:
    case 10:
    case 12:
      return 31;
      break;
    case 4:
    case 7:
    case 9:
    case 11:
      return 30;
      break;
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
      break;
    default:
      throw new Error('Unknown Month');
  }
}

Range.prototype._zipDates = function(start, end) {
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

Range.prototype._getObjFromDate = function(date) {
  var obj = {
    year: date.getYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }

  if(obj.minutes != undefined && date.getTZMinutes() != undefined) {
    obj.minutes += date.getTZMinutes();
  }

  if(obj.hours != undefined && date.getTZHours() != undefined) {
    obj.hours += date.getTZHours();
  }
  return obj;
}

Range.prototype._getDateFromDuration = function(startDate, durationPeriod) {
  // TODO
  if(startDate.isApproximate()) {
    return new Approximate('A+1000');
  } else {
    return new Simple('+1000');
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