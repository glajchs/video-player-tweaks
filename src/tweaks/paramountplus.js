javascript:(function(){
    /* NOTE: Since bookmarklets inline the whole script into 1 single line, ALL comments must be of this format */

    /* Protection against double-clicks on the bookmarklet */
    if (window._videoPlayerTweaksInsert === true) {
        return;
    }
    window._videoPlayerTweaksInsert = true;

    /* Used to hide any player overlays or sections that get in the way of the viewing experience */
    var css = `
        .skin-sidebar-plugin {
            display: none !important;
        }
    `;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    /* Used to not let the key do what it was supposed to do before. */
    /* For instance, if you want down-arrow key to be volume down, you probably also don't want it scrolling the page down (the default behavior) */
    /* If you also do want the default behavior, just don't call this function for your keybind */
    function stopDefaultKeyBehavior(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    var videoPlayerCSSSelector = "cbsplayer video";

    document.addEventListener("keydown", function(event) {
        /* Uncomment to debug which keys are being pressed */
        /* console.log(event.key); */
        /* console.log(event.code); */

        var playerElement = document.querySelector(videoPlayerCSSSelector);
        if (playerElement == null) {
            return;
        }
        if (event.key === " " || event.code === "Space") {
            var playerState = playerElement.paused;
            if (playerState) {
                playerElement.play();
            } else {
                playerElement.pause();
            }
            stopDefaultKeyBehavior(event);
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            var currentVolume = playerElement.volume;

            /* If you want finer or larger volume increments, tweak this value here. */
            /* Volume is a decimal number between 0 (muted) and 1 (max volume for player) */
            var volumeIncrement = 0.05;

            var newVolume = currentVolume;
            if (typeof currentVolume !== "number") {
                return;
            }
            if (event.key === "ArrowDown") {
                if (currentVolume > (1 - volumeIncrement)) {
                    newVolume = (1 - volumeIncrement);
                } else if (currentVolume < volumeIncrement) {
                    newVolume = 0;
                } else {
                    newVolume -= volumeIncrement;
                }
                playerElement.volume = newVolume;
                stopDefaultKeyBehavior(event);
            } else if (event.key === "ArrowUp") {
                if (currentVolume > 1) {
                    newVolume = 1 - volumeIncrement;
                } else if (currentVolume < 0) {
                    newVolume = volumeIncrement;
                } else {
                    newVolume += volumeIncrement;
                }
                playerElement.volume = newVolume;
                stopDefaultKeyBehavior(event);
            }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            var seekInfo = playerElement.seekable;
            var currentTime = playerElement.currentTime;
            if (seekInfo == null || currentTime == null || typeof currentTime !== "number") {
                return;
            }
            /* Uncomment to see details for seekable streams. This player only has 1 stream, so just use index 0 */
            /* console.log(seekInfo); */
            var startTime = seekInfo.start(0);
            var endTime = seekInfo.end(0);

            var newTime;
            if (event.key === "ArrowLeft") {
                if (currentTime - 15 < startTime) {
                    newTime = startTime;
                } else {
                    newTime = currentTime - 15;
                }
                playerElement.currentTime = newTime;
                stopDefaultKeyBehavior(event);
            } else if (event.key === "ArrowRight") {
                if (currentTime + 15 > endTime) {
                    newTime = endTime;
                } else {
                    newTime = currentTime + 15;
                }
                playerElement.currentTime = newTime;
                stopDefaultKeyBehavior(event);
            }
        }
    });
})();
