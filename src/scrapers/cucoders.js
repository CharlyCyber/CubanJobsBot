const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');
const moment = require('moment');

async function scrapeCuCoders() {
    try {
        const response = await axios.get(config.scraping.urls.cucoders, {
            headers: { 'User-Agent': config.scraping.userAgent }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        // CuCoders structure: links contain dates like /empleos/YYYY-MM-DD/...
        $('a[href*="/empleos/202"]').each((i, el) => {
            const title = $(el).text().trim();
            const href = $(el).attr('href');
            const link = 'https://cucoders.dev' + href;

            // Extract date from URL: /empleos/2026-01-27/...
            const dateMatch = href.match(/\/empleos\/(\d{4}-\d{2}-\d{2})\//);
            const date = dateMatch ? dateMatch[1] : moment().format('YYYY-MM-DD');

            const container = $(el).closest('div, li');
            const description = container.find('p, .job-description').first().text().trim() || 'Ver detalles en el enlace.';
            const company = 'No especificada';

            if (title && title.length > 5 && link) {
                jobs.push({
                    title,
                    company,
                    description,
                    link,
                    date, // ISO format YYYY-MM-DD
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
