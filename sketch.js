//variables
var backgr, backgrImg;
var Obstacles_Group, obstacleImg;
var welcome_screen;
var gameover, gameoverImg;
var cheetah, cheetah_running, cheeetah_collided;
var ground, invisibleGround;
var HOME= 0;
var PLAY= 1;
var END= 2;
var gameState = HOME; 

function preload() {
    backgrImg = loadImage("Images/Background.png");
    cheetah_running = loadAnimation("Images/Cheetah 1.png","Images/Cheetah 2.png","Images/Cheetah 3.png","Images/Cheetah 4.png");
    obstacleImg = loadAnimation("Images/Lion_Obs1.png", "Images/Lion_Obs2.png", "Images/Lion_Obs3.png");
    welcome_screen = loadImage("Images/Welcome Screen.png");
    gameoverImg = loadImage("Images/GameOver.jpg");
}

function setup() {
  createCanvas(displayWidth, displayHeight); 

  ground = createSprite(displayWidth/2,displayHeight/2-400);
  ground.addImage(backgrImg);
  ground.scale = 4.6;
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(width/2, 680, width, 15);
  invisibleGround.visible = false;

  Obstacles_Group = new Group();

  gameover = createSprite(displayWidth/2, displayWidth/2-400)
  gameover.addImage(gameoverImg);

  cheetah = createSprite(displayWidth/2-600,displayHeight/2-50);
  cheetah.addAnimation("runner",cheetah_running);
  cheetah.scale = 1.4;
  cheetah.setCollider("rectangle", 0, 0, 200, 90, 0);
  //cheetah.debug= true;
}

function draw() {
    background("white");

    cheetah.collide(invisibleGround);

    //console.log(cheetah.y);
    if(gameState === HOME) {
      background(welcome_screen);
      ground.visible = false;
      cheetah.visible = false;
      gameover.visible = false;
      if(keyDown("Space")) {
        gameState = PLAY;
      }
    }
    if(gameState === PLAY) {
      ground.visible = true;
      gameover.visible = false;
      if (ground.x < 200) {
        ground.x = ground.width/2;
      }
      
      cheetah.visible= true;
      if (keyDown("space") && cheetah.y >= 575) {
        cheetah.velocityY = -23;
      }
      cheetah.velocityY = cheetah.velocityY + 1;
      
      Obstacles_Group.collide(invisibleGround)
      //spawn obstacles
    spawnObstacles();
  }
    //End the game when trex is touching the obstacle
   if(Obstacles_Group.isTouching(cheetah)){
      gameState = END;
    }
    if(gameState === END) {
      ground.visible= false;
      cheetah.visible=false;
      Obstacles_Group.destroyEach();
      background(gameoverImg);
    }
    
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 250 === 0) {
    var obstacle = createSprite(displayWidth/2+800, displayHeight/2);
    obstacle.velocityX = -20;
    obstacle.velocityY = 20;
    
    obstacle.addAnimation("obs", obstacleImg);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.4;
    obstacle.lifetime = 300;

    //obstacle.debug=true;
    
    Obstacles_Group.add(obstacle);
  }
} 
