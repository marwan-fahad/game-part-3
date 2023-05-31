var bg, bgImg;
var player, pLeftImg, pRightImg, shooter_shooting;
var block1, block2, block3, powerblock1, powerblock2
var bullet, bullet2, bulletGroup, bulletGroup2, bulletImg
var playerSide = "right",
  playerSide2 = "left";
var score = 0
var lives = 10
var player2;
var gameState = 0;

function preload() {

  pLeftImg = loadImage("p2.png");

  pRightImg = loadImage("p1.png")

  bgImg = loadImage("bg.png")
  bulletImg = loadImage("bullet.png")
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bulletGroup = new Group()
  bulletGroup2 = new Group()

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage("pRight", pRightImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("circle", 0, 0, 100)

  player2 = createSprite(displayWidth - 150, displayHeight - 300, 50, 50);
  player2.addImage("pLeft", pLeftImg)
  player2.scale = 0.3
  player2.debug = true
  player2.setCollider("circle", 0, 0, 100)


  block1 = createSprite(240, 270, 250, 30)
  block2 = createSprite(1000, 240, 250, 30)
  block3 = createSprite(640, 440, 250, 30)
  powerblock1 = createSprite(10, 650, 100, 20)
  powerblock2 = createSprite(1320, 650, 100, 20)
  edges = createEdgeSprites();

}

function draw() {


  if (gameState === 0) {
    background("black");
    textSize(25);
    text("FIGHTER SIMULATOR", windowWidth / 2 - 190, windowHeight / 2 - 200);

    text("Rules of this game:-", 180, 260);

    text("Player 1 :", 180, 330);
    text("Press SPACE to jump", 180, 360);
    text("Press left arrow to go left", 180, 387);
    text("Press right arrow to go right", 180, 415);
    text("Press z to shoot bullets", 180, 445);


    text("Press ENTER to start the game", 300, 500);

    /* playerName = createInput();
     textAlign(CENTER);
     playerName.position(180,500);*/


    text("Player 2 :", 1000, 330);
    text("Press W to jump", 1000, 360);
    text("Press A arrow to go left", 1000, 387);
    text("Press D arrow to go right", 1000, 415);
    text("Press P to shoot bullets", 1000, 445);

    //player2Name = createInput();

  }

  if (keyDown("enter")) {
    gameState = 1
  }
  if (gameState === 2) {
    background(bgImg);
    player2.collide(block1)
    player2.collide(block2)
    player2.collide(block3);
    if (player2.collide(powerblock1) || player2.collide(powerblock2)) {
      player2.velocityY = -10
    }

    if (keyWentDown("w") && player2.y > 250) {

      // player.addImage(shooter_shooting)
      player2.velocityY = -5
    }
    if (keyDown("a")) {
      player2.x -= 5
      playerSide2 = "left"
      player2.mirrorX(player.mirrorX() * -1)
    }
    if (keyDown("d")) {
      player2.x += 5
      playerSide2 = "right"
      player2.mirrorX(player.mirrorX() * -1)
    }

    if (keyWentDown("p")) {
      bullet2 = createSprite(player2.x, player.y, 20, 20)
      bullet2.addImage("bullet", bulletImg)
      bullet2.scale = 0.5
      if (playerSide2 === "right") {
        bullet2.velocityX = 20
      } else if (playerSide2 === "left") {
        bullet2.velocityX = -20
      }
      bulletGroup2.add(bullet2)
    }

    player2.velocityY += 0.1
    player2.collide(edges[3])
    player2.collide(edges[0])
    player2.collide(edges[1])

    drawSprites();

  }
  if (gameState === 1) {
    background(bgImg);
    console.log(player.y)
    player.collide(block1)
    player.collide(block2)
    player.collide(block3)


    //moving the player up and down 
    if (player.collide(powerblock1) || player.collide(powerblock2)) {
      player.velocityY = -10
    }






    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space") && player.y > 250) {

      // player.addImage(shooter_shooting)
      player.velocityY = -5
    }
    if (keyDown("left")) {
      player.x -= 5
      playerSide = "left"
      player.mirrorX(player.mirrorX() * -1)
    }
    if (keyDown("right")) {
      player.x += 5
      playerSide = "right"
      player.mirrorX(player.mirrorX() * -1)
    }

   /* if(playerSide==="left"){
      player.mirrorX(player.mirrorX() * -1)
     // .changeImage("pLeft", pLeftImg)
    }
    else if(playerSide === "right"){
      player.changeImage("pRight", pRightImg)
    }*/



    if (keyWentDown("z")) {
      bullet = createSprite(player.x, player.y, 20, 20)
      bullet.addImage("bullet", bulletImg)
      bullet.scale = 0.5
      if (playerSide === "right") {
        bullet.velocityX = 20
      } else if (playerSide === "left") {

        bullet.velocityX = -20
      }
      bulletGroup.add(bullet)
    }
    //player goes back to original standing image once we stop pressing the space bar
    //if (keyWentUp("space")) {
    //player.addImage(shooterImg)
    //}
    player.velocityY += 0.1
    player.collide(edges[3])
    player.collide(edges[0])
    player.collide(edges[1])



    drawSprites();
  }



  text("X: " + mouseX + "Y : " + mouseY, mouseX, mouseY)
}