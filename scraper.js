const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://www.boxofficemojo.com/season/summer/2025/?ref_=bo_sl_table_1';

(async () => {
  try {
    const { data: html } = await axios.get(URL);
    const $ = cheerio.load(html);

    const results = {};

    // The table we're interested in appears to have this structure
    $('table a.a-link-normal').each((_, el) => {
      const row = $(el).closest('tr');
      const movieTitle = $(el).text().trim();

      // The gross is usually in the 5th cell of the row
      const grossCell = row.find('td').eq(4).text().trim();

      if (movieTitle && grossCell) {
        results[movieTitle] = grossCell;
      }
    });

    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error('Scraping failed:', err);
  }
})();
