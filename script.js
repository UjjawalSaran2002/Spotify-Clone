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
async function main(){
    let a=await getSongs();  
    let songNames= await getSongName();
    console.log(a); 
    var currentsong= new Audio(a[1]);
    let playpause=document.getElementsByClassName("playpause")[0]
    let pp=document.getElementsByClassName("playpause")[0].children[0]
   
    playpause.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play();
            pp.src="/svgs/pause.svg"
        }else{
            currentsong.pause();
            pp.src="/svgs/playbtn.svg"
        } 
    });
    currentsong.addEventListener("ontimeupdate",()=>{
        let dur=currentsong.duration;
        console.log("duration is",dur)
    
    })
    // let playpause=document.getElementsByClassName("playpause")[0]
    let snglst= document.querySelector(".songlist").children[0];

    for (const name of songNames) {
        snglst.innerHTML=snglst.innerHTML+`<li>${name}</li>`
        
    }
    
}
main()   