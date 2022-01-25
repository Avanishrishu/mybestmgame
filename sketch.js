var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var life = 3;

var zombieGroup;
var fireBulletImg;
var fireBullet;

var gameOver1Img;
var gameOver1;

var resetImg;
var reset1;

 var gameState = "play";

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  fireBulletImg = loadImage("assets/fire bullet.png");
  gameOver1Img = loadImage("assets/gameOver1.png");

  resetImg = loadImage("assets/reset.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
    gameOver1 = createSprite(width/2, height/2, 50, 50);
    gameOver1.addImage(gameOver1Img);
    gameOver1.scale = 0.5;
    gameOver1.visible = false ; 

    reset1 = createSprite(width/2, height/2+100, 50, 50);
    reset1.addImage(resetImg);
    reset1.scale = 0.1;
    reset1.visible = false;

    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
  background(0); 

  if(gameState=="play"){
    //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+30
    }
    //release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  fireBullet = createSprite(player.x, player.y, 50, 50);
  fireBullet.velocityX = 5; 
  fireBullet.addImage(fireBulletImg);
  fireBullet.scale = 0.2
  player.addImage(shooter_shooting)
 
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(fireBullet)){
  
  for(var i=0;i<zombieGroup.length;i++){     
     
   if(zombieGroup[i].isTouching(fireBullet)){
     zombieGroup[i].destroy()
     fireBullet.destroy();
        } 
  }
}
if(life==3){
  heart3.visible = true;
  heart2.visible = false;
  heart1.visible = false;
}
if(life == 2){
 heart3.visible = false;
 heart2.visible = true;
 heart1.visible = false;
}
if(life==1){
 heart3.visible = false;
 heart2.visible = false;
 heart1.visible = true;
}
if(life==0){
heart3.visible = false;
heart2.visible = false;
heart1.visible = false;

zombieGroup.destroyEach();
gameOver1.visible = true;
   
reset1.visible = true;
gameState="end";
}
//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
       life = life-1;
        
        } 
  }
 }
 //calling the function to spawn zombies
enemy();
  }
 
  if(gameState=="end"){

    gameOver1.visible = true;
    reset1.visible = true;

    
    zombieGroup.setVelocityXEach(0);
    zombieGroup.setLifetimeEach(-1);

    if(mousePressedOver(reset1)){
      resetGame();

    }
    
   
  }



drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%200===0){
    
    

    //giving random x and y positions for zombie to appear
    zombie = createSprite(width,500,40,40)

    zombie.y = Math.round(random(height-50, height/2-100));
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
  
  
}


 function resetGame(){
   gameState = "play"
   gameOver1.visible = false;
   reset1.visible = false;
   life = 3;
   heart3.visible = true;
  

 }
