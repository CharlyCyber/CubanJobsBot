# 🚀 Guía de Despliegue

## 📋 Pre-requisitos

### Cuentas Necesarias
- [x] Cuenta de GitHub
- [x] Bot de Telegram creado
- [x] Tokens y credenciales configurados
- [x] Cuenta de Render (o similar para deployment)

### Herramientas Requeridas
```bash
# Git
git --version

# Node.js (opcional, para desarrollo local)
node --version
npm --version

# Render CLI (opcional)
npm install -g render-cli
🔧 Configuración Inicial
1. Clonar Repositorio

git clone https://github.com/charliAI/CubanJobsBot.git
cd CubanJobsBot
2. Configurar Variables de Entorno

# Copiar template
cp .env.example .env

# Editar con tus valores
nano .env
3. Crear Bot de Telegram

# 1. Hablar con @BotFather en Telegram
# 2. Ejecutar: /newbot
# 3. Seguir instrucciones
# 4. Guardar token en .env
⚙️ Configuración del Proyecto
Método 1: Usar Configuración Existente (Recomendado)

# 1. Ir al repositorio clonado
# 2. Revisar config/workflow.json
# 3. Configurar credenciales en .env
# 4. Personalizar filtros si es necesario
Método 2: Configuración Personalizada

# Modificar config/workflow.json
# Ajustar keywords en config/telegram-bot-config.md
# Personalizar selectores CSS si los sitios cambian
🧪 Testing Pre-Despliegue
Test Local

# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Test de conectividad
npm run test:connectivity
Test de Webhooks

# Test individual de cada endpoint
# 1. Ir a terminal
# 2. Probar cada sitio
# 3. Verificar responses
Test End-to-End

# En Telegram, enviar:
Ofertas

# Verificar:
# - Trigger activado ✅
# - Scraping exitoso ✅  
# - Filtrado correcto ✅
# - Mensaje enviado ✅
🌐 Despliegue en Producción
1. Preparar Repositorio

# Agregar cambios si hay modificaciones
git add .
git commit -m "Ready for deployment"
git push origin main
2. Configurar Render

# 1. Crear cuenta en render.com
# 2. Conectar repositorio GitHub
# 3. Configurar servicio web
# 4. Establecer variables de entorno
# 5. Deploy!
3. Configurar Webhook de Telegram

curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://tu-app.render.com/webhook"}'
4. Monitoreo Inicial

# Verificar logs en Render
# Monitorear primeras ejecuciones
# Revisar error rates
# Confirmar funcionamiento
📊 Monitoreo y Mantenimiento
Métricas Clave

# Success Rate: >95%
# Response Time: <30s
# Error Rate: <5%
# Usage: <80% del límite mensual
Alertas Recomendadas

{
  "alerts": [
    {
      "metric": "error_rate",
      "threshold": "10%",
      "action": "email_notification"
    },
    {
      "metric": "response_time", 
      "threshold": "45s",
      "action": "slack_notification"
    },
    {
      "metric": "usage_limit",
      "threshold": "80%",
      "action": "upgrade_plan"
    }
  ]
}
Logs y Debugging

# Render Logs
# - Revisar ejecuciones fallidas
# - Identificar patrones de error
# - Optimizar performance

# Telegram Bot Logs
curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
🔄 Actualizaciones
Actualizar Workflow

# 1. Hacer cambios en repositorio
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# 2. Render hace deploy automático
# - Actualiza servicio
# - Aplica cambios
# - Reinicia si es necesario
Rollback

# Si algo falla:
# 1. Revertir commit
git revert HEAD
git push origin main

# 2. Render hace deploy automático
# 3. Verificar funcionamiento
🚨 Troubleshooting
Problemas Comunes
Bot no responde

# Verificar:
# 1. App corriendo en Render ✅
# 2. Webhook configurado correctamente ✅
# 3. Bot token válido ✅
# 4. URL accesible ✅
Scraping falla

# Verificar:
# 1. URLs accesibles ✅
# 2. Rate limits respetados ✅
# 3. User-Agent correcto ✅
# 4. Selectores CSS válidos ✅
Filtros no funcionan

# Verificar:
# 1. Keywords actualizadas ✅
# 2. Lógica de fechas correcta ✅
# 3. Formato de datos consistente ✅
Comandos de Diagnóstico

# Test conectividad sitios
curl -I https://www.revolico.com
curl -I https://www.cubisima.com  
curl -I https://cucoders.dev

# Test bot Telegram
curl "https://api.telegram.org/bot<TOKEN>/getMe"

# Test webhook
curl -X POST "https://tu-app.render.com/webhook/test"
📈 Escalabilidad
Optimizaciones

# 1. Implementar cache
# 2. Paralelizar requests
# 3. Optimizar selectores CSS
# 4. Reducir payload de datos
Límites de Render

# Free: 750 hours/mes
# Starter: $7/mes
# Standard: $25/mes
# Pro: $100/mes
Alternativas de Escalado

# 1. Usar Redis para cache
# 2. Implementar cola de tareas
# 3. Usar CDN para assets
# 4. Migrar a plan superior de Render
🔐 Seguridad
HTTPS y Certificados

# Render proporciona HTTPS automático
# Certificados SSL renovados automáticamente
# Forzar HTTPS en todas las requests
Environment Variables

# Usar variables de entorno en Render
# Nunca commitear .env
# Rotar tokens periódicamente
Rate Limiting

# Implementar rate limiting a nivel de aplicación
# Proteger contra abuse
# Monitor usage spikes