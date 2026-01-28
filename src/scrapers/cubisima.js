const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');
const moment = require('moment');

function formatLocation(location) {
    if (!location) return 'cuba';
    return location
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
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
            if (!id || !id.includes('!')) return;

            const title = $(el).find('.card-title').text().trim();
            const company = $(el).find('strong').text().trim() || 'No especificada';
            const dateText = $(el).find('.card-body p:first-child').text().trim(); // Format: DD/MM/YYYY
            const location = $(el).find('p').filter((i, p) => $(p).text().includes(',')).first().text().trim();

            // Parse date DD/MM/YYYY to YYYY-MM-DD
            let date = moment().format('YYYY-MM-DD');
            const dateMatch = dateText.match(/(\d{2})\/(\d{2})\/(\d{4})/);
            if (dateMatch) {
                date = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
            }

            const description = `Oferta en ${categoryName}. Ubicación: ${location}.`;

            if (title) {
                const formattedLoc = formatLocation(location);
                let categoryPath = 'marketing';
                if (url.includes('diseno')) categoryPath = 'diseno';
                if (url.includes('informatica')) categoryPath = 'informatica-Cibernetica';

                const link = `https://www.cubisima.com/empleos/ofertas/${categoryPath}/${formattedLoc}/${id}`;

                jobs.push({
                    title,
                    company,
                    description,
                    link,
                    date,
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
