const { DownloadFile, getHTML, getSubtitleLink, GetUrl, GetFileName} = require('./src/scraper');

async function run() {
    try {
        const url = GetUrl();
        const fileName = GetFileName(url);
        const html = await getHTML(url)
        console.log(`>>> Downloading ${url.replace('.zip','')} subtitle from ${url}`);
        console.log('\n. . .\n');
        const link = await getSubtitleLink(html)
        await DownloadFile(link, fileName);
        console.log(`< Subtitle ${url.replace('.zip', '')} sucessfully downloaded.`);
    } catch (error) {
        console.log(error);
    }
}

run();
