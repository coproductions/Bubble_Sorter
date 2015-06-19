
(function(){

  var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];


  window.generateGrid = function(arr){
    var animationGrid = document.createElement('div');
    animationGrid.id = 'bubbleGrid'
    var highestVal = arr.reduce(function(prev,current){
      if(current > prev){
        prev = current;
      }
      return prev;
    },0)
    console.log(highestVal);
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
          // if(gridSize){
          //   gridCellEl.style.width = gridSize;
          //   gridCellEl.style.heigth = gridSize;
          // }
          rowEl.appendChild(gridCellEl);
          columnCounter ++;
        }
        animationGrid.appendChild(rowEl);
        rowCounter ++;
    }
    document.getElementsByTagName('body')[0].appendChild(animationGrid);
  };

  window.renderArrayBlack = function(arr){
    for (var i = 1; i < arr.length; i++) {
      var randomNr = Math.floor(Math.random()*147);
      document.getElementById('row'+i+'cell'+arr[i]).style.backgroundColor = CSS_COLOR_NAMES[randomNr];
    };
  };

  window.unrenderArrayBlack = function(arr){
    for (var i = 1; i < arr.length; i++) {
      document.getElementById('row'+i+'cell'+arr[i]).style.backgroundColor = 'white';
    };
  }





  window.bubbleSort = function(arr){
    if(!Array.isArray(arr)){
      throw new TypeError('I need an array to work.')
    }

    var arrayChanged = false;
    for (var i = 0; i < arr.length -1; i++) {
      if(typeof arr[i] !== 'number' || typeof arr[i+1] !== 'number' ){
        throw new TypeError('I need an array of numbers to work.')
      }
      var current = arr[i];
      if(arr[i]>arr[i+1]){
        arr[i] = arr[i+1];
        arr[i+1] = current;
        arrayChanged = true;
      }
    };
    renderArrayBlack(arr);
    if(arrayChanged){
      window.setTimeout(function(){
        unrenderArrayBlack(arr)
      },30);
      return window.setTimeout(function(){bubbleSort(arr);},31);
    }
    return arr;
  };

  window.arrayGenerator = function(n){
    var orderedArray = [];
    var randomArray = [];
    for (var i = 0; i < n; i++) {
      orderedArray.push(i);
    }
    for (var j = n; j >= 0; j--) {
      var randomSelector = Math.floor(Math.random()*j)+1
      console.log(randomSelector)
      randomArray.push(orderedArray[randomSelector])
    };
    return randomArray;

  }
})();


document.getElementById('goButton').addEventListener('click',function(){
  if(document.getElementById('bubbleGrid')){
    var element = document.getElementById("bubbleGrid");
    element.parentNode.removeChild(element);
  }
  var randomArray = arrayGenerator(document.getElementById('inputField').value);
  generateGrid(randomArray);
  bubbleSort(randomArray)

})