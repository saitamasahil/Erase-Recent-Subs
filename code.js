// ==UserScript==
// @name         Erase Recent Subs - Remove Recent Subreddits Section
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Removes the "Recent Subreddits" / "Recent" section by clearing saved data from localStorage and hiding the sidebar elements on Reddit.
// @author       saitamasahil
// @license      GPL-3.0 license
// @match        *://*.reddit.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://github.com/saitamasahil/Erase-Recent-Subs/raw/main/code.js
// @updateURL    https://github.com/saitamasahil/Erase-Recent-Subs/raw/main/code.js
// ==/UserScript==

(function() {
    'use strict';

    if (!window.location.hostname.endsWith('reddit.com')) {
        return;
    }

    const TARGET_STORAGE_KEYS = [
        'recent-subreddits-store',
        'recent-page-store',
        'recent_store'
    ];

    const isRecentKey = (key) => {
        if (typeof key !== 'string') return false;
        return TARGET_STORAGE_KEYS.includes(key) || /^recent-(?:subreddits|page|pages|posts)(?:-store)?$/i.test(key);
    };

    // 1. Purge existing stored recent data from localStorage and sessionStorage
    const clearRecentStorage = () => {
        try {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (isRecentKey(key)) {
                    localStorage.removeItem(key);
                }
            }
        } catch (e) {}

        try {
            for (let i = sessionStorage.length - 1; i >= 0; i--) {
                const key = sessionStorage.key(i);
                if (isRecentKey(key)) {
                    sessionStorage.removeItem(key);
                }
            }
        } catch (e) {}
    };

    clearRecentStorage();

    // 2. Intercept Storage methods to block Reddit from re-saving recent visits during SPA navigation
    try {
        const origSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function(key, value) {
            if (isRecentKey(key)) {
                return;
            }
            return origSetItem.apply(this, arguments);
        };

        const origGetItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function(key) {
            if (isRecentKey(key)) {
                return null;
            }
            return origGetItem.apply(this, arguments);
        };
    } catch (e) {}

    // 3. Inject CSS immediately to eliminate visual flicker and hide server-rendered / account-synced elements
    const CSS_RULES = `
        reddit-recent-pages,
        #recent-communities-section,
        faceplate-tracker[noun="recent_pages"],
        [id*="recent-communities"],
        [id*="recent-pages"] {
            display: none !important;
        }
    `;

    const injectStyle = () => {
        if (document.getElementById('erase-recent-subs-style')) return;
        const style = document.createElement('style');
        style.id = 'erase-recent-subs-style';
        style.textContent = CSS_RULES;
        (document.head || document.documentElement).appendChild(style);
    };

    injectStyle();

    // 4. Remove DOM elements as they are created or navigated to
    const SELECTORS = 'reddit-recent-pages, #recent-communities-section, faceplate-tracker[noun="recent_pages"]';

    const purgeDOMElements = () => {
        try {
            document.querySelectorAll(SELECTORS).forEach(el => el.remove());
        } catch (e) {}
    };

    // Watch for dynamically inserted elements
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.matches && node.matches(SELECTORS)) {
                        node.remove();
                    } else if (node.querySelector) {
                        node.querySelectorAll(SELECTORS).forEach(el => el.remove());
                    }
                }
            }
        }
    });

    const initObserver = () => {
        injectStyle();
        purgeDOMElements();
        clearRecentStorage();
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                injectStyle();
                purgeDOMElements();
                clearRecentStorage();
                if (document.body) {
                    observer.observe(document.body, { childList: true, subtree: true });
                }
            }, { once: true });
        }
    };

    initObserver();

    // 5. Handle Reddit SPA history navigation (pushState / replaceState / popstate)
    const handleNavigation = () => {
        clearRecentStorage();
        purgeDOMElements();
    };

    window.addEventListener('popstate', handleNavigation);

    try {
        const wrapHistory = (type) => {
            const orig = history[type];
            return function() {
                const result = orig.apply(this, arguments);
                handleNavigation();
                return result;
            };
        };
        history.pushState = wrapHistory('pushState');
        history.replaceState = wrapHistory('replaceState');
    } catch (e) {}
})();
