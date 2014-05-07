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
    it('should error on blank string');
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

});