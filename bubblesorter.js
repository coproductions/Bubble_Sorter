
var Sorter = (function(){

  var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

  function generateGrid(arr){
    var animationGrid = document.createElement('div');
    animationGrid.id = 'bubbleGrid'
    var highestVal = arr.reduce(function(prev,current){
      if(current > prev){
        prev = current;
      }
      return prev;
    },0)
    var cellCounter = 0;
    var rowCounter = 1;

    while (rowCounter <= arr.length){
      var rowEl = document.createElement('div');
      rowEl.className = 'animationGridRow';
      rowEl.id = 'rowContainer';
      var columnCounter = 1;

          //populating rows with grid cells
        while (columnCounter <= highestVal){
          cellCounter ++;
          var gridCellEl = document.createElement('div');
          gridCellEl.id = 'row'+rowCounter+'cell'+columnCounter;
          gridCellEl.className = 'animationGridCell';
          rowEl.appendChild(gridCellEl);
          columnCounter ++;
        }
        animationGrid.appendChild(rowEl);
        rowCounter ++;
    }
    document.getElementsByClassName('jumbotron')[0].appendChild(animationGrid);
  };

function renderArrayBlack(arr){
    for (var i = 1; i < arr.length; i++) {
      var randomNr = Math.floor(Math.random()*147);
      document.getElementById('row'+i+'cell'+arr[i]).style.backgroundColor = CSS_COLOR_NAMES[randomNr];
    };
  };

function unrenderArrayBlack(arr){
    for (var i = 1; i < arr.length; i++) {
      document.getElementById('row'+i+'cell'+arr[i]).style.backgroundColor = 'white';
    };
  };

 function bubbleSort(arr){

    function bubbleSortInner(lastChange){
      if(!Array.isArray(arr)){
        throw new TypeError('I need an array to work.')
      }
      var arrayChanged = false;
      for (var i = 0; i < lastChange; i++) {
        if(typeof arr[i] !== 'number' || typeof arr[i+1] !== 'number' ){
          throw new TypeError('I need an array of numbers to work.')
        }
        var current = arr[i];
        if(arr[i]>arr[i+1]){
          arr[i] = arr[i+1];
          arr[i+1] = current;
          arrayChanged = true;
          var last = i;
        }
      };
      renderArrayBlack(arr);
      if(arrayChanged){
        window.setTimeout(function(){
          unrenderArrayBlack(arr)
        },30);
        return window.setTimeout(function(){bubbleSortInner(last);},31);
      }
      return arr;
    }
    bubbleSortInner(arr.length-1);
  };

  function quickSortFromIndex(arr,indx){
    var pivotRatio = arr.length/indx;
    return quickSort(arr,pivotRatio);
  };

  function quickSort(arr,pivotRatio){



    var pivotIndex = 0;
    if(pivotRatio){
      pivotIndex = Math.floor(arr.length/pivotRatio)
    }
    var pivot = arr.splice(pivotIndex,1);
    var left = [];
    var right = [];
    arr.forEach(function(val){
      if(val>=pivot){
        right.push(val);
      }
      else {
        left.push(val);
      }
    })

    if(left.length > 1){
   left = quickSort(left);

    }
    if(right.length > 1){
    right = quickSort(right);
    }

      var result =  left.concat(pivot,right);
      renderArrayBlack(result);



      console.log('result in function',result)

      return window.setTimeout(function(){
        unrenderArrayBlack(result);
        return result;},50);

  };

  function arrayGenerator(n){
    var orderedArray = [];
    var randomArray = [];
    for (var i = 0; i < n; i++) {
      orderedArray.push(i);
    }
    for (var j = n; j >= 0; j--) {
      var randomSelector = Math.floor(Math.random()*j)+1
      randomArray.push(orderedArray[randomSelector])
    };
    return randomArray;

  };

  return{
    generateGrid : generateGrid,
    bubbleSort : bubbleSort,
    quickSort : quickSort,
    quickSortFromIndex : quickSortFromIndex,
    arrayGenerator : arrayGenerator
  }
})();


document.getElementById('bubbleSortButton').addEventListener('click',function(){
  if(document.getElementById('bubbleGrid')){
    var element = document.getElementById("bubbleGrid");
    element.parentNode.removeChild(element);
  }
  var randomArray = Sorter.arrayGenerator(100);
  Sorter.generateGrid(randomArray);
  Sorter.bubbleSort(randomArray)
})

document.getElementById('quickSortButton').addEventListener('click',function(){
  if(document.getElementById('bubbleGrid')){
    var element = document.getElementById("bubbleGrid");
    element.parentNode.removeChild(element);
  }
    var randomArray = Sorter.arrayGenerator(100);
  Sorter.generateGrid(randomArray);
  Sorter.quickSort(randomArray)
  console.log(randomArray,'result')
})