#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

const Parser = require('rss-parser');
const parser = new Parser();
 
(async () => {
    const feed = await parser.parseURL('https://www.buzzfeed.com/index.xml');

    const numberToTake = process.argv[2] || 1;

    const allClickbaits = feed.items.map((link) => link.title);

    const selectedClickbaits = allClickbaits
        .sort(() => Math.random() - 0.5)
        .slice(0, numberToTake > allClickbaits.length ? allClickbaits.length : numberToTake);

    selectedClickbaits.forEach((clickbait) => console.log(clickbait));
})();