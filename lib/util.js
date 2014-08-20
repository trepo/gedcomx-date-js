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