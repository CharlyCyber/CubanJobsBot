const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

async function scrapeRevolico() {
    try {
        // Mimic a real browser more closely
        const response = await axios.get(config.scraping.urls.revolico, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0'
            }
        });

        const $ = cheerio.load(response.data);
        const jobs = [];

        // Selectors based on common Revolico structure
        // Using a more flexible approach to find listings
        $('li').each((i, el) => {
            const titleEl = $(el).find('h5, h2, a[data-cy="ad-title"]');
            const title = titleEl.text().trim();
            const link = titleEl.is('a') ? titleEl.attr('href') : titleEl.find('a').attr('href');

            if (title && link && (link.includes('/empleos/') || link.includes('/ofertas-de-empleo/'))) {
                jobs.push({
                    title,
                    description: $(el).find('p, span').first().text().trim(),
                    link: link.startsWith('http') ? link : `https://www.revolico.com${link}`,
                    date: new Date().toISOString(),
                    source: 'Revolico'
                });
            }
        });

        return jobs;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('❌ Revolico blocked access (403). Zapier might use specialized proxies or headless browsers.');
        } else {
            console.error('Error scraping Revolico:', error.message);
        }
        return [];
    }
}

module.exports = scrapeRevolico;
