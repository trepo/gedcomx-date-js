var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js'));

describe('Simple', function(){

  describe("#()", function(){
    it('should initialize', function(){

      var SimpleBogus = Simple(function(){}),
          simple = new SimpleBogus();

      expect(simple.getSubtype()).to.equal('simple');
    });

    it('should inherit properly', function(){

      function Bogus(){
        this.name = 'bogus';
        this.func = function(){return 'blue'};
      };

      var simple = new (Simple(Bogus))();

      expect(simple.name).to.equal('bogus');
      expect(simple).to.respondTo('func');
      expect(simple.getSubtype()).to.equal('simple');
    });

  });

});