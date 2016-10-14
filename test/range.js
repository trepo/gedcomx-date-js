var path = require('path'),
    expect = require('chai').expect,
    Simple = require(path.join('../lib', 'simple.js')),
    Duration = require(path.join('../lib', 'duration.js')),
    Range = require(path.join('../lib', 'range.js'));

describe('Range', function(){

  describe("#(start, end)", function(){
    it('should initialize', function(){

      var range = new Range('+1000/P1Y');

      expect(range).to.be.instanceof(Object);
    });

    it('should parse A+1000-01-01T24:00:00Z/+2000-01-01T24:00:00Z', function(){
      var range = new Range('A+1000-01-01T24:00:00Z/+2000-01-01T24:00:00Z');
      expect(range.start.getYear()).to.equal(1000);
      expect(range.start.getMonth()).to.equal(1);
      expect(range.start.getDay()).to.equal(1);
      expect(range.start.getHours()).to.equal(24);
      expect(range.start.getMinutes()).to.equal(0);
      expect(range.start.getSeconds()).to.equal(0);
      expect(range.start.getTZHours()).to.equal(0);
      expect(range.start.getTZMinutes()).to.equal(0);

      expect(range.end.getYear()).to.equal(2000);
      expect(range.end.getMonth()).to.equal(1);
      expect(range.end.getDay()).to.equal(1);
      expect(range.end.getHours()).to.equal(24);
      expect(range.end.getMinutes()).to.equal(0);
      expect(range.end.getSeconds()).to.equal(0);
      expect(range.end.getTZHours()).to.equal(0);
      expect(range.end.getTZMinutes()).to.equal(0);

      expect(range.start).to.be.instanceof(Simple);
      expect(range.end).to.be.instanceof(Simple);

      expect(range.isApproximate()).to.equal(true);
    });

    it('should parse +1000-01-01T24:00:00Z/+2000-01-01T24:00:00Z', function(){
      var range = new Range('+1000-01-01T24:00:00Z/+2000-01-01T24:00:00Z');
      expect(range.start.getYear()).to.equal(1000);
      expect(range.start.getMonth()).to.equal(1);
      expect(range.start.getDay()).to.equal(1);
      expect(range.start.getHours()).to.equal(24);
      expect(range.start.getMinutes()).to.equal(0);
      expect(range.start.getSeconds()).to.equal(0);
      expect(range.start.getTZHours()).to.equal(0);
      expect(range.start.getTZMinutes()).to.equal(0);

      expect(range.end.getYear()).to.equal(2000);
      expect(range.end.getMonth()).to.equal(1);
      expect(range.end.getDay()).to.equal(1);
      expect(range.end.getHours()).to.equal(24);
      expect(range.end.getMinutes()).to.equal(0);
      expect(range.end.getSeconds()).to.equal(0);
      expect(range.end.getTZHours()).to.equal(0);
      expect(range.end.getTZMinutes()).to.equal(0);

      expect(range.start).to.be.instanceof(Simple);
      expect(range.end).to.be.instanceof(Simple);

      expect(range.start.isApproximate()).to.equal(false);
    });

    it('should parse +1000-01-01T24:00:00Z P1000Y01M02DT03H04M05S', function(){
      var range = new Range('+1000-01-01T24:00:00Z/P1000Y01M02DT03H04M05S');
      expect(range.start.getYear()).to.equal(1000);
      expect(range.start.getMonth()).to.equal(1);
      expect(range.start.getDay()).to.equal(1);
      expect(range.start.getHours()).to.equal(24);
      expect(range.start.getMinutes()).to.equal(0);
      expect(range.start.getSeconds()).to.equal(0);
      expect(range.start.getTZHours()).to.equal(0);
      expect(range.start.getTZMinutes()).to.equal(0);

      expect(range.duration.getType()).to.equal('duration');
      expect(range.duration.getYears()).to.equal(1000);
      expect(range.duration.getMonths()).to.equal(1);
      expect(range.duration.getDays()).to.equal(2);
      expect(range.duration.getHours()).to.equal(3);
      expect(range.duration.getMinutes()).to.equal(4);
      expect(range.duration.getSeconds()).to.equal(5);

      expect(range.start).to.be.instanceof(Simple);
      expect(range.duration).to.be.instanceof(Duration);

      expect(range.start.isApproximate()).to.equal(false);
    });

    it('should error on A+2000-01-01T24:00:00ZB null', function(){
      expect(function() {
        var range = new Range('A+2000-01-01T24:00:00ZB/');
      }).to.throw(Error, 'Invalid Date: malformed timezone in Range Start Date');
    });

    it('should error on null A+2000-01-01T24:00:00ZB', function(){
      expect(function() {
        var range = new Range('A/+2000-01-01T24:00:00ZB');
      }).to.throw(Error, 'Invalid Date: malformed timezone in Range End Date');
    });

    it('should error on +2000-01-01T24:00:00ZB null', function(){
      expect(function() {
        var range = new Range('+2000-01-01T24:00:00ZB/');
      }).to.throw(Error, 'Invalid Date: malformed timezone in Range Start Date');
    });

    it('should error on null +2000-01-01T24:00:00ZB', function(){
      expect(function() {
        var range = new Range('/+2000-01-01T24:00:00ZB');
      }).to.throw(Error, 'Invalid Date: malformed timezone in Range End Date');
    });

    it('should error on +1000-01-01T24:00:00Z PY', function(){
      expect(function() {
        var range = new Range('+1000-01-01T24:00:00Z/PY');
      }).to.throw(Error, 'Invalid Duration: invalid years in Range End Date');
    });

    it('should calculate range correctly', function(){
      var range = new Range('+1000-02-03/+2000');

      expect(range.duration.getYears()).to.equal(999);
      expect(range.duration.getMonths()).to.equal(10);
      expect(range.duration.getDays()).to.equal(29);
    });

    it('should calculate tricky range correctly', function(){
      var range = new Range('+1970-01-31/+1973-02-01');

      expect(range.duration.getYears()).to.equal(2);
      expect(range.duration.getMonths()).to.equal(11);
      expect(range.duration.getDays()).to.equal(29);
    });

    it('should calculate approximate duration', function(){
      var range = new Range('A+1000/P1000Y');

      expect(range.end.getYear()).to.equal(2000);
      expect(range.isApproximate()).to.equal(true);
    });

    it('should error on null P1Y', function(){
      expect(function() {
        var range = new Range('/P1Y');
      }).to.throw(Error, 'A Range may not end with a duration if missing a start date');
    });

  });

  describe("#getType()", function(){
    it('should return range', function(){

      var range = new Range('A+1000/');

      expect(range.getType()).to.equal('range');
    });

  });

  describe("#isApproximate()", function(){
    it('should return true for A+2000 A+2001', function(){

      var range = new Range('A+2000/+2001');

      expect(range.isApproximate()).to.equal(true);
    });

    it('should return true for null A+2000', function(){

      var range = new Range('A/+2000');

      expect(range.start).to.be.equal(undefined);
      expect(range.end).to.be.instanceof(Simple);

      expect(range.isApproximate()).to.equal(true);
    });

    it('should return false for +2000 null', function(){

      var range = new Range('+2000/');

      expect(range.isApproximate()).to.equal(false);
    });

    it('should return false for +2000 P0074Y', function(){

      var range = new Range('+2000/P0074Y');

      expect(range.isApproximate()).to.equal(false);
    });

  });

  describe("#getStart()", function(){
    it('should return start', function(){
      var range = new Range('+2000/');
      expect(range.getStart()).to.be.instanceof(Simple);
    });
  });

  describe("#getDuration()", function(){
    it('should return duration', function(){
      var range = new Range('+2000/P0100Y');
      expect(range.getDuration()).to.be.instanceof(Duration);
    });
  });

  describe("#getEnd()", function(){
    it('should return end', function(){
      var range = new Range('/+2000');
      expect(range.getEnd()).to.be.instanceof(Simple);
    });
  });

  describe("#toFormalString()", function(){
    it('should return from', function(){
      var range = new Range('A+1000-01-01T12:30:15Z/');
      expect(range.toFormalString()).to.equal('A+1000-01-01T12:30:15Z/');
    });

    it('should return to', function(){
      var range = new Range('/+1000-01-01T12:30:15Z');
      expect(range.toFormalString()).to.equal('/+1000-01-01T12:30:15Z');
    });

    it('should return from and duration', function(){
      var range = new Range('A+1000-01-01T12:30:15Z/P1Y');
      expect(range.toFormalString()).to.equal('A+1000-01-01T12:30:15Z/P1Y');
    });

    it('should handle approximate', function(){
      var range = new Range('A/+1000-01-01T12:30:15Z');
      expect(range.toFormalString()).to.equal('A/+1000-01-01T12:30:15Z');
    });

  });

});