// ==UserScript==
// @name         Erase Recent Subs - Remove Recent Subreddits Section
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes the "Recent Subreddits" section by clearing its saved data from localStorage on Reddit page load.
// @author       saitamasahil
// @license      GPL-3.0 license
// @match        *://*.reddit.com/*
// @grant        none
// @downloadURL  https://github.com/saitamasahil/Erase-Recent-Subs/raw/main/code.js
// @updateURL    https://github.com/saitamasahil/Erase-Recent-Subs/raw/main/code.js
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.hostname.endsWith('reddit.com')) {
        localStorage.removeItem('recent-subreddits-store');
    }
})();
