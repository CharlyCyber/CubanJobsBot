const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

async function scrapeRevolico() {
    try {
        const response = await axios.get(config.scraping.urls.revolico, {
            headers: { 'User-Agent': config.scraping.userAgent }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        // Note: Selectors need to be verified against the actual site structure.
        // Using generic selectors based on common Revolico structure for now.
        $('li[data-cy="ad-row"]').each((i, el) => {
            const title = $(el).find('a[data-cy="ad-title"]').text().trim();
            const link = 'https://www.revolico.com' + $(el).find('a[data-cy="ad-title"]').attr('href');
            const description = $(el).find('div[data-cy="ad-description"]').text().trim(); // Hypothetical selector

            // Revolico dates are often relative strings like "hace 2 horas", needing parsing.
            // For simplicity in this initial version, we'll capture the raw string.
            const dateStr = $(el).find('time').text().trim();

            if (title && link) {
                jobs.push({
                    title,
                    description,
                    link,
                    date: dateStr, // Needs normalization in filter service if possible
                    source: 'Revolico'
                });
            }
        });

        return jobs;
    } catch (error) {
        console.error('Error scraping Revolico:', error.message);
        return [];
    }
}

module.exports = scrapeRevolico;
