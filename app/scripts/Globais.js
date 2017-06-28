// enums
const COLLISION_TYPE = {
  map: 0,
  self: 1,
  food: 2
};

const BLOCK_TYPE = {
  empty: 0,
  snakeBody: 1,
  snakeHead: 2,
  food: 3,
  wall: 4
};

const DIRECTION = {
  up: 'KeyW',
  down: 'KeyS',
  left: 'KeyA',
  right: 'KeyD'
};

// structs
const POINT = function(x, y){
  this.x = x || 0;
  this.y = y || 0
};

const BLOCK = function(px, py, type, size){
  this.type = type || BLOCK_TYPE.empty;
  this.size = size;
  this.position = new POINT(px, py);
};

// textures
//var grassTexture;
//var snakeTexture;
