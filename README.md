# Erase Recent Subs

A lightweight Tampermonkey userscript that removes Reddit's “Recent Subreddits” section by deleting its saved data from localStorage every time you open a new Reddit tab or refresh the homepage. No timers, no loops — just clean browsing.

## ✨ Features

- Automatically erases the `recent-subreddits-store` from localStorage
- Runs once per page load — no performance impact
- Keeps the Reddit sidebar minimal and private

## 🔧 Installation

1. Install the **Tampermonkey** extension from [tampermonkey.net](https://www.tampermonkey.net/) if you haven’t already.

2. Visit the script page:

   👉 [Erase Recent Subs – GreasyFork](https://greasyfork.org/en/scripts/538163-erase-recent-subs-remove-recent-subreddits-section)

3. Click the **“Install this script”** button.

4. Done! The script will now automatically remove the "Recent Subreddits" section each time you open a new Reddit tab or refresh the homepage.

## 🧠 How It Works

Reddit stores your recently visited subreddits in a localStorage key called `recent-subreddits-store`.  
This script removes that key once the page loads, preventing the list from appearing — effective when opening a new Reddit tab or refreshing the homepage.

## 🛡 License

This userscript is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).