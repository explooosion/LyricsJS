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
        // data 才是實際的 JSON 資料
        lyrics = data;
        console.log(lyrics);
        //console.log(Object.keys(lyrics)[0]);

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
    }

}, false);