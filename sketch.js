
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, ob;
var score
var ground,invisibleGround;
PLAY=1;
END=0; 
gameState=1;


function preload(){
  
  
  monkey_running =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ob= loadImage("obstacle.png");
 
}



function setup() {
  createCanvas( 700,300 );
 ground=createSprite(0,290,1900000,30);
   ground.velocityX=-2;
 
  invisibleGround=createSprite(0,295,1900000,10)
monkey=createSprite(50,250,1,1)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.13;
  bGroup=createGroup();
  oGroup=createGroup();
  score=0;
 
  }


function draw() {
background("turquoise");
  if(gameState===1){
 if(keyDown("space")&&monkey.y>=20){
   monkey.velocityY=-13;
 }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(invisibleGround);
   ground.x=ground.width/2;
  invisibleGround.x=invisibleGround.width/2;
    if(bGroup.isTouching(monkey)){
      bGroup.destroyEach();
      score=score+2;
    }
   if(oGroup.isTouching(monkey)){
      gameState=0;
    }
  }else if(gameState===0){
    bGroup.destroyEach();
    score=0;
    oGroup.destroyEach();
    monkey.collide(invisibleGround)
     textSize(25);
  text("you lose",300,100);
    text("press 'r' to restart",250,200)
    if(keyDown("r")){
      restart();
    }
  }
 spawnObstacles();
  spawnFood();
  drawSprites();
  fill("gold");
  stroke("white");
  textSize(25)
  text("score="+score,580,35)
  
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,250,10,1);
    obstacle.addImage(ob);
    obstacle.scale=0.2;
    obstacle.velocityX=-3;
    obstacle.setLifetime=800;
    oGroup.add(obstacle);
  }
    }

function spawnFood(){
  if(frameCount%80==0){
    banana=createSprite(600,120,1,1);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4
    bGroup.add(banana);
  }
}

function restart(){
  score=0;
  gameState=1;
}





