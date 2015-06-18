
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

  // it('expectation', function () {
  //   expect(BubbleSort('irsetn')).to.throw(TypeError,'rstrstrst');
  // });

  it('should throw an error of not given an array as input', function () {
    expect(BubbleSort.bind(BubbleSort,5)).to.throw('I need an array to work.');
  });

   it('should throw an error of not given an array of numbers', function () {
    expect(BubbleSort.bind(BubbleSort,[1,2,4,'ien'])).to.throw('I need an array of numbers to work.');
  });

});