import fs from 'fs';
import path from 'path';

export function lyrics() {
    let fullpath = path.join(__dirname, '../res/讓我留在你身邊.lrc');
    return parseLyric(fs.readFileSync(fullpath, 'utf8'));
}

function parseLyric(lrc) {

    let lyrics = lrc.split("\n");
    let lrcObj = new Array();

    for (let i = 0; i < lyrics.length; i++) {

        let lyric = decodeURIComponent(lyrics[i]);
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let timeRegExpArr = lyric.match(timeReg);

        if (!timeRegExpArr) continue;
        let clause = lyric.replace(timeReg, '');

        for (let k = 0; k < timeRegExpArr.length; k++) {

            let t = timeRegExpArr[k];

            let min = Number(String(t.match(/\[\d*/i)).slice(1));
            let sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let mic = Number(Number(Number(String(t.match(/\.\d*/i)).slice(1)) * 0.01).toFixed(2));
            let time = min * 60 + sec + mic;

            lrcObj.push(
                new Object({
                    time: time,
                    lyric: clause
                })
            );

        }
    }
    return lrcObj;
}