
var bubbleSort = function(array){
  if(!Array.isArray(array)){
    throw new TypeError('I need an array to work.')
  }
  var arrayChanged = false;
  for (var i = 0; i < array.length -1; i++) {
    if(typeof array[i] !== 'number' || typeof array[i+1] !== 'number' ){
      throw new TypeError('I need an array of numbers to work.')
    }
    var current = array[i];
    if(array[i]>array[i+1]){
      array[i] = array[i+1];
      array[i+1] = current;
      arrayChanged = true;
    }
  };
  if(arrayChanged){
    return bubbleSort(array);
  }
  return array;
};

module.exports = bubbleSort;