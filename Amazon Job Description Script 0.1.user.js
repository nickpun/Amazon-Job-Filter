// ==UserScript==
// @name         Amazon Job Description Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Saves Amazon job listing if I'm qualified for it
// @author       Nicholas Pun
// @match        https://www.amazon.jobs/en/jobs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.jobs
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Debug control
    let consoleLog = true;
    let closeTab = true;

    // Descriptors that void my qualification
    let badDescriptors = [
        '1+ years',
        '2+ years',
        '3+ years',
        '4+ years',
        '5+ years',
        '6+ years',
        '7+ years',
        '8+ years',
        '9+ years',
        '10+ years',
        'Several years',
        'Hands-on experience'
    ];

    let goodFit = true;

    // Check for the bad descriptors
    badDescriptors.forEach(function(descr) {
        if ($("p:contains(" + descr + ")").length > 0) goodFit = false;
        if ($("li:contains(" + descr + ")").length > 0) goodFit = false;
        if ($("a:contains(" + descr + ")").length > 0) goodFit = false;
    });

    if (consoleLog) console.log(goodFit);

    // Save job if I'm qualified
    if (goodFit) {
        let link = window.location.href;
        let title = document.getElementsByClassName("title")[0].getAttribute('title');
        let jobId = "";

        for (let i = 32; i < link.length; i++) {
            if (link[i] == '/') break;
            jobId += link[i];
        }

        var a = document.createElement("a");
        a.href = "data:text," + title + "\n" + link;
        a.download = jobId;
        a.click();
    }

    // Close tab
    if (closeTab) close();
})();