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

  describe("#multiplyDuration()", function(){
    
    it('should double', function(){

      var initialDuration = new Duration('P1Y2M3DT4H5M6S'),
          duration = GedcomXDate.multiplyDuration(initialDuration, 2);

      expect(duration.getYears()).to.equal(2);
      expect(duration.getMonths()).to.equal(4);
      expect(duration.getDays()).to.equal(6);
      expect(duration.getHours()).to.equal(8);
      expect(duration.getMinutes()).to.equal(10);
      expect(duration.getSeconds()).to.equal(12);

    });

    it('should error on invalid multiplier', function(){
      var initialDuration = new Duration('P1Y');
      expect(function() {
        GedcomXDate.multiplyDuration(initialDuration, 'bogus');
      }).to.throw(Error, 'Invalid Multiplier');
    });

    it('should create error on very small multiplier', function(){
      var initialDuration = new Duration('P1Y');
      expect(function() {
        GedcomXDate.multiplyDuration(initialDuration, .001);
      }).to.throw(Error, 'Invalid Duration Multiplier');
    });

  });

  describe("#addDuration()", function(){
    
    it('should pass through negative timezone', function(){

      var start = new Simple('+1000-01-01T12:00:00-10:30'),
          duration = new Duration('PT90S'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1000);
      expect(end.getMonth()).to.equal(1);
      expect(end.getDay()).to.equal(1);
      expect(end.getHours()).to.equal(12);
      expect(end.getMinutes()).to.equal(1);
      expect(end.getSeconds()).to.equal(30);
      expect(end.getTZHours()).to.equal(-10);
      expect(end.getTZMinutes()).to.equal(30);

    });

    it('should pass through positive timezone', function(){

      var start = new Simple('+1000-01-01T12:00:00+10:00'),
          duration = new Duration('PT90S'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1000);
      expect(end.getMonth()).to.equal(1);
      expect(end.getDay()).to.equal(1);
      expect(end.getHours()).to.equal(12);
      expect(end.getMinutes()).to.equal(1);
      expect(end.getSeconds()).to.equal(30);
      expect(end.getTZHours()).to.equal(10);
      expect(end.getTZMinutes()).to.equal(0);

    });

    it('should add seconds', function(){

      var start = new Simple('+1000'),
          duration = new Duration('PT90S'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1000);
      expect(end.getMonth()).to.equal(1);
      expect(end.getDay()).to.equal(1);
      expect(end.getHours()).to.equal(0);
      expect(end.getMinutes()).to.equal(1);
      expect(end.getSeconds()).to.equal(30);

    });

    it('should add minutes', function(){

      var start = new Simple('+1000'),
          duration = new Duration('PT90M'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1000);
      expect(end.getMonth()).to.equal(1);
      expect(end.getDay()).to.equal(1);
      expect(end.getHours()).to.equal(1);
      expect(end.getMinutes()).to.equal(30);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add hours', function(){

      var start = new Simple('+1000'),
          duration = new Duration('PT50H'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1000);
      expect(end.getMonth()).to.equal(1);
      expect(end.getDay()).to.equal(3);
      expect(end.getHours()).to.equal(2);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add days', function(){

      var start = new Simple('+1000'),
          duration = new Duration('P62D'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1000);
      expect(end.getMonth()).to.equal(3);
      expect(end.getDay()).to.equal(4);
      expect(end.getHours()).to.equal(undefined);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add days in a leap year', function(){

      var start = new Simple('+2004'),
          duration = new Duration('P62D'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(2004);
      expect(end.getMonth()).to.equal(3);
      expect(end.getDay()).to.equal(3);
      expect(end.getHours()).to.equal(undefined);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add a years worth of days', function(){

      var start = new Simple('+2001'),
          duration = new Duration('P366D'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(2002);
      expect(end.getMonth()).to.equal(1);
      expect(end.getDay()).to.equal(2);
      expect(end.getHours()).to.equal(undefined);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add months', function(){

      var start = new Simple('+1000'),
          duration = new Duration('P25M'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1002);
      expect(end.getMonth()).to.equal(2);
      expect(end.getDay()).to.equal(undefined);
      expect(end.getHours()).to.equal(undefined);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add years', function(){

      var start = new Simple('-0001'),
          duration = new Duration('P20Y'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(19);
      expect(end.getMonth()).to.equal(undefined);
      expect(end.getDay()).to.equal(undefined);
      expect(end.getHours()).to.equal(undefined);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add negative years', function(){

      var start = new Simple('-1000'),
          duration = new Duration('P200Y'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(-800);
      expect(end.getMonth()).to.equal(undefined);
      expect(end.getDay()).to.equal(undefined);
      expect(end.getHours()).to.equal(undefined);
      expect(end.getMinutes()).to.equal(undefined);
      expect(end.getSeconds()).to.equal(undefined);

    });

    it('should add approximate years', function(){

      var start = new Approximate('A+1000'),
          duration = new Duration('P1Y'),
          end = GedcomXDate.addDuration(start, duration);

      expect(end.getYear()).to.equal(1001);
      expect(end.isApproximate()).to.equal(true);

    });

    it('should error if years exceed 9999', function(){

      var start = new Simple('+9999'),
          duration = new Duration('P1Y');

      expect(function() {
        GedcomXDate.addDuration(start, duration)
      }).to.throw(Error, 'New date out of range');

    });


  });

});