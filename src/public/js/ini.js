 var youtube;
 var lyrics;
 var timeElement = document.getElementById("current-time");

 window.onload = () => {
     youtube = new YouTubePlayer('#video-container', 'qIF8xvSA0Gw');

     loadLyrics("漂向北方");
     setInterval(TimeRun, 1);
 };

 function TimeRun() {
     if (youtube.IsPlay) {
         timeElement.innerText = youtube.getCurrentTime();
         dynamicLyrics();
     }
 }

 function loadLyrics(name) {

     fetch(`api/${name}`).then((response) => {
             if (response.status >= 200 && response.status < 300) {
                 return response.json()
             } else {
                 let error = new Error(response.statusText)
                 error.response = response
                 throw error
             }
         })
         .then((data) => {

             console.log(data);
             lyrics = data;
             let box = document.getElementById("lyric-box");

             for (let i in lyrics) {
                 let para = document.createElement("p");
                 para.className = "lyric";
                 para.setAttribute("data-time", lyrics[i].time);
                 para.innerText = lyrics[i].time + ' - ' + lyrics[i].lyric;
                 box.appendChild(para);
             }
         });
 }

 function dynamicLyrics() {
     if (lyrics) {

         let diff = 4; // 歌詞要增減速度
         let lyricGroup = document.getElementsByClassName('lyric');

         for (let i = 0; i < lyricGroup.length; i++) {
             if (Number(lyricGroup[i].getAttribute("data-time")) + diff <= youtube.getCurrentTime()) {

                 for (let j = 0; j < lyricGroup.length; j++) {
                     lyricGroup[j].style.color = "black";
                 }
                 lyricGroup[i].style.color = "red";
             } else {
                 lyricGroup[i].style.color = "black";
             }
         }
     }
 }