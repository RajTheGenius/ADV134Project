
status = "";
song = '';
objects = [];

function preload()
{
	song = loadSound("Song.mp3");
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.position(800, 250);
  video = createCapture(VIDEO);
  video.size(640, 420);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = " Detecting objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}



function draw() {
    image(video, 0,0,600, 450)
    if(status != "") {
    
    r = random(255);
    g = random(255);
    b = random(255);

    { for (i = 0; i < objects.length; i++) { 
        document.getElementById("status").innerHTML = "Status : Object Detected"; 
        document.getElementById("ObjDetected").innerHTML = objects.length;
        fill(r,g,b); 
        percent = floor(objects[i].confidence * 100); 
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 

        if(objects[i].label == "person")
          {
            document.getElementById("ObjDetected").innerHTML = "Baby Found";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("ObjDetected").innerHTML = "Baby Not Found";
            console.log("play"); 
            song.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("ObjDetected").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
        }
    } 
    }
}
