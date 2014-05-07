var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Duration = require(path.join(libPath, 'duration.js'));

describe('Duration', function(){

  describe("#()", function(){
    it('should initialize', function(){
      var duration = new (Duration(function(){}))();

      expect(duration).to.be.instanceof(Object);
      expect(duration.getSubtype()).to.equal('duration');
    });

  });

});