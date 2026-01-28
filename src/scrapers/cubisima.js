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

        // Real Cubisima structure based on research
        $('a').each((i, el) => {
            const title = $(el).text().trim();
            const link = $(el).attr('href');

            if (title && title.length > 10 && link && (link.includes('ofertas') || link.includes('empleos'))) {
                jobs.push({
                    title,
                    description: '',
                    link: link.startsWith('http') ? link : `https://www.cubisima.com${link}`,
                    date: new Date().toISOString(),
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
