var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js'));

describe('Simple', function(){

  describe("#()", function(){
    it('should initialize', function(){

      var simple = new Simple();

      expect(simple).to.be.instanceof(Object);
    });

  });

  describe("#(string)", function() {
    it('should error on blank string', function(){

      expect(function() {
        var simple = new Simple('');
      }).to.throw(Error);

    });

    it('should parse +1000', function(){
      var simple = new Simple('+1000');
      expect(simple.getYear()).to.equal(1000);
    });

    it('should parse +0010', function(){
      var simple = new Simple('-0010');
      expect(simple.getYear()).to.equal(-10);
    });

    it('should parse +0000', function(){
      var simple = new Simple('+0000');
      expect(simple.getYear()).to.equal(0);
    });

    it('should error on 01000', function(){
      expect(function() {
        var simple = new Simple('01000');
      }).to.throw(Error);
    });

    it('should error on +1000_01', function(){
      expect(function() {
        var simple = new Simple('+1000_01');
      }).to.throw(Error);
    });

    it('should error on +1000-1', function(){
      expect(function() {
        var simple = new Simple('+1000-1');
      }).to.throw(Error);
    });

    it('should parse +1000-01', function(){
      var simple = new Simple('+1000-01');
      expect(simple.getYear()).to.equal(1000);
      expect(simple.getMonth()).to.equal(1);
    });

    it('should parse +1000-12', function(){
      var simple = new Simple('+1000-12');
      expect(simple.getYear()).to.equal(1000);
      expect(simple.getMonth()).to.equal(12);
    });

    it('should error on +1000-00', function(){
      expect(function() {
        var simple = new Simple('+1000-00');
      }).to.throw(Error);
    });

    it('should error on +1000-13', function(){
      expect(function() {
        var simple = new Simple('+1000-13');
      }).to.throw(Error);
    });

    it('should error on +1000-01_01', function(){
      expect(function() {
        var simple = new Simple('+1000-01_01');
      }).to.throw(Error);
    });

    it('should error on +1000-01-1', function(){
      expect(function() {
        var simple = new Simple('+1000-01-1');
      }).to.throw(Error);
    });

    it('should parse +1000-01-02', function(){
      var simple = new Simple('+1000-01-02');
      expect(simple.getYear()).to.equal(1000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(2);
    });

    it('should error on +1000-01-00', function(){
      expect(function() {
        var simple = new Simple('+1000-01-00');
      }).to.throw(Error);
    });

    it('should error on +1000-01-32', function(){
      expect(function() {
        var simple = new Simple('+1000-01-32');
      }).to.throw(Error);
    });

    it('should parse +2008-02-29', function(){
      var simple = new Simple('+2008-02-29');
      expect(simple.getYear()).to.equal(2008);
      expect(simple.getMonth()).to.equal(2);
      expect(simple.getDay()).to.equal(29);
    });

    it('should error on +2008-02-30', function(){
      expect(function() {
        var simple = new Simple('+2008-02-30');
      }).to.throw(Error);
    });

    it('should error on +2007-02-29', function(){
      expect(function() {
        var simple = new Simple('+2007-02-29');
      }).to.throw(Error);
    });

    it('should error on +2100-02-29', function(){
      expect(function() {
        var simple = new Simple('+2100-02-29');
      }).to.throw(Error);
    });

    it('should parse +1600-02-29', function(){
      var simple = new Simple('+1600-02-29');
      expect(simple.getYear()).to.equal(1600);
      expect(simple.getMonth()).to.equal(2);
      expect(simple.getDay()).to.equal(29);
    });

    it('should parse +2008-04-30', function(){
      var simple = new Simple('+2008-04-30');
      expect(simple.getYear()).to.equal(2008);
      expect(simple.getMonth()).to.equal(4);
      expect(simple.getDay()).to.equal(30);
    });

    it('should error on +2007-04-31', function(){
      expect(function() {
        var simple = new Simple('+2007-04-31');
      }).to.throw(Error);
    });

    it('should error on +2007-01-01B', function(){
      expect(function() {
        var simple = new Simple('+2007-01-01B');
      }).to.throw(Error);
    });

    it('should parse +2000-01-01T12', function(){
      var simple = new Simple('+2000-01-01T12');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(12);
    });

    it('should error on +2000-01-01T25', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T25');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T12_30', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12_30');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T12:3', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12:3');
      }).to.throw(Error);
    });

    it('should parse +2000-01-01T12:30', function(){
      var simple = new Simple('+2000-01-01T12:30');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(12);
      expect(simple.getMinutes()).to.equal(30);
    });

    it('should error on +2000-01-01T12:60', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12:60');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T12:30_15', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12:30_15');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T12:30:1', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12:30:1');
      }).to.throw(Error);
    });

    it('should parse +2000-01-01T12:30:15', function(){
      var simple = new Simple('+2000-01-01T12:30:15');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(12);
      expect(simple.getMinutes()).to.equal(30);
      expect(simple.getSeconds()).to.equal(15);
    });

    it('should error on +2000-01-01T12:30:60', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12:30:60');
      }).to.throw(Error);
    });

    it('should parse +2000-01-01T24:00:00', function(){
      var simple = new Simple('+2000-01-01T24:00:00');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(24);
      expect(simple.getMinutes()).to.equal(0);
      expect(simple.getSeconds()).to.equal(0);
    });

    it('should error on +2000-01-01T24:10:00', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:10:00');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T24:00:10', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:10');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T12:30:15B', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T12:30:15B');
      }).to.throw(Error);
    });

    it('should parse +2000T12', function(){
      var simple = new Simple('+2000T12');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(undefined);
      expect(simple.getDay()).to.equal(undefined);
      expect(simple.getHours()).to.equal(12);
      expect(simple.getMinutes()).to.equal(undefined);
      expect(simple.getSeconds()).to.equal(undefined);
    });

    it('should parse +2000-01T12', function(){
      var simple = new Simple('+2000-01T12');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(undefined);
      expect(simple.getHours()).to.equal(12);
      expect(simple.getMinutes()).to.equal(undefined);
      expect(simple.getSeconds()).to.equal(undefined);
    });

    it('should parse +2000-01-01T24:00:00Z', function(){
      var simple = new Simple('+2000-01-01T24:00:00Z');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(24);
      expect(simple.getMinutes()).to.equal(0);
      expect(simple.getSeconds()).to.equal(0);
      expect(simple.getTZHours()).to.equal(0);
      expect(simple.getTZMinutes()).to.equal(0);
    });

    it('should parse +2000-01-01T24:00:00+12', function(){
      var simple = new Simple('+2000-01-01T24:00:00+12');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(24);
      expect(simple.getMinutes()).to.equal(0);
      expect(simple.getSeconds()).to.equal(0);
      expect(simple.getTZHours()).to.equal(12);
      expect(simple.getTZMinutes()).to.equal(undefined);
    });

    it('should parse +2000-01-01T24+12', function(){
      var simple = new Simple('+2000-01-01T24+12');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(24);
      expect(simple.getMinutes()).to.equal(undefined);
      expect(simple.getSeconds()).to.equal(undefined);
      expect(simple.getTZHours()).to.equal(12);
      expect(simple.getTZMinutes()).to.equal(undefined);
    });

    it('should parse +2000-01-01T24:00+12', function(){
      var simple = new Simple('+2000-01-01T24:00+12');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(24);
      expect(simple.getMinutes()).to.equal(0);
      expect(simple.getSeconds()).to.equal(undefined);
      expect(simple.getTZHours()).to.equal(12);
      expect(simple.getTZMinutes()).to.equal(undefined);
    });

    it('should error on +2000-01-01T24:00:00Z1', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00Z1');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T24:00:00+1', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00+1');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T24:00:00+24', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00+24');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T24:00:00+12-30', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00+12-30');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T24:00:00+12:3', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00+12:3');
      }).to.throw(Error);
    });

    it('should parse +2000-01-01T24:00:00+12:30', function(){
      var simple = new Simple('+2000-01-01T24:00:00+12:30');
      expect(simple.getYear()).to.equal(2000);
      expect(simple.getMonth()).to.equal(1);
      expect(simple.getDay()).to.equal(1);
      expect(simple.getHours()).to.equal(24);
      expect(simple.getMinutes()).to.equal(0);
      expect(simple.getSeconds()).to.equal(0);
      expect(simple.getTZHours()).to.equal(12);
      expect(simple.getTZMinutes()).to.equal(30);
    });

    it('should error on +2000-01-01T24:00:00+12:60', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00+12:60');
      }).to.throw(Error);
    });

    it('should error on +2000-01-01T24:00:00+12:30B', function(){
      expect(function() {
        var simple = new Simple('+2000-01-01T24:00:00+12:30B');
      }).to.throw(Error);
    });

/*
    it('should parse +2008-04-30T12:11:10', function(){
      var simple = new Simple('+2008-04-30');
      expect(simple.getYear()).to.equal(2008);
      expect(simple.getMonth()).to.equal(4);
      expect(simple.getDay()).to.equal(30);
    });
*/
    it('needs more testing');
  });

  describe("#getType()", function(){
    it('should return simple', function(){

      var simple = new Simple();

      expect(simple.getType()).to.equal('simple');
    });

  });

  describe("#isApproximate()", function(){
    it('should return false', function(){

      var simple = new Simple();

      expect(simple.isApproximate()).to.equal(false);
    });

  });

  describe("#getYear()", function(){
    it('should return the correct year', function(){

      var simple = new Simple(),
          date = new Date();

      expect(simple.getYear()).to.equal(date.getUTCFullYear());
    });

  });

  describe("#getMonth()", function(){
    it('should return the correct month', function(){

      var simple = new Simple(),
          date = new Date();

      expect(simple.getMonth()).to.equal(date.getUTCMonth());
    });

  });

  describe("#getDay()", function(){
    it('should return the correct day', function(){

      var simple = new Simple(),
          date = new Date();

      expect(simple.getDay()).to.equal(date.getUTCDay());
    });

  });

  describe("#getHours()", function(){
    it('should return the correct hours', function(){

      var simple = new Simple(),
          date = new Date();

      expect(simple.getHours()).to.equal(date.getUTCHours());
    });

  });

  describe("#getMinutes()", function(){
    it('should return the correct minutes', function(){

      var simple = new Simple(),
          date = new Date();

      expect(simple.getMinutes()).to.equal(date.getUTCMinutes());
    });

  });

  describe("#getSeconds()", function(){
    it('should return the correct seconds', function(){

      var simple = new Simple(),
          date = new Date();

      expect(simple.getSeconds()).to.be.gte(date.getUTCSeconds()-1);
      expect(simple.getSeconds()).to.be.lte(date.getUTCSeconds()+1);
    });

  });

  describe("#getTZHours()", function(){
    it('should return the correct timezone offset', function(){

      var simple = new Simple();

      expect(simple.getTZHours()).to.equal(0);
    });

  });

  describe("#getTZMinutes()", function(){
    it('should return the correct timezone offset', function(){

      var simple = new Simple();

      expect(simple.getTZMinutes()).to.equal(0);
    });

  });

});