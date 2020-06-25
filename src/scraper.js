const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const fs = require('fs');
const yargs = require('yargs');


function GetUrl() {
    const options = yargs
        .usage("Usage: -e <episode>")
        .option('e', { alias: 'episode', describe: 'series name followed by - s and season number, e and episode number. ie. supernatural-s15e13', type: 'string', demandOption: true})
        .argv;
    const episode = `https://legendei.to/${options.episode}`
    return episode;
}

async function getHTML(url) {
    const { data:html } = await axios.get(url);
    return html;
}

async function getSubtitleLink(html) {
    const $ = cheerio.load(html);
    const subtitleLink = $('.buttondown').attr('href');
    return subtitleLink
}

function GetFileName(url) {
    const fileName = url.replace('https://legendei.to/', '');
    return fileName.replace('/', '');
}

async function DownloadFile(link, fileName) {
    const file = fs.createWriteStream(`${fileName}.zip`);
    return https.get(link, function (response) {
        response.pipe(file)
    })
}



module.exports = { DownloadFile, getHTML, getSubtitleLink, GetUrl, GetFileName };
