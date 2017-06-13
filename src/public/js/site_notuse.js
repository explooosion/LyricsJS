 // YoutubePlayer
 let ytp;

 // HandlerInterval
 let intervalId;

 // Diff CurrentTime
 let diffTime = 0;


 /**
  * Create Youtube Iframe
  */
 function onYouTubeIframeAPIReady() {
     let container = document.querySelector('#video-container');
     let opts = {
         'videoId': 'y_cRDZXc3Hk',
         'events': {
             'onReady': handlePlayerReady,
             'onStateChange': handleStateChange
         }
     };
     ytp = new YT.Player(container, opts);

 }

 /**
  * Handle - PlayerReady
  */
 function handlePlayerReady() {
     ytp.setVolume(100);
     ytp.playVideo();
 }

 /**
  * Handle - StateChange
  * @param {*} e 
  */
 function handleStateChange(e) {
     if (e.data == YT.PlayerState.PLAYING) {
         tLast = ytp.getCurrentTime();
         intervalId = window.setInterval(GetCurrentTime, 1);
     } else {
         window.clearTimeout(intervalId);
     }
 }

 /**
  * Get - CurrentTime
  */
 function GetCurrentTime() {

     let time = ytp.getCurrentTime();

     // Compare to the last reported current time.
     if (tLast != time) {

         tLast = time;

         show.innerText = time ? `CurrentTime: ${time}` : 0;

         if (lyrics) {

             let diff = 4;
             let lyricGroup = document.getElementsByClassName('lyric');

             for (let i = 0; i < lyricGroup.length; i++) {
                 if (lyricGroup[i].getAttribute("data-time") <= time - diff) {

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
 }


 /**
  * Show - CurrentTime
  */
 function ShowCurrentTime() {

 }



 console.log('site');

 let audio = document.getElementById("audio");
 let show = document.getElementById("time");
 let lyric = document.getElementById("lyric");

 let lyrics = Array();

 fetch('api').then((response) => {
         if (response.status >= 200 && response.status < 300) {
             return response.json()
         } else {
             let error = new Error(response.statusText)
             error.response = response
             throw error
         }
     })
     .then((data) => {

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










 // Design For Audio

 // audio.addEventListener('timeupdate', () => {
 //     let time = Number(currentTimeElem.innerText).tixed(0);
 //     // let time = audio.currentTime;
 //     show.innerText = time ? `CurrentTime: ${time}` : 0;

 //     if (lyrics) {

 //         let diff = 3;
 //         // let a = lyrics.filter((element, index, arrrs) => {
 //         //     return element.time + diff < time;
 //         // });

 //         // if (a[a.length - 1]) {
 //         //     lyric.innerText = " 歌詞：" + a[a.length - 1].lyric;
 //         // } else {
 //         //     lyric.innerText = " 歌詞：";
 //         // }


 //         let lyricGroup = document.getElementsByClassName('lyric');
 //         for (let i = 0; i < lyricGroup.length; i++) {
 //             if (lyricGroup[i].getAttribute("data-time") < Math.round(time - 3, 0)) {

 //                 for (let j = 0; j < lyricGroup.length; j++) {
 //                     lyricGroup[j].style.color = "black";
 //                 }
 //                 lyricGroup[i].style.color = "red";
 //             } else {
 //                 lyricGroup[i].style.color = "black";
 //             }
 //             //style.background
 //         }
 //     }
 // }, false);