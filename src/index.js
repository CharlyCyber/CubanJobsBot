const config = require('./config');
const scrapeRevolico = require('./scrapers/revolico');
const scrapeCubisima = require('./scrapers/cubisima');
const scrapeCuCoders = require('./scrapers/cucoders');
const { filterJobs } = require('./services/filterService');
const { initBot, sendJobOffer } = require('./services/telegramService');

async function main() {
    console.log('🤖 CubanJobsBot started...');

    initBot();

    try {
        console.log('⏳ Scraping Revolico...');
        const revolicoJobs = await scrapeRevolico();

        console.log('⏳ Scraping Cubisima...');
        const cubisimaJobs = await scrapeCubisima();

        console.log('⏳ Scraping CuCoders...');
        const cucodersJobs = await scrapeCuCoders();

        const allJobs = [...revolicoJobs, ...cubisimaJobs, ...cucodersJobs];
        console.log(`✅ Found ${allJobs.length} total jobs.`);

        const filteredJobs = filterJobs(allJobs);
        console.log(`🎯 ${filteredJobs.length} jobs matched criteria.`);

        for (const job of filteredJobs) {
            await sendJobOffer(job);
        }

        console.log('🏁 Cycle completed.');

    } catch (error) {
        console.error('❌ specific error in main loop:', error);
    }
}

// Run immediately
main();

// Optional: Schedule to run every X hours if kept alive
// setInterval(main, config.monitoring.requestDelay * 1000); 
