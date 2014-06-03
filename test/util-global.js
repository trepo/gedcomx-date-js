var libPath = process.env.TEST_COV ? '../lib-cov' : '../lib',
    path = require('path'),
    expect = require('chai').expect,
    Util = require(path.join(libPath, 'util-global.js'));

describe('Util-Global', function(){
 
  describe("daysInMonth(month, year)", function(){
    
    it('should return calculate correctly', function(){

      expect(Util.daysInMonth(1, 2001)).to.equal(31);
      expect(Util.daysInMonth(2, 2001)).to.equal(28);
      expect(Util.daysInMonth(3, 2001)).to.equal(31);
      expect(Util.daysInMonth(4, 2001)).to.equal(30);
      expect(Util.daysInMonth(5, 2001)).to.equal(31);
      expect(Util.daysInMonth(6, 2001)).to.equal(30);
      expect(Util.daysInMonth(7, 2001)).to.equal(31);
      expect(Util.daysInMonth(8, 2001)).to.equal(31);
      expect(Util.daysInMonth(9, 2001)).to.equal(30);
      expect(Util.daysInMonth(10, 2001)).to.equal(31);
      expect(Util.daysInMonth(11, 2001)).to.equal(30);
      expect(Util.daysInMonth(12, 2001)).to.equal(31);

      // Test each branch of the leapyear calculation
      expect(Util.daysInMonth(2, 2003)).to.equal(28);
      expect(Util.daysInMonth(2, 2004)).to.equal(29);
      expect(Util.daysInMonth(2, 1900)).to.equal(28);
      expect(Util.daysInMonth(2, 2000)).to.equal(29);

    });

    it('should error on invalid month', function(){

      expect(function() {
        Util.daysInMonth(13, 2000);
      }).to.throw(Error, 'Unknown Month');
    });
  });

})