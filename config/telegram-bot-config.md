# ⚙️ Configuración Avanzada del Bot de Telegram

## 🔧 Variables de Entorno

### Telegram Bot Configuration
```bash
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=5825608202
```

### Webhook Configuration
```bash
WEBHOOK_URL=https://tu-dominio.com/webhook
WEBHOOK_SECRET=tu_secreto_aqui
```

## 🎯 Personalización de Filtros

### Keywords Configuration
```json
{
  "keywords": [
    "inteligencia artificial", 
    "ia", 
    "ai",
    "diseño", 
    "diseñador", 
    "ux", 
    "ui",
    "redacción", 
    "redactor", 
    "content writer", 
    "copywriter",
    "automatización", 
    "automation",
    "marketing", 
    "informática"
  ],
  "timeframe": "48h",
  "sites": [
    "revolico.com", 
    "cubisima.com", 
    "cucoders.dev"
  ]
}
```

### Message Format
```json
{
  "message_template": {
    "header": "📋 OFERTAS LABORALES - {date}",
    "job_format": "🔹 {title}\n🏢 Empresa: {company}\n📝 {description}\n🔗 {url}",
    "footer": "---\nTotal: {total} ofertas encontradas",
    "no_jobs": "🔍 No se encontraron nuevas ofertas en las últimas 48 horas"
  }
}
```

## 🛡️ Configuración de Seguridad

### Rate Limiting
```json
{
  "rate_limiting": {
    "requests_per_minute": 10,
    "delay_between_requests": "6s",
    "max_daily_requests": 100
  }
}
```

### Error Handling
```json
{
  "error_handling": {
    "continue_on_error": true,
    "retry_attempts": 3,
    "retry_delay": "5s",
    "log_errors": true
  }
}
```

## 📊 Monitoreo y Analytics

### Metrics Configuration
```json
{
  "metrics": {
    "track_success_rate": true,
    "track_response_time": true,
    "track_error_types": true,
    "daily_report": true
  }
}
```

### Logging Configuration
```json
{
  "logging": {
    "level": "INFO",
    "format": "JSON",
    "file": "logs/bot.log",
    "max_size": "10MB",
    "backup_count": 5
  }
}
```

## 🌐 Site-Specific Configuration

### Revolico.com
```json
{
  "revolico": {
    "base_url": "https://www.revolico.com",
    "search_endpoint": "/search",
    "rate_limit": "1 request/5s",
    "selectors": {
      "title": ".item h3.title",
      "price": ".item .price",
      "description": ".item .description",
      "link": ".item a[href*='/item/']"
    }
  }
}
```

### Cubisima.com
```json
{
  "cubisima": {
    "base_url": "https://www.cubisima.com",
    "rate_limit": "1 request/3s",
    "categories": {
      "marketing": "/empleos/ofertas/marketing",
      "design": "/empleos/ofertas/diseno",
      "it": "/empleos/ofertas/informatica-Cibernetica"
    },
    "selectors": {
      "title": ".job-listing h2",
      "company": ".job-listing .company",
      "date": ".job-listing .date",
      "description": ".job-listing .description"
    }
  }
}
```

### CuCoders.dev
```json
{
  "cucoders": {
    "base_url": "https://cucoders.dev",
    "rate_limit": "1 request/2s",
    "endpoint": "/empleos/",
    "selectors": {
      "title": ".job-card .job-title",
      "salary": ".job-card .salary",
      "meta": ".job-card .job-meta"
    }
  }
}
```