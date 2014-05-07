var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Approximate = require(path.join(libPath, 'approximate.js'));

describe('Approximate', function(){

  describe("#()", function(){
    it('should initialize', function(){
      var approximate = new (Approximate(function(){}))();

      expect(approximate).to.be.instanceof(Object);
      expect(approximate.getSubtype()).to.equal('approximate');
    });

  });

});