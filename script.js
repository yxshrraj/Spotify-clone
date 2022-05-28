console.log("Welcome to Spotify");
let songIndex=0;
let audioElement=new Audio('songs/goosebumps.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif =document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem')); 

let songs=[
    {songName: "Goosebumps",filepath:"songs/goosebumps.mp3", coverpath:"covers/yoyoimages.jpg"},
    {songName: "Butterflyeffect",filepath:"songs/butterflyeffect.mp3", coverpath:"covers/yoyoimages.jpg"},
    {songName: "Stargazing",filepath:"songs/stargazing.mp3", coverpath:"covers/yoyoimages.jpg"},
    {songName: "Mafia",filepath:"songs/mafia.mp3", coverpath:"covers/yoyoimages.jpg"},
    {songName: "Antidote",filepath:"songs/antidote.mp3", coverpath:"covers/yoyoimages.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})

//audioElement.play();
//handle pause/play click button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause() ;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>
{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>
{
   
    audioElement.currentTime= (myProgressBar.value)*(audioElement.duration)/100;
})
const makeAllPlays = ()=>(
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
    {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
)
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex =parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src ='songs/${songIndex+1}.mp3';
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        

    })
})
//copied
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
