const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');

let bot = null;

function initBot() {
    if (config.telegram.token) {
        bot = new TelegramBot(config.telegram.token, { polling: false }); // We use manual sending, polling handled by main loop or separate process if needed
        console.log('Telegram bot initialized.');
    } else {
        console.warn('Telegram token not found. Bot will not send messages.');
    }
}

async function sendJobOffer(job) {
    if (!bot || !config.telegram.chatId) {
        console.log('Skipping Telegram notification (Bot not init or Chat ID missing):', job.title);
        return;
    }

    const message = `
📋 *OFERTA LABORAL*
🔹 ${job.title}
🏢 Fuente: ${job.source}
📝 ${job.description.substring(0, config.filters.maxDescriptionLength)}...
🔗 [Ver oferta](${job.link})
  `.trim();

    try {
        await bot.sendMessage(config.telegram.chatId, message, { parse_mode: 'Markdown' });
        // Add a small delay to avoid hitting rate limits if sending many
        await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.error('Error sending message to Telegram:', error.message);
    }
}

module.exports = {
    initBot,
    sendJobOffer
};
