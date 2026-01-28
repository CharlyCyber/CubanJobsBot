# 🤖 CubanJobsBot

Bot automatizado de Telegram que monitorea ofertas laborales en sitios web cubanos y envía notificaciones filtradas sobre oportunidades en IA, diseño, redacción y automatización.

## 🎯 Características

- ✅ Monitoreo automático de 5 sitios web cubanos
- ✅ Filtrado inteligente por palabras clave
- ✅ Ofertas de las últimas 48 horas
- ✅ Notificaciones estructuradas en Telegram
- ✅ Eliminación de duplicados
- ✅ Enlaces directos a las ofertas

## 🌐 Sitios Monitoreados

1. **Revolico.com** - Ofertas de empleo generales
2. **Cubisima.com** - Marketing, Diseño e Informática
3. **CuCoders.dev** - Empleos para programadores

## 🔍 Filtros de Búsqueda

**Palabras clave monitoreadas:**
- Inteligencia artificial, IA, AI
- Diseño, diseñador, UX, UI
- Redacción, redactor, content writer, copywriter
- Automatización, automation
- Marketing, informática


# En Telegram, enviar:
Ofertas
📊 Flujo de Trabajo

graph TD
    A[Usuario envía "Ofertas"] --> B[Trigger Telegram]
    B --> C[Scraping Revolico.com]
    C --> D[Scraping Cubisima.com]
    D --> E[Scraping CuCoders.dev]
    E --> F[Filtrar por palabras clave]
    F --> G[Filtrar por fecha 48h]
    G --> H[Eliminar duplicados]
    H --> I[Formatear mensaje]
    I --> J[Enviar a Telegram]
🛠️ Tecnologías Utilizadas
Telegram Bot API - Interfaz de usuario
Web Scraping - Extracción de datos
Webhooks - Procesamiento de datos
📋 Formato de Salida
📋 OFERTAS LABORALES - [Fecha]

🔹 [Título del Trabajo]
🏢 Empresa: [Nombre de la Empresa]
📝 [Descripción breve - máx 150 caracteres]
🔗 [Enlace directo]

---

Total: X ofertas encontradas
🔧 Configuración Avanzada
Variables de Entorno

TELEGRAM_BOT_TOKEN=tu_token_aqui
Personalización de Filtros
Custom Request:


{
  "keywords": ["IA", "diseño", "redacción", "automatización"],
  "timeframe": "48h",
  "sites": ["revolico.com", "cubisima.com", "cucoders.dev"]
}
📈 Estadísticas de Uso
Sitios monitoreados: 5
Ofertas procesadas: ~50-100 diarias
Filtros aplicados: 8 categorías
Tiempo de respuesta: <30 segundos
🤝 Contribuir
Fork el proyecto
Crear una rama para tu feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abrir un Pull Request
📝 Changelog
v1.0.0 (2026-01-28)
✅ Implementación inicial
✅ Monitoreo de 5 sitios web
✅ Filtrado por palabras clave
✅ Integración con Telegram
📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

👥 Autores
Charly Rodriguez - @charliAI
🙏 Agradecimientos
Comunidad cubana de desarrolladores
Sitios web que proporcionan las ofertas laborales
⭐ Si este proyecto te resulta útil, ¡dale una estrella!