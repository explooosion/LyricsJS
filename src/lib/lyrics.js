import fs from 'fs';
import path from 'path';

export function lyrics() {
    let fullpath = path.join(__dirname, '../res/讓我留在你身邊.lrc');
    let lyrics = parseLyric(fs.readFileSync(fullpath, 'utf8'));
    return lyrics;
}

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = new Array();
    for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, '');

        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;

            var obj = new Object();
            obj.time = time;
            obj.lyric = clause;

            lrcObj.push(obj);
        }
    }
    return lrcObj;
}