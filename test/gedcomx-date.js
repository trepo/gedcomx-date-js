var libPath = process.env.VGRAPH_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    fs = require('fs'),
    expect = require('chai').expect,
    Simple = require(path.join(libPath, 'simple.js')),
    Approximate = require(path.join(libPath, 'approximate.js')),
    Recurring = require(path.join(libPath, 'recurring.js')),
    Duration = require(path.join(libPath, 'duration.js')),
    Range = require(path.join(libPath, 'range.js')),
    GedcomXDate = require(path.join(libPath, 'gedcomx-date.js'));

describe('GedcomXDate', function(){

  describe("#version", function(){
    it('should match package.json', function(){
      
      var packageString = fs.readFileSync(path.join(__dirname,'../', 'package.json')).toString();

      var packageObj = JSON.parse(packageString);

      expect(GedcomXDate.version).to.equal(packageObj.version);

    });
  });

  describe("#getDuration()", function(){
    it('should respond to getDuration', function(){

      var duration = GedcomXDate.getDuration(new Simple('+1000'), new Simple('+2000'));

      expect(duration.getYears()).to.equal(1000);

    });
  });

  describe("#addDuration()", function(){
    it('should respond to addDuration', function(){

      var end = GedcomXDate.addDuration(new Simple('+1000'), new Duration('P1Y'));

      expect(end.getYear()).to.equal(1001);

    });
  });

  describe("#daysInMonth()", function(){
    it('should respond to daysInMonth', function(){

      expect(GedcomXDate.daysInMonth(2,2004)).to.equal(29);

    });
  });

  describe("#(str)", function(){
    it('should return Simple', function(){
      var date = new GedcomXDate('+1000');
      expect(date).to.be.instanceof(Simple);
    });

    it('should return Approximate', function(){
      var date = new GedcomXDate('A+1000');
      expect(date).to.be.instanceof(Approximate);
    });

    it('should return Range', function(){
      var date = new GedcomXDate('+1000/');
      expect(date).to.be.instanceof(Range);
    });

    it('should return Recurring', function(){
      var date = new GedcomXDate('R/+1000/P0010Y');
      expect(date).to.be.instanceof(Recurring);
    });

    it('should return Recurring with count', function(){
      var date = new GedcomXDate('R10/+1000/P0010Y');
      expect(date).to.be.instanceof(Recurring);
      expect(date.count).to.equal(10);
    });

    it('should error on blank', function(){
      expect(function() {
        var date = new GedcomXDate('');
      }).to.throw(Error, 'Invalid Date');
    });

    it('should error on R/+1000', function(){
      expect(function() {
        var date = new GedcomXDate('R/+1000');
      }).to.throw(Error, 'Invalid Recurring Date');
    });

    it('should error on +1000/+1000/', function(){
      expect(function() {
        var date = new GedcomXDate('+1000/+1000/');
      }).to.throw(Error, 'Invalid Date Range');
    });

  });
});