var ground;
var monkey, monkey_Running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstacleGroup;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 300);
  
  var survivalTime=0;
  
  monkey = createSprite(80,250,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,250,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  FoodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(255);
    
  if(ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  if(keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 1;
  
  monkey.collide(ground);   
  spawnFood();
  spawnObstacles();
 
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate()) 
  survivalTime=Math.round(frameCount/frameRate()) //I used Math.round instead of Math.ceil because it was working better and when I used Math.ceil function the game was getting intrupted after 24 seconds for some reason therefore I did it.
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,217,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;   
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
