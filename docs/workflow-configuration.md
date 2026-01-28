# ⚙️ Configuración Completa 

## 🎯 Workflow Overview

**Nombre:** CubanJobsBot - Job Scraper
**Trigger:** Telegram Bot - New Message
**Total Actions:** 8 pasos

## 📋 Configuración Paso a Paso

### Step 1: Trigger - Telegram Bot
```json
{
  "app": "Telegram Bot",
  "event": "New Message",
  "account": "CubanmarketJobs Bot",
  "settings": {
    "chat_id": "5825608202",
    "message_filter": "Ofertas"
  }
}
Step 2: Webhooks - Scrape Revolico

{
  "app": "Webhooks",
  "event": "GET",
  "url": "https://www.revolico.com/search?category=empleos&subcategory=ofertas-de-empleo",
  "headers": {
    "User-Agent": "Mozilla/5.0 (compatible; JobBot/1.0)"
  },
  "method": "GET"
}
Step 3: Webhooks - Scrape Cubisima Marketing

{
  "app": "Webhooks",
  "event": "GET", 
  "url": "https://www.cubisima.com/empleos/ofertas/marketing?categoriaestricta",
  "headers": {
    "User-Agent": "Mozilla/5.0 (compatible; JobBot/1.0)"
  }
}
Step 4: Webhooks - Scrape Cubisima Diseño

{
  "app": "Webhooks",
  "event": "GET",
  "url": "https://www.cubisima.com/empleos/ofertas/diseno?categoriaestricta",
  "headers": {
    "User-Agent": "Mozilla/5.0 (compatible; JobBot/1.0)"
  }
}
Step 5: Webhooks - Scrape Cubisima Informática

{
  "app": "Webhooks",
  "event": "GET",
  "url": "https://www.cubisima.com/empleos/ofertas/informatica-Cibernetica?categoriaestricta",
  "headers": {
    "User-Agent": "Mozilla/5.0 (compatible; JobBot/1.0)"
  }
}
Step 6: Webhooks - Scrape CuCoders

{
  "app": "Webhooks",
  "event": "GET",
  "url": "https://cucoders.dev/empleos/",
  "headers": {
    "User-Agent": "Mozilla/5.0 (compatible; JobBot/1.0)"
  }
}
Step 7: Code by Automation - Process Data

# Código Python para procesar y filtrar ofertas
import re
from datetime import datetime, timedelta

def filter_jobs(data):
    keywords = [
        'inteligencia artificial', 'ia', 'ai',
        'diseño', 'diseñador', 'ux', 'ui',
        'redacción', 'redactor', 'content writer', 'copywriter',
        'automatización', 'automation', 'marketing', 'informática'
    ]
    
    # Filtrar por fecha (últimas 48 horas)
    cutoff_date = datetime.now() - timedelta(hours=48)
    
    filtered_jobs = []
    
    for job in data:
        # Verificar palabras clave
        job_text = (job.get('title', '') + ' ' + job.get('description', '')).lower()
        
        if any(keyword in job_text for keyword in keywords):
            # Verificar fecha
            job_date = datetime.strptime(job.get('date'), '%d/%m/%Y')
            if job_date >= cutoff_date:
                filtered_jobs.append(job)
    
    return filtered_jobs

# Input data from previous steps
revolico_data = input_data.get('step_2_data')
cubisima_marketing = input_data.get('step_3_data')
cubisima_design = input_data.get('step_4_data')
cubisima_it = input_data.get('step_5_data')
cucoders_data = input_data.get('step_6_data')

# Process and filter all data
all_jobs = []
all_jobs.extend(filter_jobs(revolico_data))
all_jobs.extend(filter_jobs(cubisima_marketing))
all_jobs.extend(filter_jobs(cubisima_design))
all_jobs.extend(filter_jobs(cubisima_it))
all_jobs.extend(filter_jobs(cucoders_data))

# Remove duplicates
unique_jobs = []
seen_titles = set()

for job in all_jobs:
    if job['title'] not in seen_titles:
        unique_jobs.append(job)
        seen_titles.add(job['title'])

# Sort by date (newest first)
unique_jobs.sort(key=lambda x: datetime.strptime(x['date'], '%d/%m/%Y'), reverse=True)

output = {
    'filtered_jobs': unique_jobs,
    'total_count': len(unique_jobs)
}
Step 8: Telegram Bot - Send Message

{
  "app": "Telegram Bot",
  "event": "Send Message",
  "chat_id": "{{trigger.chat.id}}",
  "message_text": "{{step_7.formatted_message}}",
  "parse_mode": "HTML"
}
🔧 Configuraciones Avanzadas
Error Handling

{
  "error_handling": {
    "continue_on_error": true,
    "retry_attempts": 3,
    "retry_delay": "5s"
  }
}
Rate Limiting

{
  "rate_limiting": {
    "requests_per_minute": 10,
    "delay_between_requests": "6s"
  }
}
Filters y Conditions

{
  "filters": [
    {
      "field": "message_text",
      "condition": "exactly_matches",
      "value": "Ofertas"
    },
    {
      "field": "chat_type", 
      "condition": "is",
      "value": "private"
    }
  ]
}
📊 Monitoring y Analytics
Task History Tracking
Monitorear success rate
Identificar errores comunes
Optimizar performance
Usage Limits
Plan Starter: 100 tasks/mes
Plan Professional: 1,000 tasks/mes
Plan Team: 2,000 tasks/mes
Alertas Recomendadas

{
  "alerts": [
    {
      "type": "error_rate",
      "threshold": "10%",
      "notification": "email"
    },
    {
      "type": "usage_limit",
      "threshold": "80%",
      "notification": "slack"
    }
  ]
}