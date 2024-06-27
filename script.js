var currentsong;
let songlist;
let i = 0;
let songDuration = 0;
// let a= getSongs();  
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = [];
    for (const key of as) {
        if (key.href.endsWith(".mp3")) {
            songs.push(key.href);
        }
    }
    return songs
}
async function playSong(songname) {
    songname = songname.split("artist")
    songname = songname[0]
    songname = songname.replaceAll(".mp3", "")
    let PrevSongName = document.getElementsByClassName("sDetails")[0].children[0].innerText = songname
    console.log(PrevSongName)
    songname = songname.replaceAll(" ", "")
    songname = songname.replaceAll("-", "")
    songname = songname.replaceAll(",", "")

    console.log(songname)
    // console.log(songlist)
    for (const key in songlist) {
        var b = songlist[key].split("artist")
        let c = b[0].replace(".mp3", "")
        c = c.replaceAll(" ", "")


        if (songname == c) {
            playThisSong(a[key])
            console.log(`playing ${a[key]}`)
        }
    }

}
async function getSongName() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = [];
    for (const key of as) {
        if (key.href.endsWith(".mp3")) {
            songs.push(key.innerText);
        }
    }
    return songs
}
async function playThisSong(x) {
    currentsong.pause()
    currentsong = new Audio(x)
    currentsong.play();
    playtheme();
}
async function playtheme() {
    let pp = document.getElementsByClassName("playpause")[0].children[0];
    pp.src = "./svgs/pause.svg";

}
async function pausedtheme() {
    let pp = document.getElementsByClassName("playpause")[0].children[0];
    pp.src = "./svgs/playbtn.svg"

}
function playPauseFunc(event) {
    if (event.type === "click" || (event.type === "keypress" && (event.keyCode === 32 || event.key === " "))) {
        console.log("Spacebar pressed or element clicked");
        if (currentsong.paused) {
            currentsong.pause()
            currentsong.play();
            playtheme()
        } else {
            currentsong.pause();
            pausedtheme();
        }
    }
}
async function nSong() {
    i = (Math.abs(i + 1)) % ((a.length));
    playThisSong(a[i]);
    console.log("playing next song")
    playtheme();

}
async function pSong() {
    if (i == 0) {
        i = a.length - 1;
    } else {

        i = (i - 1);
    }

    playThisSong(a[i]);
    console.log("playing previous song")
    playtheme();

}
function updateProgressBar() {
    var progressed=document.getElementById("progress-bar")
    var dur_bar=document.getElementById("duration-bar")
    currentsong.ontimeupdate=function(e){
        
        progressed.style.width=Math.floor(100*currentsong.currentTime/currentsong.duration)+"%"
    }
    dur_bar.onclick=function(e){
        currentsong.currentTime=((e.offsetX/dur_bar.offsetWidth)*currentsong.duration)
    }
    
}

async function main() {
    document.title = "Spotify-Clone"
    songlist = await getSongName();
    a = await getSongs();
    let songNames = songlist;
    i = 0;
    currentsong = new Audio(a[i]);
    let playpause = document.getElementsByClassName("playpause")[0]
    // let pp=document.getElementsByClassName("playpause")[0].children[0]
    let prevsong = document.querySelector(".prevsong").children[0]
    let nextsong = document.querySelector(".nextsong").children[0]
    prevsong.addEventListener("click", () => {
        pSong();
        updateProgressBar()
    })
    nextsong.addEventListener("click", () => {
        nSong();
        updateProgressBar()
    })

    playpause.addEventListener("click", playPauseFunc);
    // playpause.addEventListener("keypress", playPauseFunc); This is for spacebar 
    // playpause.setAttribute("tabindex", "0");
    currentsong.addEventListener("ontimeupdate", () => {
        let dur = currentsong.duration;
        console.log("duration is", dur)
        updateProgressBar()

    })
    // let playpause=document.getElementsByClassName("playpause")[0]
    let snglst = document.querySelector(".songListCard");

    for (const name of songNames) {//Making a list of songs with artist names
        let nameart = name.split("artist-")
        if (nameart.length > 1) {
            nameart[1] = nameart[1].replace(".mp3", "")
        }
        else {
            nameart[0] = nameart[0].replace(".mp3", "")
        }
        if (nameart[1] == undefined) {
            nameart[1] = "";
        }
        snglst.innerHTML = snglst.innerHTML + ` <li class="songListCardli">
        
        <img src="./svgs/music.svg" alt="music.svg">
        <div class="nameartist">
        <p >${nameart[0]}</p>
        <p>${nameart[1]}</p>
        </div>
        <div class="playnow">Play Now <img src="./svgs/playbtn.svg" alt="playbtn">
        </div>
        
        </li>`
    }

    let songListArr = Array.from(document.getElementsByClassName("songListCardli"))
    songListArr.forEach(e => {
        e.children[2].addEventListener("click", () => {
            // console.log(e.children[1].children[0])
            let songname = (e.children[1].children[0].innerText)
            playSong(songname)


            
        })


    })

    let container = document.querySelector(".cardContainer")

    // console.log(container)

    songlist.forEach(element => {
        let newcard = `<div class="card">
        <div class="imgbox">
    
            <img src="./images/ab67706f000000026e515187c071e45918e9f0de.jpeg" alt="ss">
            <div class="play">
                  <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="./icons/play-stroke-sharp.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
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
        container.innerHTML = container.innerHTML + newcard


    });
    var allCards = Array.from(document.getElementsByClassName("card"))
    allCards.forEach(element => {
        element.addEventListener("click", () => {
            // console.log(element.children[1].children[0])
            playSong(element.children[1].children[0].textContent)
            updateProgressBar()

        })
    });
            
    // var progressed= document.getElementById("progress-bar");
    // progressed.addEventListener("")
    var dur_bar = document.getElementById("duration-bar");
    dur_bar.addEventListener("click", function(e) {
        var offsetX = e.offsetX;
        var newTime = (offsetX / dur_bar.offsetWidth) * currentsong.duration;
        currentsong.currentTime = newTime;
    });

}


main()   