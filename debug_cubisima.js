const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
    const url = 'https://www.cubisima.com/empleos/ofertas/marketing?categoriaestricta';
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);
        const jobs = $('.card.job-listing');
        console.log(`Found ${jobs.length} job cards with Axios.`);
        if (jobs.length > 0) {
            console.log('First job title:', $(jobs[0]).find('.card-title').text().trim());
        } else {
            console.log('HTML snippet:', response.data.substring(0, 1000));
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

test();
