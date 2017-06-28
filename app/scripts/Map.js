const Map = function(mapSize, blockSize){
  var self = this;

  function init(){
    self.size = mapSize;
    self.blockSize = blockSize;
    self.blocks = createMap();
    self.boundaries = getBoundaries();
  };

  function getBoundaries(){
    var bottomIndex = self.blocks.length - 2;
    var rightIndex = self.blocks[0].length - 2;
    return {
      upSide: 1,
      leftSide: 1,
      bottomSide: bottomIndex,
      rightSide: rightIndex
    }
  };

  function getBlockType(i, j){
    // se:
    // linha 0 ou linha N ou
    // coluna 0 ou coluna N
    if(i == 0 || i == (self.size.height - 1) || j == 0 || j == (self.size.width - 1)){
      return BLOCK_TYPE.wall;
    }else{
      return BLOCK_TYPE.empty;
    }
  }

  function createMap(){

    var lines = [];
    var columns = [];
    var tempX = 0;
    var tempY = 0;

    var t = BLOCK_TYPE.empty;

    for(var i = 0; i < self.size.height; i++){
      for(var j = 0; j < self.size.width; j++){
        columns.push(new BLOCK(tempX, tempY, getBlockType(i, j), blockSize));
        tempX += self.blockSize.width;
      }

      lines.push(columns);

      tempX = 0;
      columns = [];
      tempY += self.blockSize.height;
    }

    return lines;
};

  function blockExists(block){
    return self.blocks[block.y][block.x] != undefined ||
           self.blocks[block.y][block.x] != null;
  };

  this.clearBlock = function(block){

    if(blockExists(block)){
      self.blocks[block.y][block.x].type = BLOCK_TYPE.empty;
    }

  };

  this.updateBlock = function(block, type){
    if(blockExists(block)){
      self.blocks[block.y][block.x].type = type;
    }
  };


  init();
};
