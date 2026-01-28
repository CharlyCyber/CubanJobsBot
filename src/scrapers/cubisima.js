const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

function formatLocation(location) {
    if (!location) return 'cuba';
    return location
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except space/dash
        .trim()
        .replace(/\s+/g, '-');
}

async function scrapeCategory(url, categoryName) {
    console.log(`[Cubisima] Scraping category: ${categoryName} from ${url}`);
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);
        const jobs = [];

        // Try multiple selectors just in case
        const cards = $('.card.job-listing, [id*="!"]');
        console.log(`[Cubisima] Found ${cards.length} potential job cards in ${categoryName}`);

        cards.each((i, el) => {
            const id = $(el).attr('id');
            if (!id || !id.includes('!')) return;

            const title = $(el).find('.card-title').text().trim() || $(el).find('p').eq(1).text().trim();
            const dateStr = $(el).find('.card-body p:first-child').text().trim();
            const location = $(el).find('p').filter((i, p) => $(p).text().includes(',')).first().text().trim();

            if (title) {
                const formattedLoc = formatLocation(location);
                let categoryPath = 'marketing';
                if (url.includes('diseno')) categoryPath = 'diseno';
                if (url.includes('informatica')) categoryPath = 'informatica-Cibernetica';

                const link = `https://www.cubisima.com/empleos/ofertas/${categoryPath}/${formattedLoc}/${id}`;

                jobs.push({
                    title,
                    description: `Ubicación: ${location}`,
                    link,
                    date: dateStr,
                    source: `Cubisima (${categoryName})`
                });
            }
        });

        console.log(`[Cubisima] Successfully parsed ${jobs.length} jobs from ${categoryName}`);
        return jobs;
    } catch (error) {
        console.error(`[Cubisima] Error scraping ${categoryName}:`, error.message);
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
