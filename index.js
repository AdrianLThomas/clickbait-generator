#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

const cheerio = require('cheerio');
const got = require('got');

got('https://www.buzzfeed.com')
    .then((response) => {
        const numberToTake = process.argv[2] || 1;
        const $ = cheerio.load(response.body);
        const links = $('.link-gray');
        
        const allClickbaits = Array.from(links)
                                .map((link) => link.children[0].data);

        const selectedClickbaits = allClickbaits
            .sort(() => Math.random() - 0.5)
            .slice(0, numberToTake > allClickbaits.length ? allClickbaits.length : numberToTake);

        selectedClickbaits.forEach((clickbait) => console.log(clickbait));
    });
