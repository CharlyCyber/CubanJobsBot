const http = require('http');
const config = require('./config');
const scrapeRevolico = require('./scrapers/revolico');
const scrapeCubisima = require('./scrapers/cubisima');
const scrapeCuCoders = require('./scrapers/cucoders');
const { filterJobs } = require('./services/filterService');
const { initBot, sendJobOffer } = require('./services/telegramService');

// Simple HTTP server for Render health checks
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('CubanJobsBot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌍 Health check server listening on port ${PORT}`);
});

async function runBotCycle() {
    console.log(`\n--- 🕒 Starting bot cycle at ${new Date().toLocaleString()} ---`);

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
        console.error('❌ Error in bot cycle:', error);
    }
}

// Initialize bot
initBot();

// Run immediately on start
runBotCycle();

// Schedule to run every X minutes (default 30 min if not set)
const intervalMinutes = parseInt(process.env.POLLING_INTERVAL_MINUTES || '30', 10);
setInterval(runBotCycle, intervalMinutes * 60 * 1000);
