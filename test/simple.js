var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js'));

describe('Simple', function(){

  describe("#()", function(){
    it('should initialize', function(){
      var simple = new (Simple(function(){}))();

      expect(simple).to.be.instanceof(Object);
      expect(simple.getSubtype()).to.equal('simple');
    });

    // TODO test that Simple is instance of the parent function

  });

});