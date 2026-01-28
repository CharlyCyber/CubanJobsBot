require('dotenv').config();

module.exports = {
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  scraping: {
    userAgent: process.env.USER_AGENT || "Mozilla/5.0 (compatible; JobBot/1.0; +https://github.com/charliAI/CubanJobsBot)",
    requestDelay: parseInt(process.env.REQUEST_DELAY || '3', 10) * 1000,
    maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
    urls: {
      revolico: process.env.REVOLICO_URL || 'https://www.revolico.com/search?category=empleos&subcategory=ofertas-de-empleo',
      cubisima: {
        marketing: process.env.CUBISIMA_MARKETING_URL || 'https://www.cubisima.com/empleos/ofertas/marketing?categoriaestricta',
        design: process.env.CUBISIMA_DESIGN_URL || 'https://www.cubisima.com/empleos/ofertas/diseno?categoriaestricta',
        it: process.env.CUBISIMA_IT_URL || 'https://www.cubisima.com/empleos/ofertas/informatica-Cibernetica?categoriaestricta',
      },
      cucoders: process.env.CUCODERS_URL || 'https://cucoders.dev/empleos/',
    }
  },
  filters: {
    keywords: (process.env.KEYWORDS || 'inteligencia artificial,ia,ai,diseño,diseñador,ux,ui,redacción,redactor,content writer,copywriter,automatización,automation,marketing,informática').split(','),
    timeWindowHours: parseInt(process.env.TIME_WINDOW_HOURS || '48', 10),
    maxDescriptionLength: parseInt(process.env.MAX_DESCRIPTION_LENGTH || '150', 10),
  },
  monitoring: {
    enableLogging: process.env.ENABLE_LOGGING === 'true',
    logLevel: process.env.LOG_LEVEL || 'INFO',
  },
  development: {
    debugMode: process.env.DEBUG_MODE === 'true',
    testMode: process.env.TEST_MODE === 'true',
  }
};
