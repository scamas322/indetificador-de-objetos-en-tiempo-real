function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded()
{
  console.log("modelo Cargado");
}

function draw()
{
  image(video, 0,0,300,300);
  classifier.classify(video,gotResult);
}

var previus = "";
function gotResult(error, results)
{
  if(error)
  {
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5)&&(previus != results[0].label))
    {
      console.log(results);
      previus = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = "objeto detectado" + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("result_object").innerHTML = results[0].label;
      document.getElementById("result_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}
