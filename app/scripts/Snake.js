const Snake = function(blockSize, initialSize){

  const SNAKE_BLOCK_SIZE = blockSize;
  var self = this;

  function init(){
    self.direction = DIRECTION.right;
    self.initialSize = initialSize || 4;
    self.velocity = 1;
    self.body = initSnake();
  };

  function initSnake(){
      var body = [];
      var tempX = 20;
      var tempY = 20;

      // posiciona o corpo
      for(var i = 0; i < self.initialSize; i++){
        body.push(new BLOCK(tempX--, tempY, BLOCK_TYPE.snakeBody));
      }

      return body;
  };

  // move os blocos de forma que cada bloco assume a posição do anterior
  function updateBody(){
    for(var i = self.getSize() - 1; i > 0 ; i--){
      self.body[i] = self.body[i - 1];
    }
  };

  function updateHead(newHead){
    self.body[0] = newHead;
  };

  function getNewTailPosition(){
      var tail = self.body[self.body.length - 1];
      var head = self.body[0];
      var x = tail.position.x;
      var y = tail.position.y;
      if(head.position.y == tail.position.y){
        switch (self.direction) {
          case DIRECTION.right:
            x -= 1;
            break;

          case DIRECTION.left:
            x += 1;
            break;
        }
      }
      else if(head.position.x == tail.position.x){
        switch (self.direction) {
          case DIRECTION.up:
            y += 1;
            break;

          case DIRECTION.down:
            y -= 1;
            break;
          }
      }else{
        if(tail.position.x - 1 != head.position.x){
          x -= 1;
        }
        else if(tail.position.x + 1 != head.position.x){
          x += 1;
        }
        else if(tail.position.y + 1 != head.position.y){
          y += 1;
        }
        else if(tail.position.y + 1 != head.position.y){
          y += 1;
        }
      }

      return new POINT(x, y);
  }

  this.selfCollided = function(){
    var head = self.body[0];
    for(var i = 1; i < self.getSize(); i++){
      if(self.body[i].x == head.position.x && self.body[i].y == head.position.y){
        return COLLISION_TYPE.self;
      }
    }
  };

  this.getSize = function(){
    return self.body.length;
  };

  this.increaseVelocity = function(step){
    self.velocity += step;
  };

  // cresce a snake conforme ela come as comidas
  this.increaseSize = function(){

    var pos = getNewTailPosition();

    self.body.push(new BLOCK(pos.x, pos.y, BLOCK_TYPE.snakeBody));

  };

  this.move = function(){

    var head = self.body[0];
    var newHeadPosition = new BLOCK(head.position.x, head.position.y, BLOCK_TYPE.snakeBody);

    switch(self.direction){
      case DIRECTION.up:
        newHeadPosition.position.y = head.position.y - self.velocity;
      break;

      case DIRECTION.down:
        newHeadPosition.position.y = head.position.y + self.velocity;
      break;

      case DIRECTION.left:
        newHeadPosition.position.x = head.position.x - self.velocity;
      break;

      case DIRECTION.right:
        newHeadPosition.position.x = head.position.x + self.velocity;
      break;
    }

    updateBody();

    updateHead(newHeadPosition);

  };

  this.getHead = function(){
    return self.body[0];
  }

  init();
};
