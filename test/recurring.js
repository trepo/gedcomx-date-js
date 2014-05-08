var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js')),
    Approximate = require(path.join(libPath, 'approximate.js')),
    Recurring = require(path.join(libPath, 'recurring.js'));

describe('Recurring', function(){
  describe("#(start, end)", function(){
    it('should initialize', function(){

      var recurring = new Recurring('+1000', null, null);

      expect(recurring).to.be.instanceof(Object);
    });
  });

  describe("#getType()", function(){
    it('should return recurring', function(){

      var recurring = new Recurring('+1000', null, null);

      expect(recurring.getType()).to.equal('recurring');
    });

  });

});