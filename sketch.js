//variables
var backgr, backgrImg;
var Obstacles_Group, obstacleImg;
var welcome_screen;
var cheetah, cheetah_running, cheeetah_collided;
var ground, invisibleground;
var HOME= 0;
var PLAY= 1;
var END= 2;
var gameState = HOME; 

function preload() {
    backgrImg = loadImage("Images/Background.png");
    cheetah_running = loadAnimation("Images/Cheetah 1.png","Images/Cheetah 2.png","Images/Cheetah 3.png","Images/Cheetah 4.png");
    obstacleImg = loadAnimation("Images/Lion_Obs1.png", "Images/Lion_Obs2.png", "Images/Lion_Obs3.png");
    welcome_screen = loadImage("Images/Welcome Screen.png");
}

function setup() {
  createCanvas(1570,770); 

  cheetah = createSprite(180,590);
  cheetah.addAnimation("runner",cheetah_running);
  cheetah.scale = 1.5;
}

function draw() {
    background("white")

    if(gameState === HOME) {
      background(welcome_screen);
      cheetah.visible = false;
      if(keyDown("Space")) {
        gameState = PLAY;
      }
    }
    if(gameState === PLAY) {
      background(backgrImg);

      cheetah.visible= true;
    }
    
  drawSprites();
}