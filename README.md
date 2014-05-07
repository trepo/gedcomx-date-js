# gedcomx-date-js
A GEDCOM-X Date Parser for Javascript, fully compliant with the [spec]() and patterned after jsvascript's `Date` object.

# Download

## Node.js
You can install vGraph by cloning this repository or by using npm
````bash
npm install gedcomx-date
````

## Browser
Download this file

# Tests

There is a fairly comprehensive test suite.
````bash
cd /path/to/cloned/repo
mocha
````

To see code coverage run
````bash
cd /path/to/cloned/repo
./coverage/generate.sh
````
Open ./coverage/coverage.html in your browser to view the coverage report.

Note: make sure you install [jscoverage](https://github.com/visionmedia/node-jscoverage) first.


# Reference

## Constructor
Returns a GedcomXDate Object representing now or the datestring. // TODO fix this and sync with Constructor Parameters

````javascript
new GedcomXDate();
new GedcomXDate(type);
new GedcomXDate(type, subtype);
new GedcomXDate(type, subtype, subtype);
new GedcomXDate(dateString);
````

### Constructor Parameters
If no parameters are passed in, GedcomXDate will be a single simple Date.
If type is passed in, GedcomXDate will be a simple Date of that type.

**type**  
The type of the GedcomXDate. Possible string values are `single`, `range`, and `recurring`.

**subtype**  
The type of the GedcomXDate. Possible string values are `simple`, `approximate`, and `duration`.
Note that two subtypes are required for `range` and `recurring`

**dateString**  
A formal GEDCOM-X Date String according to the spec

### Description
If a dateString is provided but is invalid, throws an `Invalid Date` error

## Object Methods

### Date.parse(dateString)
Equivelent to new Date(dateString)

## Instance Methods

### getType()

### getSubType()

### toString()