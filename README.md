# Erase Recent Subs

A lightweight Tampermonkey userscript that completely removes Reddit's **"Recent"** / **"Recent Subreddits"** sidebar section by clearing both modern and legacy storage keys, blocking re-saves during navigation, and hiding sidebar elements.

## ✨ Features

- **Modern Reddit (Shreddit) & Legacy Support:** Clears both `recent-page-store` (new) and `recent-subreddits-store` (legacy).
- **Prevents Re-saving:** Intercepts `Storage.setItem` to block Reddit from recording recent subreddits/posts as you browse.
- **Visual Removal:** Injects CSS rules at `document-start` to hide `<reddit-recent-pages>` and related containers without any visual flicker, even when synced to your account or rendered server-side.
- **SPA Navigation Aware:** Automatically cleans up storage and DOM elements on Single-Page Application (SPA) navigation (`pushState`, `popstate`).
- **Zero Lag:** Lightweight with no polling loops.

## 🔧 Installation

1. Install the **Tampermonkey** extension from [tampermonkey.net](https://www.tampermonkey.net/) if you haven’t already.

2. Visit the script page:

   👉 [Erase Recent Subs – GreasyFork](https://greasyfork.org/en/scripts/538163-erase-recent-subs-remove-recent-subreddits-section)

3. Click the **“Install this script”** button.

4. Done! The script will now automatically keep the "Recent" section gone as you browse Reddit.

## 🧠 How It Works

Reddit previously stored recently visited subreddits solely under the `recent-subreddits-store` localStorage key. In newer iterations of Reddit's interface ("shreddit"):
1. The storage key changed to `recent-page-store`.
2. Reddit dynamically writes to storage as you navigate across subreddits.
3. The `<reddit-recent-pages>` element can be rendered server-side or synced with your account.

This updated userscript handles all three: it wipes and intercepts the storage keys, injects CSS to hide the elements instantly without flicker, and observes DOM changes during client-side navigation.

## 🛡 License

This userscript is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).