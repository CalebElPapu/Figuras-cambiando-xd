noseX=0;
noseY=0;
muñeca1=0;
muñeca2=0;
difference=0;
color1="";
color2="";
palabra="";

function setup(){
    video= createCapture(VIDEO);
    video.size(500,500);
    video.position(100,325)
    
    canvas=createCanvas(550,550);
    canvas.position(660,325);

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function enviar(){
    palabra= document.getElementById("text_input").value;
}

function modelLoaded() {
    console.log('PoseNet is Initialized!')
}

function gotPoses(results)
{
  
    if(results.length > 0)
    {
        
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX +" noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX + "difference = " + difference);

        if(noseX<250){
            color1="black"
        }
        if(noseX>250){
            color1="grey"
        }

        if(noseY<250){
            color2="green"
        }
        if(noseY>250){
            color2="#AEB404"
        }
    }
}

function draw() {
    background(color2);

    var combo=document.getElementById("option_names");
    var selected=combo.options[combo.selectedIndex].text;

    if(selected=="Cuadrado")
    {
    document.getElementById("Tamaño de la figura").innerHTML = "EL ancho y alto del cuadrado sera = " + difference + "px";
    fill(color1);
    square(noseX, noseY, difference);
    }

    if(selected=="Círculo")
    {
    document.getElementById("Tamaño de la figura").innerHTML = "EL radio del círculo sera = " + difference + "px";
    fill(color1);
    circle(noseX, noseY, difference);
    }

    if(selected=="Texto")
    {
    document.getElementById("Tamaño de la figura").innerHTML = "EL ancho y alto del texto sera = " + difference + "px";
    fill(color1);
    textSize(difference);
    text(palabra, noseX, noseY,);
    }

    }