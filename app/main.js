
//create a sqaure canvas
function createCanvas(){
  var canvasSize = document.documentElement.clientHeight;
  var canvas = document.createElement('canvas');
  canvas.id = "canvas";
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  document.body.appendChild(canvas);

  return canvas;
};

function loadTextures(){
  grassTexture = document.createElement("img");
  snakeTexture = document.createElement("img");
  grassTexture.setAttribute('src', './resources/textures/grass.png');
  snakeTexture.setAttribute('src', './resources/textures/snake.png');

};

// init variables
function initGame(){

  //loadTextures();

  var canvas = createCanvas();

  // inicia o jogo
  new Game(canvas).run();

};

// "main"
window.onload = initGame;
