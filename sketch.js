//assing the global variables so that we can assess it in our functions
var gameState;
var PLAY = 1;
var END = 0
var monkey;
var monkey_running;
var player;
var banana;
var obstacle;
var obstacleImage;
var FoodGroup;
var obstacleGroup;
var score;
var ground;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
createCanvas(400,400);
  
//creating monkey
 monkey = createSprite(80,340,20,20);
 monkey.addAnimation("running", monkey_running);  
 monkey.scale=0.1;
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.hight);  
  
//creating ground
ground=createSprite(200,400,800,20);
  
//creating bananaGroup
bananaGroup = createGroup();  
  
//creating obstacleGroup
obstacleGroup = createGroup();  
  
//setting gameState to play  
  gameState = PLAY;
}

function draw() {
  
background("white");
//adding ground 
text("survival Time:" + score,100,50);   
//adding gravity 
monkey.velocityY=monkey.velocityY+0.5;
//making monkry collid the ground  
monkey.collide(ground); 

//destroying banana when monkey is touching them
if (bananaGroup.collide(monkey)) {
      bananaGroup.destroyEach();
    }
//making monkey jump  
if(keyDown("space") && monkey.y >= 350){
      monkey.velocityY= -15;
  } 
  
  if(gameState === PLAY){
    play(); 
  }

if(obstacleGroup.isTouching(monkey)){  
end();
gameState = END;
}
 
 drawSprites();
} 
 
function spawnbanana(){
 if(frameCount %100 ===0){
 banana=createSprite(400,Math.round(random(120,200)),20,10);
 banana.scale=0.1;  
 banana.velocityX=-2 
 banana.lifetime=300;
 banana.addImage(bananaImage);
 bananaGroup.add(banana);    
 }
}
  
function spawnObstacle(){
if(frameCount % 150   === 0)
{
obstacle=createSprite(400,370,20,10);
obstacle.setCollider("circle",0,0,150);  
obstacle.addImage(obstacleImage);
obstacle.lifetime=300;  
obstacle.scale=0.1;  
obstacle.velocityX=-2;
obstacleGroup.add(obstacle);
  }
}  

function play(){
score = Math.ceil(frameCount/frameRate());  
  spawnbanana();
 spawnObstacle(); 
  
}

function end (){
 ground.velocityX=0; 
obstacle.velocityX=0;
textSize(25);  
fill(0);
text("Game Over", 150, 180);
 obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
 monkey.velocityY = 0;
}


