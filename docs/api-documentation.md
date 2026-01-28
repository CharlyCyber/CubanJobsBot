# 📡 Documentación de APIs

## 🤖 Telegram Bot API

### Configuración del Bot
```bash
# Crear bot con BotFather
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://hooks.automation.com/hooks/catch/xxxxx/yyyyy/"}'
Endpoints Utilizados
Send Message

POST https://api.telegram.org/bot<TOKEN>/sendMessage
Content-Type: application/json

{
  "chat_id": "5825608202",
  "text": "📋 OFERTAS LABORALES...",
  "parse_mode": "HTML",
  "disable_web_page_preview": false
}
Get Updates

GET https://api.telegram.org/bot<TOKEN>/getUpdates?offset=0&limit=100
🌐 Web Scraping Endpoints
1. Revolico.com

GET https://www.revolico.com/search?category=empleos&subcategory=ofertas-de-empleo
User-Agent: Mozilla/5.0 (compatible; JobBot/1.0)
Accept: text/html,application/xhtml+xml
Estructura de Respuesta:


<div class="item">
  <h3 class="title">Título del trabajo</h3>
  <div class="price">Salario</div>
  <div class="description">Descripción...</div>
  <a href="/item/slug-123456">Ver más</a>
</div>
2. Cubisima.com

GET https://www.cubisima.com/empleos/ofertas/marketing?categoriaestricta
User-Agent: Mozilla/5.0 (compatible; JobBot/1.0)
Accept: text/html,application/xhtml+xml
Estructura de Respuesta:


<div class="job-listing">
  <h2>Título del puesto</h2>
  <span class="company">Empresa</span>
  <span class="date">27/01/2026</span>
  <p class="description">Descripción del trabajo...</p>
</div>
3. CuCoders.dev

GET https://cucoders.dev/empleos/
User-Agent: Mozilla/5.0 (compatible; JobBot/1.0)
Accept: text/html,application/xhtml+xml
Estructura de Respuesta:


<article class="job-card">
  <h3 class="job-title">Desarrollador Full Stack</h3>
  <div class="job-meta">
    <span class="salary">$800 USD</span>
    <span class="type">Remoto</span>
    <span class="date">27/01/26</span>
  </div>
</article>
🔍 Selectores CSS Utilizados
Revolico.com

.item h3.title          /* Título del trabajo */
.item .price            /* Salario */
.item .description      /* Descripción */
.item a[href*="/item/"] /* Enlace */
Cubisima.com

.job-listing h2         /* Título */
.job-listing .company   /* Empresa */
.job-listing .date      /* Fecha */
.job-listing .description /* Descripción */
CuCoders.dev

.job-card .job-title    /* Título */
.job-card .salary       /* Salario */
.job-card .job-meta     /* Metadatos */
📋 Estructura de Datos
Job Object Schema

{
  "id": "string",
  "title": "string",
  "company": "string|null",
  "description": "string",
  "salary": "string|null",
  "location": "string|null",
  "type": "string", // "full-time", "part-time", "freelance"
  "remote": "boolean",
  "date_posted": "string", // ISO 8601
  "url": "string",
  "source": "string", // "revolico", "cubisima", "cucoders"
  "keywords_matched": ["string"]
}
Response Format

{
  "success": true,
  "timestamp": "2026-01-28T01:00:00Z",
  "total_jobs": 13,
  "filtered_jobs": 13,
  "sources": {
    "revolico": 7,
    "cubisima": 3,
    "cucoders": 3
  },
  "jobs": [
    {
      "id": "revolico_53143603",
      "title": "Administrador de Anuncios (Meta y Google)",
      "company": null,
      "description": "Para cliente en el exterior. Gestión de campañas...",
      "salary": "750 USD",
      "url": "https://www.revolico.com/item/...",
      "source": "revolico",
      "keywords_matched": ["marketing", "automatización"]
    }
  ]
}
🛡️ Rate Limiting y Headers
Recommended Headers

User-Agent: Mozilla/5.0 (compatible; JobBot/1.0; +https://github.com/user/cubanjobsbot)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: es-ES,es;q=0.8,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Cache-Control: no-cache
Rate Limits
Revolico: 1 request/5s
Cubisima: 1 request/3s
CuCoders: 1 request/2s
🔐 Authentication
Telegram Bot Token

TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
Automation Webhook URLs

WEBHOOK_TRIGGER=https://hooks.automation.com/hooks/catch/xxxxx/yyyyy/
WEBHOOK_ACTION=https://hooks.automation.com/hooks/catch/xxxxx/zzzzz/