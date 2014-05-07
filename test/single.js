var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    GedcomXDate = require(path.join(libPath, 'GedcomXDate.js')),
    Single = require(path.join(libPath, 'single.js'));

describe('Single', function(){

  describe("#()", function(){
    it('should initialize', function(){
      var single = new (Single('simple'))();

      expect(single).to.be.instanceof(Object);
      expect(single.getType()).to.equal('single');
      expect(single.getSubtype()).to.equal('simple');
    });

  });

});