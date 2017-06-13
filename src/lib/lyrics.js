import fs from 'fs';
import path from 'path';

class Lyrics {

    constructor() {
        this.name = null;
        this.fullpath = null;
        this.lrc = null;
        this.lrcObj = new Array();
    }

    /**
     * Set Source Name
     * @param {string} name 
     */
    setFileName(name) {
        this.name = name;
        this.fullpath = path.join(__dirname, `../res/${this.name}.lrc`);
        this.lrc = fs.readFileSync(this.fullpath, 'utf8');
        this.lrcObj = new Array();
    }

    /**
     * Parse lrc
     * @param {string} name 
     */
    parseLyric(name) {

        this.setFileName(name);

        let lyrics = this.lrc.split("\n");

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

                this.lrcObj.push(
                    new Object({
                        time: time,
                        lyric: clause
                    })
                );

            }
        }
        return this.lrcObj;
    }
}

export default Lyrics;