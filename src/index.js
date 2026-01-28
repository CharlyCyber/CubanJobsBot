const http = require('http');
const config = require('./config');
const scrapeRevolico = require('./scrapers/revolico');
const scrapeCubisima = require('./scrapers/cubisima');
const scrapeCuCoders = require('./scrapers/cucoders');
const { filterJobs } = require('./services/filterService');
const { initBot, sendAggregatedOffers, sendMessage } = require('./services/telegramService');

// Simple HTTP server for Render health checks
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('CubanJobsBot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌍 Health check server listening on port ${PORT}`);
});

async function runBotCycle(chatId) {
    console.log(`\n--- 🕒 Triggered cycle for chat ${chatId} at ${new Date().toLocaleString()} ---`);

    await sendMessage(chatId, '🔎 Buscando ofertas laborales actuales... por favor espera.');

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

        if (filteredJobs.length === 0) {
            await sendMessage(chatId, '📭 No se encontraron nuevas ofertas que coincidan con tus filtros en las últimas 48h.');
        } else {
            // Send all offers in aggregated messages
            await sendAggregatedOffers(chatId, filteredJobs);
        }

        console.log('🏁 Cycle completed.');

    } catch (error) {
        console.error('❌ Error in bot cycle:', error);
        await sendMessage(chatId, '❌ Ocurrió un error al buscar las ofertas. Inténtalo más tarde.');
    }
}

// Initialize bot with the callback
initBot(runBotCycle);

console.log('🤖 CubanJobsBot is active and waiting for "Ofertas" command...');
