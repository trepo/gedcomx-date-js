var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    GedcomXDate = require(path.join(libPath, 'GedcomXDate.js'));

describe('Single', function(){

  describe("#()", function(){
    it('should initialize', function(){
      var date = new GedcomXDate();

      expect(date).to.be.instanceof(Object);
      expect(date.getType()).to.equal('single');
      expect(date.getSubtype()).to.equal('simple');
    });

  });

  describe("#(type)", function(){
    it('should accept single', function(){
      var date = new GedcomXDate('single');

      expect(date).to.be.instanceof(Object);
      expect(date.getType()).to.equal('single');
      expect(date.getSubtype()).to.equal('simple');
    });

    it('should accept range', function(){
      var date = new GedcomXDate('range');

      expect(date).to.be.instanceof(Object);
      expect(date.getType()).to.equal('range');
      //expect(date.getSubtype()).to.equal('simple');
    });

    it('should accept recurring', function(){
      var date = new GedcomXDate('recurring');

      expect(date).to.be.instanceof(Object);
      expect(date.getType()).to.equal('recurring');
      //expect(date.getSubtype()).to.equal('recurring');
    });

    it('should error on invalid type', function(){
      
      expect(function() {
        var date = new GedcomXDate('bogus');
      }).to.throw(Error);
    });

  });

});