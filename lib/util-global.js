module.exports = {
  daysInMonth: daysInMonth
}

function daysInMonth(month, year) {
  switch(month) {
    case 1:
    case 3:
    case 5:
    case 6:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 7:
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