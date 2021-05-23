//variables
var backgr, backgrImg;
var Obstacles_Group, obstacleImg;
var welcome_screen;
var cheetah, cheetah_running, cheeetah_collided;
var ground, invisibleGround;
var HOME= 0;
var PLAY= 1;
var END= 2;
var score;
var gameState = HOME; 

function preload() {
    backgrImg = loadImage("Images/Background.png");
    cheetah_running = loadAnimation("Images/Cheetah 1.png","Images/Cheetah 2.png","Images/Cheetah 3.png","Images/Cheetah 4.png");
    obstacleImg = loadAnimation("Images/Lion_Obs1.png", "Images/Lion_Obs2.png", "Images/Lion_Obs3.png");
    welcome_screen = loadImage("Images/Welcome Screen.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight); 

  ground= createSprite(displayWidth/2,displayHeight/2-400);
  ground.addImage(backgrImg);
  ground.scale= 4.6;
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(width/2, 680, width, 15);
  invisibleGround.visible = false;

  cheetah = createSprite(200,590);
  cheetah.addAnimation("runner",cheetah_running);
  cheetah.scale = 1.5;
}

function draw() {
    background("white");

    cheetah.collide(invisibleGround);

    text("Score: " + score, displayWidth/2+200, displayHeight/2-100);
    console.log(cheetah.y);
    if(gameState === HOME) {
      background(welcome_screen);
      ground.visible = false;
      cheetah.visible = false;
      if(keyDown("Space")) {
        gameState = PLAY;
      }
    }
    if(gameState === PLAY) {
      ground.visible = true;
      if (ground.x < 200) {
        ground.x = ground.width/2;
      }
      
      cheetah.visible= true;
      /*if (keyDown("space") && cheetah.y >= 159) {
        cheetah.velocityY = -13;
      }
  
      cheetah.velocityY = cheetah.velocityY + 0.8; */
    }
    
  drawSprites();
}
