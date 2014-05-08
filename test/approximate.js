var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Approximate = require(path.join(libPath, 'approximate.js'));

describe('Approximate', function(){

  describe("#()", function(){
    it('should initialize', function(){

      var approximate = new Approximate();

      expect(approximate).to.be.instanceof(Object);
    });

  });

  describe("#(string)", function(){

    it('should parse A+2000-01-01T24:00:00Z', function(){
      var approximate = new Approximate('A+2000-01-01T24:00:00Z');
      expect(approximate.getYear()).to.equal(2000);
      expect(approximate.getMonth()).to.equal(1);
      expect(approximate.getDay()).to.equal(1);
      expect(approximate.getHours()).to.equal(24);
      expect(approximate.getMinutes()).to.equal(0);
      expect(approximate.getSeconds()).to.equal(0);
      expect(approximate.getTZHours()).to.equal(0);
      expect(approximate.getTZMinutes()).to.equal(0);

      expect(approximate.isApproximate()).to.equal(true);
    });

    it('should error on +2000-01-01T24:00:00Z', function(){
      expect(function() {
        var approximate = new Approximate('+2000-01-01T24:00:00Z');
      }).to.throw(Error);
    });

    it('should error on A+2000-01-01T24:00:00ZB', function(){
      expect(function() {
        var approximate = new Approximate('A+2000-01-01T24:00:00ZB');
      }).to.throw(Error);
    });

  });

  describe("#getType()", function(){
    it('should return single', function(){

      var approximate = new Approximate();

      expect(approximate.getType()).to.equal('single');
    });

  });

  describe("#isApproximate()", function(){
    it('should return false', function(){

      var approximate = new Approximate();

      expect(approximate.isApproximate()).to.equal(true);
    });

  });

});