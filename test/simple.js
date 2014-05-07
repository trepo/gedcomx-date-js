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
        var simple = new Simple('1000-00');
      }).to.throw(Error);
    });

    it('should error on +1000-13', function(){
      expect(function() {
        var simple = new Simple('1000-13');
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

});