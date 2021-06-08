var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  lose_img=loadImage("lose.png");
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,160,20,50);
  box = createSprite(4000,160,20,50);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);

  obstaclesGroup = createGroup();
 

  cloudsGroup = createGroup();
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false;
  
  score = 0;
}
function draw() {
  spawnClouds();
  background("lightblue");
 
   
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -15;
       
        trex.x+=10;
        trex.changeAnimation("running", trex_running);
       
    }
    if(trex.y>=100){
      ground.x+=1;
    }
   trex.velocityY = trex.velocityY + 0.8
   textSize(20);
   fill("red")
   stroke("yellow");
   strokeWeight(1);
   text("Score: "+ score, 370,50); 
   
   score = score + Math.round(getFrameRate()/60); 
  
    spawnObstacles();
   
  
    if(obstaclesGroup.isTouching(trex)){
      var lose=createSprite(350,125,50,50);
     lose.addImage(lose_img);
     lose.scale=0.50;
     lose.x=ground.x;
      trex.velocityX=0;
      trex.velocityY=0;
      trex.y=160;
      camera.position.x=trex.position.x;
      trex.changeAnimation("collided", trex_collided);
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);    
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);  
      textSize(30);
      fill("blue")
      stroke("yellow");
      strokeWeight(2);
      text("You Lose ", trex.x+160,150);     
    }     
  trex.collide(ground); 
     if(trex !== undefined){   
    camera.position.x = ground.x
  }



  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -5;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }

}
function spawnClouds() {
  if (frameCount % 150 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -3;
   cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

