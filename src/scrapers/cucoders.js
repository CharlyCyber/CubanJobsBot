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

        // CuCoders structure (hypothetical)
        $('.job-card').each((i, el) => {
            const title = $(el).find('.job-title').text().trim();
            const link = 'https://cucoders.dev' + $(el).find('a').attr('href');
            const description = $(el).find('.job-description').text().trim();
            const dateStr = $(el).find('.job-date').text().trim();

            if (title && link) {
                jobs.push({
                    title,
                    description,
                    link,
                    date: dateStr,
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
