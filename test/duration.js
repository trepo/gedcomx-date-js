var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Duration = require(path.join(libPath, 'duration.js'));

describe('Duration', function(){

  describe("#(string)", function(){
    it('should initialize', function(){
      var duration = new Duration('P0100Y');
      expect(duration).to.be.instanceof(Object);
    });

    it('should error on missing P', function(){
      expect(function() {
        var duration = new Duration('1000Y');
      }).to.throw(Error, 'Invalid Duration');
    });

    it('should error on missing values after P', function(){
      expect(function() {
        var duration = new Duration('P');
      }).to.throw(Error, 'Invalid Duration');
    });

    it('should error on unknown letters', function(){
      expect(function() {
        var duration = new Duration('P1000U');
      }).to.throw(Error, 'Invalid Duration: Unknown Letter U');
    });

    it('should error on missing letters', function(){
      expect(function() {
        var duration = new Duration('P1000');
      }).to.throw(Error, 'Invalid Duration: No letter after 1000');
    });

    it('should error on invalid year', function(){
      expect(function() {
        var duration = new Duration('PY');
      }).to.throw(Error, 'Invalid Duration: invalid years');
    });

    it('should error on duplicate year', function(){
      expect(function() {
        var duration = new Duration('P1000Y1000Y');
      }).to.throw(Error, 'Invalid Duration: duplicate years');
    });

    it('should error on out of order year', function(){
      expect(function() {
        var duration = new Duration('P01M1000Y');
      }).to.throw(Error, 'Invalid Duration: years out of order');
    });

    it('should error on invalid month', function(){
      expect(function() {
        var duration = new Duration('P1000YM');
      }).to.throw(Error, 'Invalid Duration: invalid months');
    });

    it('should error on duplicate months', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01M');
      }).to.throw(Error, 'Invalid Duration: duplicate months');
    });

    it('should error on out of order months', function(){
      expect(function() {
        var duration = new Duration('P1000Y01D01M');
      }).to.throw(Error, 'Invalid Duration: months out of order');
    });

    it('should error on invalid day', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MD');
      }).to.throw(Error, 'Invalid Duration: invalid days');
    });

    it('should error on duplicate days', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01D01D');
      }).to.throw(Error, 'Invalid Duration: duplicate days');
    });

    it('should error on out of order days', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MT01D');
      }).to.throw(Error, 'Invalid Duration: days out of order');
    });

    it('should error on duplicate Ts', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01DT01HT01M');
      }).to.throw(Error, 'Invalid Duration: duplicate T');
    });

    it('should error on missing T before hours', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01D01H');
      }).to.throw(Error, 'Invalid Duration: Missing T before hours');
    });

    it('should error on invalid hour', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01DTH');
      }).to.throw(Error, 'Invalid Duration: invalid hours');
    });

    it('should error on duplicate hours', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MT01H01H');
      }).to.throw(Error, 'Invalid Duration: duplicate hours');
    });

    it('should error on out of order hours', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MT01M01H');
      }).to.throw(Error, 'Invalid Duration: hours out of order');
    });

    it('should error on invalid minute', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01DT01HM');
      }).to.throw(Error, 'Invalid Duration: invalid minutes');
    });

    it('should error on duplicate minutes', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MT01H01M01M');
      }).to.throw(Error, 'Invalid Duration: duplicate minutes');
    });

    it('should error on out of order minutes', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MT01H01S01M');
      }).to.throw(Error, 'Invalid Duration: minutes out of order');
    });

    it('should error on missing T before seconds', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01D01S');
      }).to.throw(Error, 'Invalid Duration: Missing T before seconds');
    });

    it('should error on invalid second', function(){
      expect(function() {
        var duration = new Duration('P1000Y01M01DT01H01MS');
      }).to.throw(Error, 'Invalid Duration: invalid seconds');
    });

    it('should error on duplicate seconds', function(){
      expect(function() {
        var duration = new Duration('P1000Y01MT01H01M01S01S');
      }).to.throw(Error, 'Invalid Duration: duplicate seconds');
    });

    it('should parse a properly normalized string', function(){
      var duration = new Duration('P1000Y01M02DT03H04M05S');
      expect(duration.getYears()).to.equal(1000);
      expect(duration.getMonths()).to.equal(1);
      expect(duration.getDays()).to.equal(2);
      expect(duration.getHours()).to.equal(3);
      expect(duration.getMinutes()).to.equal(4);
      expect(duration.getSeconds()).to.equal(5);
    });

  });

  
  describe("#getType()", function(){
    it('should return duration', function(){

      var duration = new Duration('P1000Y');

      expect(duration.getType()).to.equal('duration');
    });

  });

  describe("#isApproximate()", function(){
    it('should return false', function(){
      var duration = new Duration('P1000Y');
      expect(duration.isApproximate()).to.equal(false);
    });

  });

  describe("#getYears()", function(){
    it('should return the correct years', function(){
      var duration = new Duration('P0100Y');
      expect(duration.getYears()).to.equal(100);
    });
  });

  describe("#getMonths()", function(){
    it('should return the correct months', function(){
      var duration = new Duration('P13M');
      expect(duration.getMonths()).to.equal(13);
    });
  });

  describe("#getDays()", function(){
    it('should return the correct days', function(){
      var duration = new Duration('P03D');
      expect(duration.getDays()).to.equal(3);
    });
  });

  describe("#getHours()", function(){
    it('should return the correct hours', function(){
      var duration = new Duration('PT05H');
      expect(duration.getHours()).to.equal(5);
    });
  });

  describe("#getMinutes()", function(){
    it('should return the correct minutes', function(){
      var duration = new Duration('PT75M');
      expect(duration.getMinutes()).to.equal(75);
    });
  });

  describe("#getSeconds()", function(){
    it('should return the correct seconds', function(){
      var duration = new Duration('PT90S');
      expect(duration.getSeconds()).to.equal(90);
    });
  });

});