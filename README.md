# gedcomx-date-js
A GEDCOM-X Date Parser for Javascript, fully compliant with the [spec](https://github.com/FamilySearch/gedcomx/blob/master/specifications/date-format-specification.md) and patterned after javascript's `Date` object.

# TODO

* Always set TZ offset to 00:00 when parsing single dates
* Finish testing coverage
* Browserify
* Fix single tests to also check for error string (like range)
* Finish and move _getDateFromDuration in Range
* Finish informal duration parsing
* Add getNthInstance() to Recurring
* finish comment blocks on every function

# Download

## Node.js
You can install vGraph by cloning this repository or by using npm
````bash
npm install gedcomx-date
````

## Browser
// TODO

# Tests

There is a fairly comprehensive test suite.
````bash
# To run the tests cd to the repo directory and run
mocha

# To generate the code coverage run
./coverage/generate.sh
````
Note: make sure you install [jscoverage](https://github.com/visionmedia/node-jscoverage) globally before generating coverage.


# Reference
When you create a new GedcomXDate you pass in a formal date string into the contructor.
It will parse and validate the string, and return an object representation of it.
If there is a parsing error GedcomXDate with throw an error.

## Simple
````javascript
var date = new GedcomXDate('A+2000-01-01');
// date will be a Simple Date
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



## Range
A range has three components, start, end, and duration
````javascript
var date = GedcomXDate('A+1000-01-01/2000-12-31');

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


## Recurring
A Recurring date is the same as a Range with a few more methods.
````javascript
var date = GedcomXDate('R2/+1000-01-01/2000-12-31');
````

### getType()
Returns the `string` 'recurring'.

### isApproximate()
Returns a `boolean` as to whether or not the date is approximate.

### getCount()
Returns the `number` of times this date recurs, or javascript `Infinity`.  Also accessible via the attribute `count`.



## Duration



## Utils
There are a few convinience functions exposed through the main object

### GedcomXDate.getDuration(startDate, endDate)

### GedcomXDate.daysInMonth(month, year)