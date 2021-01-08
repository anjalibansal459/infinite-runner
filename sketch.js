var gameState="PLAY";
var emoImage;
var doll,dollImage;
var ground,groundImage;
var virus,virusImage;
var gold,goldImage;
var water,waterImage;
var score;
var health;
var cheerSound;
var death;
var emo;
var sadSound;
function preload(){
  dollImage=loadImage("s3.png");
  groundImage=loadImage("a.png")
  virusImage=loadImage("abcc.png");
  goldImage=loadImage("gold.png");
  waterImage=loadImage("teapot.png");
  emoImage=loadImage("emo.png");
  cheerSound=loadSound("cheer.mp3");
  sadSound=loadSound("sad.mp3");
}


function setup() 
{
  createCanvas(600, 600);
  
  ground=createSprite(200,150,600,600);
  ground.addImage(groundImage);
  ground.scale=2;
  ground.velocityY=5;
  doll=createSprite(300,450,20,20);
  doll.addImage("doll",dollImage);
  doll.scale=0.1;
  score=0;
  health=3;
  death=0;
  emo=createSprite(200,250,600,600);
  emo.addImage("emo",emoImage);
  emo.scale=0.5;
  
  virusGroup=new Group();
  goldGroup=new Group();
  waterGroup=new Group();
}

function draw() 
{
  background("green");
   drawSprites();
  
  
 if(gameState==="PLAY")
 {
   textSize(30);
  fill("black");
  text("score :"+score,100-50,50);
 text("health :"+health,100-50,100);
  text("death : "+death,100-50,150);
   emo.visible=false;
   if(frameCount%200===0){
       cheerSound.play();
   }
 
  if(ground.y>400){
    ground.y=height/2;
  }
  if(keyDown("left"))
  {
    doll.x=doll.x-2;
  }
  if(keyDown("right"))
  {
    doll.x=doll.x+2;
  }
   if(goldGroup.isTouching(doll))
   {
    score=score+1;
    goldGroup.destroyEach();
  }
   if(waterGroup.isTouching(doll))
   {
     waterGroup.destroyEach();
    health=health+3;
  }
  if(virusGroup.isTouching(doll))
  {
    virusGroup.destroyEach();
    death=death+1;
  }
   
  if(frameCount%600===0)
  {
    health=health-2;
  }
  
  if(death===5||health===0)
  {
       sadSound.play();
    gameState="END";
  }
  
  spawnVirus();
  spawnGold();
  spawnWater();
 
  
 
  }
  else if(gameState==="END"){
 
    // fill("black");
     //textSize(50);
     doll.visible=false;
      emo.visible=true;
    waterGroup.visible=false;
    goldGroup.visible=false;
    virusGroup.visible=false;
    ground.visible=false;
  textSize(50);
    fill("black");
      text("Game Over!!",200,200);
}
  
}
  
  
  



function spawnWater(){
  if(frameCount%380===0){
    water=createSprite(Math.round(random(250,380)),10,10,10);
    water.addImage(waterImage);
    water.scale=0.4;
    water.velocityY=3;
    water.lifetime=200;
    waterGroup.add(water);
  }
}





function spawnVirus(){
  if(frameCount%130===0){
    virus=createSprite(Math.round(random(100,500)),10,10,10);
    virus.addImage(virusImage);
    virus.scale=0.1;
    virus.velocityY=3;
    virus.lifetime=200;
    virusGroup.add(virus);
  }
}


function spawnGold(){
  if(frameCount%220===0){
    gold=createSprite(Math.round(random(100,400)),10,10,10);
    gold.addImage(goldImage);
    gold.scale=0.2;
    gold.velocityY=3;
    gold.lifetime=200;
    goldGroup.add(gold);
  }
}