import axios from 'axios';
import cheerio from 'cheerio';
import https from 'https';
import fs from 'fs';


function GetUrl() {
    const url = process.argv[2]
    return url;
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



export { DownloadFile, getHTML, getSubtitleLink, GetUrl, GetFileName };
