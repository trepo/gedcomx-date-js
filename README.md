# GedcomX-Date
A GEDCOM-X Date Library for Javascript, fully compliant with the [spec](https://github.com/FamilySearch/gedcomx/blob/master/specifications/date-format-specification.md).

# Usage
````javascript
var GedcomXDate = require('gedcomx-date');

var single = new GedcomXDate('+1900-01-01');

console.log(single.getYear());
// 1900

console.log(single.getHours());
// undefined

var range = new GedcomXDate('A-0100-01-01/P2Y');

var duration = range.getDuration();

var newSingle = GedcomX.addDuration(single, duration);

console.log(newSingle.toFormalString());
// +1902-01-01

var recurring = new GedcomXDate('R10/+1950-01-01/P10Y');

var futureDate = recurring.getNth(5);

console.log(futureDate.toformalString());
// +2000-01-01

var newDuration = GedcomXDate.getDuration(single, new GedcomXDate('+2014-03-01'));

console.log(newDuration.toFormalString());
// P114Y2M

var halfDuration = GedcomXDate.multiplyDuration(newDuration, .5);

console.log(newDuration.toFormalString());
// P57Y1M
````

## Node.js
You can install GedcomX-Date by cloning this repository or by using npm.
````bash
npm install gedcomx-date
````

## Browser
Download [GedcomXDate.js](GedcomXDate.js) and enjoy.
(Packaged with love by [browserify](http://browserify.org/))

# Tests

There is a very comprehensive test suite.
````bash
# To run the tests cd to the repo directory and run
mocha

# To generate the code coverage run
./coverage/generate.sh
````
Install [mocha](http://visionmedia.github.io/mocha/) and [jscoverage](https://github.com/visionmedia/node-jscoverage) globally before runnings tests and generating coverage.


# Reference
When you create a new GedcomXDate you pass in a formal date string into the contructor.
It will parse and validate the string, and return an object representation of it.
If there is a parsing error GedcomXDate with throw an error.

## Single
````javascript
var date = new GedcomXDate('A+2000-01-01');
// date will be a Single Date
````

### getType()
Returns the `string` 'single'.

### isApproximate()
Returns a `boolean` as to whether or not the date is approximate.

### getYear()
Returns the year as a `number` or `undefined`.

### getMonth()
Returns the month as a `number` or `undefined`.

### getDay()
Returns the day as a `number` or `undefined`.

### getHours()
Returns the hours as a `number` or `undefined`.

### getMinutes()
Returns the minutes as a `number` or `undefined`.

### getSeconds()
Returns the seconds as a `number` or `undefined`.

### getTZHours()
Returns the timezone offset hours as a `number` or `undefined`.

### getTZMinutes()
Returns the timezone offset minutes as a `number` or `undefined`.

### toFormalString()
Returns the formal GedcomX representation as a `string`.


## Range
A range has three components, start, end, and duration
````javascript
var date = GedcomXDate('A+1000-01-01/+2000-12-31');

// date.start will be a simple date
// date.end will be a simple date
// date.duration will be a duration
````

### getType()
Returns the `string` 'range'.

### isApproximate()
Returns a `boolean` as to whether or not the date is approximate.

### getStart()
Returns a Single or `undefined`. Also accessible via the attribute `start`.

### getDuration()
Returns a Duration or `undefined`. Also accessible via the attribute `duration`.

### getEnd()
Returns a Single or `undefined`. Also accessible via the attribute `end`.

### toFormalString()
Returns the formal GedcomX representation as a `string`.


## Recurring
A Recurring date is the same as a Range with a few more methods.
````javascript
var date = GedcomXDate('R2/+1000-01-01/+2000-12-31');
````

### getType()
Returns the `string` 'recurring'.

### isApproximate()
Returns a `boolean` as to whether or not the date is approximate.

### getCount()
Returns the `number` of times this date recurs, or javascript `Infinity`.  Also accessible via the attribute `count`.

### getEnd()
(Overrides Range.getEnd)
Returns the **last** instance of the recurring date or `undefined`.

### getNth()
Returns the Nth occurence of this Date

### toFormalString()
Returns the formal GedcomX representation as a `string`.

## Duration
Represents a duration of time.
````javascript
var date = GedcomXDate('A+1000-01-01/P100Y');

var duration = date.getDuration();
````

### getType()
Returns the `string` 'duration'.

### isApproximate()
Returns the `boolean` false, as a duration is never approximate according to the spec.

### getYears()
Returns the years as a `number` or `undefined`.

### getMonths()
Returns the months as a `number` or `undefined`.

### getDays()
Returns the days as a `number` or `undefined`.

### getHours()
Returns the hours as a `number` or `undefined`.

### getMinutes()
Returns the minutes as a `number` or `undefined`.

### getSeconds()
Returns the seconds as a `number` or `undefined`.

### toFormalString()
Returns the formal GedcomX representation as a `string`.


## Utils
There is an attribute and a few convenience functions exposed through GedcomXDate.

### GedcomXDate.version
Will be a string set to the version of GedcomXDate. 

### GedcomXDate.getDuration(startDate, endDate)
Returns the Duration between the startDate and endDate, or throws an error if startDate >= endDate.

### GedcomXDate.daysInMonth(month, year)
Returns the number of days in the month for the given year.

### GedcomXDate.addDuration(date, duration)
Adds duration to date and returns a new Single date.

### GedcomXDate.multiplyDuration(duration, number)
Multiplies a duration by a positive number and returns a new Duration.

### GedcomXDate.fromJSDate(Date)
Returns a Simple date representation of the given JavaScript Date.

### GedcomXDate.now()
Returns a Simple date representing the current date and time.

### GedcomXDate.compare(date1, date2)
Compare two dates. Only works for single dates.
Dates may either be in string format or already be Single date objects.

This function is designed to be used as the custom compare function
for [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
Returns:

* 0 if the dates are equal
* -1 if date1 occurs before date2
* 1 if date1 occurs after date2

```js

// Dates as strings
GedcomXDate.compare('+1845', '+1834-02-17');

// Dates as objects
var date1 = new GedcomXDate('+1394'),
    date2 = new GedcomXDate('+1723-11-04');
GedcomXDate.compare(date1, date2);

// Mix and match
GedcomXDate.compare('A+1845', new GedcomXDate('+1834-02-17'));
```