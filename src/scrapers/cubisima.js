const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

async function scrapeCategory(url, categoryName) {
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': config.scraping.userAgent }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        // Cubisima structure (hypothetical, needs adjustment based on real site)
        $('.card-anuncio').each((i, el) => {
            const title = $(el).find('.titulo-anuncio').text().trim();
            const link = $(el).find('a').attr('href'); // Might be relative
            const description = $(el).find('.descripcion-anuncio').text().trim();
            const dateStr = $(el).find('.fecha').text().trim();

            if (title && link) {
                jobs.push({
                    title,
                    description,
                    link: link.startsWith('http') ? link : `https://www.cubisima.com${link}`,
                    date: dateStr,
                    source: `Cubisima (${categoryName})`
                });
            }
        });

        return jobs;
    } catch (error) {
        console.error(`Error scraping Cubisima ${categoryName}:`, error.message);
        return [];
    }
}

async function scrapeCubisima() {
    const marketingJobs = await scrapeCategory(config.scraping.urls.cubisima.marketing, 'Marketing');
    const designJobs = await scrapeCategory(config.scraping.urls.cubisima.design, 'Design');
    const itJobs = await scrapeCategory(config.scraping.urls.cubisima.it, 'IT');

    return [...marketingJobs, ...designJobs, ...itJobs];
}

module.exports = scrapeCubisima;
