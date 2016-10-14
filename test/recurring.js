var path = require('path'),
    expect = require('chai').expect,
    Recurring = require(path.join('../lib', 'recurring.js'));

describe('Recurring', function(){
  describe("#(start, end)", function(){
    it('should initialize', function(){

      var recurring = new Recurring('R/+1000/P1Y');

      expect(recurring).to.be.instanceof(Object);
    });

    it('should error on invalid count', function(){

      expect(function() {
        var recurring = new Recurring('Rnum/+1000/P1Y');
      }).to.throw('Invalid recurrence count: not a number');
    });

    it('should error on missing end', function(){

      expect(function() {
        var recurring = new Recurring('R/+1000/');
      }).to.throw('Recurring must have a start and end');
    });
  });

  describe("#getType()", function(){
    it('should return recurring', function(){

      var recurring = new Recurring('R/+1000/P1Y');

      expect(recurring.getType()).to.equal('recurring');
    });

  });

  describe("#getCount()", function(){
    it('should return Infinity', function(){
      var recurring = new Recurring('R/+1000/P1Y');
      expect(recurring.getCount()).to.equal(Infinity);
    });

    it('should return 10', function(){
      var recurring = new Recurring('R10/+1000/P1Y');
      expect(recurring.getCount()).to.equal(10);
    });

  });

  describe("#getNth()", function(){
    it('should return second instance', function(){

      var recurring = new Recurring('R/+1000/P1Y');
          date = recurring.getNth(2);
      expect(date.getYear()).to.equal(1002);
    });

  });

  describe("#getEnd()", function(){
    it('should return calculated end', function(){
      var recurring = new Recurring('R10/+1000/P1Y');
          date = recurring.getEnd();
      expect(date.getYear()).to.equal(1010);
    });

    it('should return infinity', function(){
      var recurring = new Recurring('R/+1000/+1010');
          date = recurring.getEnd();
      expect(date).to.equal(undefined);
    });

  });

  describe("#toFormalString()", function(){
    it('should return recurring', function(){
      var recurring = new Recurring('R/+1000-01-01T12:30:15Z/P1Y');
      expect(recurring.toFormalString()).to.equal('R/+1000-01-01T12:30:15Z/P1Y');
    });

    it('should return with count', function(){
      var recurring = new Recurring('R256/+1000-01-01T12:30:15Z/P1Y');
      expect(recurring.toFormalString()).to.equal('R256/+1000-01-01T12:30:15Z/P1Y');
    });

  });

});