const Snake = function(initialSize, velocity){

  var self = this;

  function init(){
    self.velocity = velocity || 1;
    self.body = initSnake();
  };

  function initSnake(){
      var body = [];
      var tempX = 20;
      var tempY = 20;

      for(var i = 0; i < initialSize; i++){
        body.push(new POINT(tempX, tempY));
        tempX--;
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

  this.selfCollided = function(){
    var head = self.body[0];
    for(var i = 1; i < self.getSize(); i++){
      if(self.body[i].x == head.x && self.body[i].y == head.y){
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
  this.increaseSize = function(direction){
    var calda = self.body[self.body.length - 1];
    var x = calda.x;
    var y = calda.y;
    switch (direction) {
      case DIRECTION.up:
        y += 1;
        break;

      case DIRECTION.down:
        y -= 1;
        break;

      case DIRECTION.right:
        x -= 1;
        break;

      case DIRECTION.left:
        x += 1;
        break;
    }

    // atualiza a snake
    self.body.push(new POINT(x,  y));

  };

  this.move = function(direction){
    var head = self.body[0];
    var newHeadPosition = new POINT(head.x, head.y);

    switch(direction){
      case DIRECTION.up:
        newHeadPosition.y = head.y - self.velocity;
      break;

      case DIRECTION.down:
        newHeadPosition.y = head.y + self.velocity;
      break;

      case DIRECTION.left:
        newHeadPosition.x = head.x - self.velocity;
      break;

      case DIRECTION.right:
        newHeadPosition.x = head.x + self.velocity;
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
