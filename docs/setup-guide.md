# 🛠️ Guía de Configuración Detallada

## 1. Configuración del Bot de Telegram

### Crear el Bot
1. Abrir Telegram y buscar @BotFather
2. Enviar `/newbot`
3. Seguir las instrucciones:
   - Nombre del bot: `CubanJobsBot`
   - Username: `cubanmarketjobsbot`
4. Guardar el token proporcionado

### Configurar el Bot
```bash
# Comandos útiles para @BotFather
/setdescription - Bot que monitorea ofertas laborales cubanas
/setabouttext - Encuentra ofertas de IA, diseño y redacción
/setuserpic - Subir imagen del bot
Trigger: Telegram Bot - New Message
Filtro: Message Text exactly matches "Ofertas"
Configurar Actions
Action 1: - Run Python
Action 2-6: Webhooks - GET requests a sitios web
Action 7: - Process data
Action 8: Telegram Bot - Send Message
3. Testing y Debugging
Comandos de Prueba
# En Telegram:
Ofertas          # Comando principal
/start           # Iniciar bot
/help            # Ayuda
Logs 
Revisar Task History
Verificar errores en cada step
Monitorear usage limits


Cuban Job Offers Notifier