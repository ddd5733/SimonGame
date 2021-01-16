var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //게임패턴 배열
var randomChosenColour = []; // 내가 누른 버튼 배열
var level = 0;
var started = false;


$(document).on("keypress",function(event){
  if(!started){
      nextSequence();
      started = true;
    }
});

$(".btn").on("click",function(evant){
  var clickedButton = evant.target.id;
    makeSounds(clickedButton);
    pressedButton(clickedButton);
    saveMyButton(clickedButton);
    compareArray(randomChosenColour.length-1);
});

function compareArray(preButton){
  if(gamePattern[preButton]===randomChosenColour[preButton]){
      if(JSON.stringify(gamePattern)==JSON.stringify(randomChosenColour)){
        level++;
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }else{
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      makeSounds("wrong");
      changeTitle("wrong");
      wrong();
    }

}

function nextSequence(){
  randomChosenColour =[];
  var randomNumber = Math.floor(Math.random()*4);
  $(".btn."+buttonColours[randomNumber]).fadeOut(100).fadeIn(100);
  makeSounds(buttonColours[randomNumber]);
  gamePattern.push(buttonColours[randomNumber]);
  changeTitle(level+1);
}

function saveMyButton(chosenButton){
  console.log(level);
    randomChosenColour.push(chosenButton);
}

function changeTitle(result){
  if(result ==="wrong"){
      $("#level-title").text("Game Over, Press Any Key to Restart");
  }else{
    $("#level-title").text("level "+result);
  }
}

function makeSounds(randomButton){
  var audio = new Audio("sounds/"+randomButton+".mp3");
  audio.play();
}

function pressedButton(clicked){
  $(".btn."+clicked).addClass("pressed");
  setTimeout(function(){
    $(".btn."+clicked).removeClass("pressed");
  },200);
}

function wrong(){
  level=0;
  gamePattern = [];
  started = false;
}
