 var youtube;

 window.onload = () => {
     youtube = new YouTubePlayer('#video-container', 'y_cRDZXc3Hk');

     setInterval(TimeRun, 1);
 };

 function TimeRun() {
     if (youtube.IsPlay) {
         document.getElementById("current-time").innerText = youtube.getCurrentTime();
     }
 }