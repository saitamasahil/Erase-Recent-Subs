# Erase Recent Subs

A lightweight Tampermonkey userscript that removes Reddit's “Recent Subreddits” section by deleting its saved data from localStorage on every page load in new reddit tab. No timers, no loops — just clean browsing.

## ✨ Features

- Automatically erases the `recent-subreddits-store` from localStorage
- Runs once per page load — no performance impact
- Keeps Reddit sidebar minimal and private

## 🧠 How It Works

Reddit stores your recently visited subreddits in a localStorage key called `recent-subreddits-store`.  
This script simply removes that key once the page loads in the new reddit tab, preventing the list from appearing.

## 🛡 License

This userscript is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).
