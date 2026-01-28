const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');

let bot = null;

function initBot(onOfertasReceived) {
    if (config.telegram.token) {
        bot = new TelegramBot(config.telegram.token, { polling: true });
        console.log('Telegram bot initialized with polling.');

        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text ? msg.text.toLowerCase().trim() : '';

            if (text === 'ofertas') {
                console.log(`📩 Received "Ofertas" command from chat ${chatId}`);
                onOfertasReceived(chatId);
            }
        });
    } else {
        console.warn('Telegram token not found. Bot will not start.');
    }
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

async function sendAggregatedOffers(chatId, jobs) {
    if (!bot) return;

    const dateStr = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    let header = `<b>OFERTAS LABORALES - ${dateStr}</b>\n\n`;
    let currentMessage = header;
    const MAX_LENGTH = 4000;

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        const title = escapeHTML(job.title);
        const company = escapeHTML(job.company || 'No especificada');
        const description = escapeHTML(job.description.substring(0, 200));
        const link = escapeHTML(job.link);

        const jobEntry = `🔹 <b>${title}</b>\n🏢 <b>Empresa:</b> ${company}\n📝 ${description}\n🔗 ${link}\n\n---\n\n`;

        if ((currentMessage + jobEntry).length > MAX_LENGTH) {
            await bot.sendMessage(chatId, currentMessage, { parse_mode: 'HTML', disable_web_page_preview: true });
            currentMessage = jobEntry;
        } else {
            currentMessage += jobEntry;
        }
    }

    if (currentMessage.length > 0) {
        // Remove the last separator
        if (currentMessage.endsWith('\n\n---\n\n')) {
            currentMessage = currentMessage.slice(0, -9);
        }
        await bot.sendMessage(chatId, currentMessage, { parse_mode: 'HTML', disable_web_page_preview: true });
    }
}

async function sendMessage(chatId, text) {
    if (!bot) return;
    try {
        await bot.sendMessage(chatId, text);
    } catch (error) {
        console.error('Error sending simple message:', error.message);
    }
}

module.exports = {
    initBot,
    sendAggregatedOffers,
    sendMessage
};
