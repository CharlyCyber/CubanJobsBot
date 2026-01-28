const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

async function scrapeCategory(url, categoryName) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
            }
        });
        const $ = cheerio.load(response.data);
        const jobs = [];

        // Cubisima often uses specific patterns for job links
        // Looking for links that contain "oferta" and have a title-like text
        $('a').each((i, el) => {
            const title = $(el).text().trim();
            const link = $(el).attr('href');

            if (link && (link.includes('/empleos/oferta') || link.includes('!3.htm') || link.includes('!2.htm'))) {
                // Avoid generic links like "Publicar" or "Buscar"
                if (title && title.length > 10 && !title.includes('Publicar') && !title.includes('Buscar')) {
                    jobs.push({
                        title,
                        description: '',
                        link: link.startsWith('http') ? link : `https://www.cubisima.com${link}`,
                        date: new Date().toISOString(),
                        source: `Cubisima (${categoryName})`
                    });
                }
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
