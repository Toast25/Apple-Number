x = 0;
y = 0;
screen_W = 0;
screen_H = 0;
apple = ""; 
speak_data ="";
to_number="";
draw_apple = "";


function preload() {
  apple = loadImage("apple.png");
}


var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
 to_number = Number(content);
 if (Number.isInteger(to_number)) {
   document.getElementById("status").innerHTML = "Started Drawing Apple";
   draw_apple = "set";
 }
 else {
   document.getElementById("status").innerHTML="The speech has not recognized a number";
 }
}

function setup() {
 screen_W = window.innerWidth;
 screen_H = window.innerHeight;
 canvas = createCanvas(screen_W, screen_H-150);
 canvas.position(0,150); 
}

function draw() {
  if(draw_apple == "set")
  {
    for (var counter = 1; counter <= to_number ; counter++) {
    x = Math.floor(Math.random() * 700);
    y = Math.floor(Math.random() * 400);
    image(apple, x, y, 50, 50);
   }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "Apple Drawn" ;
    speak();

  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
