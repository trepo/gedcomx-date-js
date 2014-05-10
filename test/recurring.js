var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js')),
    Approximate = require(path.join(libPath, 'approximate.js')),
    Recurring = require(path.join(libPath, 'recurring.js'));

describe('Recurring', function(){
  describe("#(start, end)", function(){
    it('should initialize', function(){

      var recurring = new Recurring(null, '+1000', null);

      expect(recurring).to.be.instanceof(Object);
    });

    it('should error on invalid count', function(){

      expect(function() {
        var recurring = new Recurring('null', '+1000', null);
      }).to.throw('Invalid recurrence count: not a number');
    });
  });

  describe("#getType()", function(){
    it('should return recurring', function(){

      var recurring = new Recurring(null, '+1000', null);

      expect(recurring.getType()).to.equal('recurring');
    });

  });

  describe("#getCount()", function(){
    it('should return Infinity', function(){
      var recurring = new Recurring(null, '+1000', null);
      expect(recurring.getCount()).to.equal(Infinity);
    });

    it('should return 10', function(){
      var recurring = new Recurring(10, '+1000', null);
      expect(recurring.getCount()).to.equal(10);
    });

  });

});