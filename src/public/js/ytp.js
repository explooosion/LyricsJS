'use strict';

class YouTubePlayer {

    constructor(element, videoId) {
        this.ytp = new YT.Player(
            document.querySelector(element), {
                'videoId': videoId,
                'events': {
                    /**
                     * Handler - onReady
                     */
                    'onReady': () => {
                        this.ytp.setVolume(100);
                        this.ytp.playVideo();
                    },
                    /**
                     * Handler - onStateChange
                     */
                    'onStateChange': () => {
                        this.IsPlay = true;
                    }
                }
            }
        );
        this.IsPlay = false;
    }

    /**
     * Get Player Time
     */
    getCurrentTime() {
        return this.ytp.getCurrentTime();
    }
}