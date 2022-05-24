// ==UserScript==
// @name         Amazon Job List Script
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Opens all Amazon job listings
// @author       Nicholas Pun
// @match        https://www.amazon.jobs/en/location/vancouvervictoria-canada*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.jobs
// @grant        GM_openInTab
// ==/UserScript==

(window.onload = function getJobs() {
    'use strict';

    // Debug control
    let consoleLog = true;
    let openTabs = true;

    // Get job listings
    var tiles = document.getElementsByClassName("job-tile");

    if (tiles.length > 0) {
        if (consoleLog) console.log("script start");

        // Open current batch of listings
        let n = tiles.length;

        if (consoleLog) console.log(n + "job(s) found");

        for (let i = 0; i < n; i++) {
            let link = tiles[i].firstChild.href;
            if (openTabs) GM_openInTab(link);
        }

        // Wait for opened listings to close before opening next batch
        setTimeout(function() {
            if (consoleLog) console.log("timeout complete");

            let nextBtn = document.getElementsByClassName("btn circle right");

            if (nextBtn.length > 0) {
                nextBtn[0].click();
                if (consoleLog) console.log("next button clicked");
                getJobs();
            } else {
                if (consoleLog) console.log("no more jobs");
            }
        }, 10000);
    }
})();