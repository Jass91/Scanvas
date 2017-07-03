const Game = function(canvas){

  const GRID_SIZE = 100;

  var self = this;
  var context = canvas.getContext("2d");
  var running = true;
  var gameOver = false;
  var infoMsg = "";
  var map = null;
  var snake = null;
  var food = null;

  function init(){

    // ajusta o tamanho do bloco de acordo com a quantidade
    var bSize = (canvas.width / GRID_SIZE);

    var blockSize = {width: bSize, height: bSize};

    var mapSize = {
      width: GRID_SIZE,
      height: GRID_SIZE
    };

    map = new Map(mapSize, blockSize);
    snake = new Snake(blockSize, 1);
    food = getFood();

    registerEvents();
  }

  function registerEvents(){

    // quando uma tecla é pressionada
    document.addEventListener("keydown", handleInput, false);

  }

  function getScore(){
    return snake.getSize() - snake.initialSize;
  }

  function getDirection(code){

    var direction = snake.direction;
    if(direction == DIRECTION.down || direction == DIRECTION.up){
      switch(code){
        case DIRECTION.left:
          return DIRECTION.left;
          break;
        case DIRECTION.right:
          return DIRECTION.right;
          break;
        default:
          return direction;
          break;
      }
    }
    else if(direction == DIRECTION.left || direction == DIRECTION.right){
      switch(code){
        case DIRECTION.up:
          return DIRECTION.up;
          break;
        case DIRECTION.down:
          return DIRECTION.down;
          break;
        default:
          return direction;
          break;
      }
    }

  }

  function handleInput(event){
    var key = event.code || event.code;

    // teste: apagar depois
    if(key == 'ArrowRight'){
      snake.increaseVelocity(1);
    }


    if(key == 'Escape'){
      infoMsg = "Jogo Encerrado..."
      running = false;
      gameOver = true;
    }
    else if(key == 'Space'){
      running = !running;
    }else if(running){
      snake.direction = getDirection(key);
    }
  }

  function isEndGame(){
    return gameOver == true;
  };

  function getCollision(){

    var boundaries = map.boundaries;
    var head = snake.getHead();

    // verifica colisao com a comida
    if(food.position.x == head.position.x && food.position.y == head.position.y){
      return COLLISION_TYPE.food;
    }

    // verifica colisao com o cenario
    if(
      // colidiu com os limites laterais do mapa
      (head.position.x < boundaries.leftSide ||  head.position.x > boundaries.rightSide) ||

      // colidiu com os limites verticais do mapa
      (head.position.y < boundaries.upSide ||  head.position.y > boundaries.bottomSide)
    ){
      return COLLISION_TYPE.map;
    }

    // verifica colisao com o corpo
    if(snake.selfCollided()){
      return COLLISION_TYPE.self;
    }

    // se nao houve colisao
    return COLLISION_TYPE.none;

  };

  function clearSnake(){
    snake.body.forEach(function(block){
      map.clearBlock(block);
    });
  };

  function updateSnakePosition(){

    // posiciona a snake no mapa
    for(var i = 0; i < snake.getSize(); i++){
      var block = snake.body[i];
      map.updateBlock(block, block.type);
    }
  };

  function getFood(){
    var left = map.boundaries.leftSide;
    var right = map.boundaries.rightSide;
    var up = map.boundaries.upSide;
    var down = map.boundaries.bottomSide;

    var randomX = Math.floor((Math.random() * right));
    var randomY = Math.floor((Math.random() * down));

    var x = randomX <= left ? left + 2 :
            randomX >= right ? right - 2 : randomX;

    var y = randomY <= up ? up + 2 :
            randomY >= down ? down - 2 : randomY;

    return new BLOCK(x, y, BLOCK_TYPE.food);
  };

  function setFood(){
    map.updateBlock(food);
  }

  function clearFood(){
    map.updateBlock(food);
  }

  function updateFoodPosition(){
    food = getFood();
  }

  function updateGame(){

    // limpa os blocos onde tem partes da snake
    clearSnake();

    // atualiza a posicao da snake
    snake.move();

    // checa colisoes
    var collision = getCollision();

    switch(collision){
      case COLLISION_TYPE.map:
      case COLLISION_TYPE.self:
        gameOver = true;
        running = false;
        infoMsg = "Voce perdeu, mas conseguiu crescer a snake em : " + getScore() + " blocos";
        return;
      case COLLISION_TYPE.food:
        clearFood();
        updateFoodPosition();
        snake.increaseSize();
    }

    // marca os blocos do mapa onde terá a snake
    updateSnakePosition();

    // coloca a comida no mapa
    setFood();

  };

  // utilizar double buffer
   function render(){

     // desenha o mapa
     map.blocks.forEach(function(blocks){

       // percorre as colunas da matriz
       blocks.forEach(function(block){
         switch(block.type){
           case BLOCK_TYPE.empty:
             context.fillStyle = "green";
             context.fillRect(block.position.x, block.position.y, block.size.width, block.size.height);
             //context.drawImage(grassTexture, block.position.x, block.position.y, block.size.width, block.size.height);
           break;
           case BLOCK_TYPE.snakeBody:
             context.fillStyle = "white";
             context.fillRect(block.position.x, block.position.y, block.size.width, block.size.height);
             //context.drawImage(snakeTexture, block.position.x, block.position.y, block.size.width, block.size.height);
           break;
           case BLOCK_TYPE.wall:
             context.fillStyle = "brown";
             context.fillRect(block.position.x, block.position.y, block.size.width, block.size.height);
           break;
           case BLOCK_TYPE.food:
             context.fillStyle = "blue";
             context.fillRect(block.position.x, block.position.y, block.size.width, block.size.height);
           break;
          //  case BLOCK_TYPE.snakeExtra:
          //  debugger;
          //    context.fillStyle = "black";
          //    context.fillRect(block.position.x, block.position.y, block.size.width, block.size.height);
         }
       });
     });

   };

  function gameLoop(timestamp){

    if(isEndGame()){
      alert(infoMsg);
      return;
    }

    if(running){
      updateGame();
      render();
    }

    // controla o loop da pagina
    requestAnimationFrame(gameLoop);

  };

  this.run = function(){
    gameLoop();
  };

  init();
}
