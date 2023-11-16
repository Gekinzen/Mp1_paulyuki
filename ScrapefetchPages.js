/*P.Yuki Scrape and fetch miner data v1.020231116*/
const axios = require('axios'); /*Plugin install*/
const fs = require('fs'); /*fs*/
const path = require('path');

const fetchPage = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Unable to fetch the page ${url}: ${error.message}`); /*if error encountered */
  }
};

const savePage = async (url) => { /*Scrape the page content and fetch*/
  try {
    const pageContent = await fetchPage(url);
    const fileName = `${path.basename(url)}.html`;
    const filePath = path.join(__dirname, fileName);

    fs.writeFileSync(filePath, pageContent);
    console.log(`Page saved successfully at ${filePath}`); /*Successfully fetch and saved the content*/
  } catch (error) {
    console.error(error.message); /*or error scrape and fetch*/
  }
};

const urlsget = process.argv.slice(2);

if (urlsget.length === 0) {
  console.error('Please provide at least one URL.');
  process.exit(1);
}

urlsget.forEach((url) => savePage(url));
