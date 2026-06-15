javascript:(function() {
    /* NOTE: Since bookmarklets inline the whole script into 1 single line, ALL comments must be of this format */
    function removeYoutubePlayerStuff() {
      document.querySelector(".ypl-layout").childNodes.forEach(function(childNode) {
          if (childNode.nodeName == "DIV" && (childNode.classList == null || !childNode.classList.contains("ypl-main"))) {
              childNode.remove();
          }
      });
    }
    removeYoutubePlayerStuff();
    /* Youtube adds the divs back once or twice, but running it again fixes it. */
    setTimeout(removeYoutubePlayerStuff, 500);
    setTimeout(removeYoutubePlayerStuff, 1500);
})();
