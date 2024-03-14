var currentsong;
let songlist;
let i=0;
// let a= getSongs();  
async function getSongs(){
    let a=await fetch("http://127.0.0.1:3000/songs/");
    let response= await a.text();
    // console.log(response)
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
    console.log(as)
    songs=[];
   for (const key of as) {
    if(key.href.endsWith(".mp3")){
        songs.push(key.href);
    }
   }
   return songs
}
async function playSong(songname){
    // let a=await getSongs();  
    // let songlist=await getSongName()
    // console.log(songlist)
    for (const key in songlist) {
    var b=songlist[key].split("artist")
    let c=b[0].replace(".mp3","")
    c=c.replaceAll(" ","")
    songname=songname.replaceAll(" ","")
       if(songname==c){
        playThisSong(a[key])
       }
    }
}
async function getSongName(){
    let a=await fetch("http://127.0.0.1:3000/songs/");
    let response= await a.text();
    // console.log(response)
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a")
    console.log(as)
    songs=[];
   for (const key of as) {
    if(key.href.endsWith(".mp3")){
        songs.push(key.innerText);
    }
   }
   return songs 
}
async function playThisSong(x){
    currentsong.pause()
    currentsong=new Audio(x)
    currentsong.play();
    playtheme();
}
async function playtheme(){
    let pp=document.getElementsByClassName("playpause")[0].children[0];
    pp.src="/svgs/pause.svg";

}
async function pausedtheme(){
    let pp=document.getElementsByClassName("playpause")[0].children[0];
    pp.src="/svgs/playbtn.svg"

}
async function nSong(){
    i=(Math.abs(i+1))%((a.length));
   
    playThisSong(a[i]);
   
    console.log("playing next song")
    playtheme();
    
}
async function pSong(){
    if(i==0){
        i=a.length-1;
    }else{

        i=(i-1);
    }

    playThisSong(a[i]);
    console.log("playing previous song")
    playtheme();

}
async function main(){
    document.title="Spotify-Clone"
    songlist=await getSongName();
    a=await getSongs();
    let songNames= songlist;
    // console.log(a); 
     i=0;
    currentsong= new Audio(a[i]);
    let playpause=document.getElementsByClassName("playpause")[0]
    // let pp=document.getElementsByClassName("playpause")[0].children[0]
    let prevsong=document.querySelector(".prevsong").children[0]
    let nextsong=document.querySelector(".nextsong").children[0]
    prevsong.addEventListener("click",()=>{
        // if(i==0){
        //     i=a.length-1;
        // }else{

        //     i=(i-1);
        // }
        // currentsong.pause()
        // currentsong=new Audio(a[i])
        // currentsong.play();
        // console.log("playing previous song")
        pSong();

    })
    nextsong.addEventListener("click",()=>{
        // i=(Math.abs(i+1))%((a.length));
        // currentsong.pause()
        // currentsong=new Audio(a[i])
        // currentsong.play();
        // console.log("clicked next song")
        // playtheme();
        nSong();
    })

    playpause.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.pause()
            currentsong.play();
            // pp.src="/svgs/pause.svg"
            playtheme()
        }else{
            currentsong.pause();
            // pp.src="/svgs/playbtn.svg"
            pausedtheme();
        } 
    });
    currentsong.addEventListener("ontimeupdate",()=>{
        let dur=currentsong.duration;
        console.log("duration is",dur)
    
    })
    // let playpause=document.getElementsByClassName("playpause")[0]
    let snglst= document.querySelector(".songListCard");

    for (const name of songNames) {//Making a list of songs with artist names
        let nameart=name.split("artist-")
        if(nameart.length>1){
        nameart[1]=nameart[1].replace(".mp3","")}
        else{
            nameart[0]=nameart[0].replace(".mp3","")
        }
        if(nameart[1]==undefined){
            nameart[1]="";
        }
        snglst.innerHTML=snglst.innerHTML+` <li class="songListCardli">
        
        <img src="/svgs/music.svg" alt="music.svg">
        <div class="nameartist">
        <p >${nameart[0]}</p>
        <p>${nameart[1]}</p>
        </div>
        <div class="playnow">Play Now <img src="/svgs/playbtn.svg" alt="playbtn">
        </div>
        
        </li>`
    }

    let songListArr=Array.from(document.getElementsByClassName("songListCardli"))
    songListArr.forEach(e=>{
            e.children[2].addEventListener("click",()=>{
            // console.log(e.children[1].children[0])
            let songname=(e.children[1].children[0].innerText)
           playSong(songname)
        })

    
    })

    let container=document.querySelector(".cardContainer")
    console.log(container)
    songlist.forEach(element => {
        let newcard= `<div class="card">
        <div class="imgbox">
    
            <img src="/images/ab67706f000000026e515187c071e45918e9f0de.jpeg" alt="ss">
            <div class="play">
                  <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="/icons/play-stroke-sharp.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
                          <path d="M5 20V4L19 12L5 20Z" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"></path>
                          </svg>
                  </button>
            </div>
        </div>
        <div class="cardDetails">
    
            <h3>${element}</h3>
            <p>
                The perfect soundtrack to those long nights over dinner
            </p>
        </div>
    </div>`
        container.innerHTML=container.innerHTML+newcard
        
        
    });

    }
    

main()   