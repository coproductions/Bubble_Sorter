
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;


describe('bubble sorter', function () {

  var BubbleSort = require('../bubblesorter.js');

  it('should be a function', function () {
    expect(BubbleSort).to.be.a('function');
  });


  it('should sort an array of numbers', function () {
    expect(BubbleSort([3,6,2,1,7,8,9,4,5])).to.deep.equal([1,2,3,4,5,6,7,8,9]);
  });

});