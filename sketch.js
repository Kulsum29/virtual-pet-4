//Create variables here
var dog,dogImage;
var database, foodAmount;
var mood;
var feedButton,addFoodButtonButtonButton;
var lastFed;
var foodObj;
var currentTime;
var gameState;
var roomImage,gardenImage,wsImage;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  bowl = loadImage("images/dogfood.png")
  roomImage = loadImage("images/Bed Room.png");
  gardenImage = loadImage("images/Garden.png");
  wsImage = loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,270);
  dog.addAnimation("dog",dogImage);
  dog.addAnimation("happy_dog",happyDogImage);
  dog.scale=0.35

  database = firebase.database();

  gameState = database.ref("GameState");
  gameState.on("value", function(data){ gameState=data.val()})

  foodAmount = database.ref("Food");
  mood = database.ref("Mood");
  lastFed = database.ref("FeedTime");

  foodAmount.on("value",readAmount,showError);
  //saving value to foodAmount
  mood.on("value",readMood,showError);
  //saving value to mood
  lastFed.on("value", function(data){ lastFed=data.val()})
  //saves value to lastFed

  feedButton=createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(addMilkBottle);

  addFoodButton=createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(resetStock)

  foodObj = new Food()
  currentTime=hour();
}


function draw() {  

  background("#663399")
  drawSprites();
  textSize(20)
  fill(0)
  //foodObj.display()



  if(gameState!="hungry"){
    feedButton.hide();
    addFoodButton.hide()
    dog.visible=false
  }
  else{
    feedButton.show();
    addFoodButton.show()
    dog.visible=true
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed+2)&&currentTime<=(lastFed+4)){
    update("bathing");
    moodNormal();
    foodObj.washroom();
  }
  else{
    update("hungry");
    
    foodObj.display();

  }






  if(foodAmount>-1){
    text ("Food Available: "+ foodAmount, 100,100 );
    
    if(lastFed>12){
      text("Last Fed at: "+ lastFed%12 + " PM", 600,100)
    }
    else if(lastFed==0){
      text("Last Fed at: 12 AM", 600,100)
    }
    else if(lastFed==12){
      
      text("Last Fed at: 12 PM", 600,100)
    }
    else{
      text("Last Fed at: "+ lastFed +" AM", 600,100)
    }
     
  }


/*
  if(foodAmount==0){
    
    
  }*/

}


function update (state){

  database.ref('/').update({
    GameState:state});
}
function readAmount(data){

  foodAmount = data.val()
  foodObj.updateFoodStock(foodAmount)
}
function showError(){
  console.log("error")
}


function writeAmount(x){
  database.ref("Food").set(
    foodAmount-x
  )
}

function resetStock(n=1){
  if(foodAmount<54){
    database.ref("Food").set(
      foodAmount+n
    ) 
  }
  
}

function addMilkBottle(){
  if(foodAmount>0){

    writeAmount(1);
    moodHappy();
    currentTime=hour();
    database.ref("FeedTime").set(currentTime)
  }

}

function readMood(data){
  mood = data.val();
  if(mood===0){
    moodNormal();
  }
  else if(mood===1){
    moodHappy();
  }
}
function moodHappy(){
  database.ref("Mood").set(
    1
  )

  dog.changeAnimation("happy_dog");
}
function moodNormal(){
  database.ref("Mood").set(
    0
  )

  dog.changeAnimation("dog")
}