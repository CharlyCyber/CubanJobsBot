const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

async function scrapeCuCoders() {
    try {
        const response = await axios.get(config.scraping.urls.cucoders, {
            headers: { 'User-Agent': config.scraping.userAgent }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        // Real CuCoders structure based on research
        $('a[href*="/empleos/202"]').each((i, el) => {
            const title = $(el).text().trim();
            const link = 'https://cucoders.dev' + $(el).attr('href');
            // Description is often in the next element or parent
            const description = $(el).closest('div').text().trim();

            if (title && title.length > 5 && link) {
                jobs.push({
                    title,
                    description,
                    link,
                    date: new Date().toISOString(), // CuCoders has date in URL usually
                    source: 'CuCoders'
                });
            }
        });

        return jobs;
    } catch (error) {
        console.error('Error scraping CuCoders:', error.message);
        return [];
    }
}

module.exports = scrapeCuCoders;
