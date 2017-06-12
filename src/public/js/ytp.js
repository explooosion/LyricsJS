'use strict';

class YouTubePlayer {

    constructor(element, videoId) {
        this.ytp = new YT.Player(
            document.querySelector(element), {
                'videoId': videoId,
                'events': {
                    'onReady': () => {
                        this.ytp.setVolume(100);
                        this.ytp.playVideo();
                    },
                    'onStateChange': () => {
                        this.IsPlay = true;
                    }
                }
            }
        );
        this.IsPlay = false;
    }

    getCurrentTime() {
        return this.ytp.getCurrentTime();
    }
}