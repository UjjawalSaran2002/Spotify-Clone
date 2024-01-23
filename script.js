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
    let i=0;
    var currentsong= new Audio(a[i]);
    let playpause=document.getElementsByClassName("playpause")[0]
    let pp=document.getElementsByClassName("playpause")[0].children[0]
    let prevsong=document.querySelector(".prevsong").children[0]
    prevsong.addEventListener("click",()=>{
        i=(Math.abs(i-1))%((a.length)+1);
        currentsong.pause()
        currentsong=new Audio(a[i])
        currentsong.play();
        console.log("clicked prev song")
    })

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
        let nameart=name.split("artist-")
        nameart[1]=nameart[1].replace(".mp3","")
        snglst.innerHTML=snglst.innerHTML+`<li>${name}</li>`
        console.log(nameart)
    }
    
}
main()   