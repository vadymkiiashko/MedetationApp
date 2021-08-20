"use strict";


    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video-container video");
    const timeSelectContainer = document.querySelector(".time-select")
    const soundContainer = document.querySelector(".sound-picker")
    const timeDisplay = document.querySelector(".time-display")
    
    const outlineLength = outline.getTotalLength();
    outline.style.strokeDasharray  = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    let globalTime=0 ;
    let timer;
   
////timer

//parse time 
const getTimeString = (time)=>{
    
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    return `${min}:${sec}`;
}
//runs timer 
const handleTicking = (count)=>{
    
        if(count ==0) return;
        timer = setInterval(()=>{
        console.log(count);
        timeDisplay.textContent = getTimeString(count)
        if(count ===0) pausePlayback();
        
        count--; 
        globalTime = count;
    },1000)
}

//even delegation Buttons selec time sets global variable globalTime 
const handleTimeClick = ()=>{
   
    timeSelectContainer.addEventListener("click",(e)=> {

        const clicked = e.target.closest("button");
        if(!clicked) return;
        //stop in case something is already running ;
        pausePlayback();
        globalTime = clicked.dataset.time;
        timeDisplay.textContent=getTimeString(globalTime)
        
    })
}
///handle playbacks -----------------------------------------------------------------------------
const handlePlayButton =()=>{
    play.addEventListener("click", (e)=>{
        const clicked = e.target;
        song.paused ?  startPlayback() : pausePlayback();
        console.log(clicked)
    })
}
const pausePlayback =()=>{
     //stop previous timer if exists;
    clearInterval(timer);
    play.src = "./img/play.svg";
    video.pause();
    song.pause();

}

const startPlayback =()=>{
    if(globalTime === 0) return;
    play.src = "./img/pause.svg";
    video.play();
    song.play();
    handleTicking(globalTime);
    
}

//---------chose video-----------------


const handleWeatherClick =()=>{
    soundContainer.addEventListener("click" , (e)=>{
        const clicked = e.target.closest("button");
        if(!clicked) return;
        console.log(clicked.dataset.sound)
        if(clicked.dataset.video === song.firstChild.src) return 
        else  { 
            setVideo(clicked)
        }

    })
}

const setVideo =(clicked)=>{
    pausePlayback();
    song.src = clicked.dataset.sound;
    video.src = clicked.dataset.video;
    
}


///animate circle 

const animateCircle =()=>{
   
   
}

song.ontimeupdate =()=>{
    let curentTime = song.currentTime;
    outline.style.strokeDashoffset =outlineLength - (curentTime/(curentTime+globalTime))*outlineLength;
    console.log(globalTime/outlineLength)
}

    //TODO  refractor
const app=()=>{
    handleTimeClick();
    handlePlayButton();
    handleWeatherClick();
   
}
app();
