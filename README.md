# GedcomX-Date
A GEDCOM-X Date Parser for Javascript, fully compliant with the [spec](https://github.com/FamilySearch/gedcomx/blob/master/specifications/date-format-specification.md).

# TODO
* Add toFormalString()
* Implement Informal Date Parsing

# Download

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
Note: make sure you install [jscoverage](https://github.com/visionmedia/node-jscoverage) globally before generating coverage.


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

### getEnd()
(Overrides Range.getEnd)
Returns the **last** instance of the recurring date or `undefined`.

### getNth()
Returns the Nth occurence of this Date


## Duration
Represents a duration of time.
````javascript
var date = GedcomXDate('A+1000-01-01/2000-12-31');

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



## Utils
There are a few convinience functions and attributes exposed through the main object

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
