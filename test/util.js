var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    fs = require('fs'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js')),
    Approximate = require(path.join(libPath, 'approximate.js')),
    Recurring = require(path.join(libPath, 'recurring.js')),
    Duration = require(path.join(libPath, 'duration.js')),
    Range = require(path.join(libPath, 'range.js')),
    GedcomXDate = require(path.join(libPath, 'gedcomx-date.js'));

describe('Util', function(){

  describe("#addDuration()", function(){
    it('should add correctly', function(){

      var duration = new Duration('P1000Y99DT90S');

      var start = new Simple('+1000');

      var end = GedcomXDate.addDuration(start, duration);

      console.log(end);

      //expect(duration.getYears()).to.equal(1000);

    });
  });

});