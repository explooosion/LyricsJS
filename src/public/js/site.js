console.log('site');

var audio = document.getElementById("audio");
var show = document.getElementById("time");
var lyric = document.getElementById("lyric");

var lyrics = Array();

fetch('api').then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    })
    .then((data) => {

        lyrics = data;

        var box = document.getElementById("lyric-box");
        for (var i in lyrics) {
            var para = document.createElement("p");
            para.className = "lyric";
            para.setAttribute("data-time", lyrics[i].time);
            para.innerText = lyrics[i].lyric;
            box.appendChild(para);
        }

    });

audio.addEventListener('timeupdate', () => {

    var time = audio.currentTime;
    show.innerText = time ? `CurrentTime: ${time}` : 0;

    if (lyrics) {

        var diff = 3;
        var a = lyrics.filter((element, index, arrrs) => {
            return element.time + diff < time;
        });

        if (a[a.length - 1]) {
            lyric.innerText = " 歌詞：" + a[a.length - 1].lyric;
        } else {
            lyric.innerText = " 歌詞：";
        }


        var lyricGroup = document.getElementsByClassName('lyric');
        for (var i = 0; i < lyricGroup.length; i++) {
            if (lyricGroup[i].getAttribute("data-time") < Math.round(time - 3, 0)) {

                for (var j = 0; j < lyricGroup.length; j++) {
                    lyricGroup[j].style.color = "black";
                }
                lyricGroup[i].style.color = "red";
            } else {
                lyricGroup[i].style.color = "black";
            }
            //style.background
        }

    }

}, false);