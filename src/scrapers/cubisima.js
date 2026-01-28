const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

// Helper to format location for Cubisima URL
function formatLocation(location) {
    if (!location) return 'cuba';
    return location
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/,/g, '')
        .replace(/\s+/g, '-');
}

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

        $('.card.job-listing').each((i, el) => {
            const id = $(el).attr('id');
            const title = $(el).find('.card-title').text().trim();
            const dateStr = $(el).find('.card-body p:first-child').text().trim();
            const location = $(el).find('.card-body p:nth-child(2)').text().trim();

            if (id && title) {
                const formattedLoc = formatLocation(location);
                // Pattern: https://www.cubisima.com/empleos/ofertas/[categoria]/[municipio-provincia]/[id]
                // We need to extract the category from the URL or mapping
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
