# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a CubanJobsBot! Esta guía te ayudará a empezar.

## 🎯 Formas de Contribuir

### 🐛 Reportar Bugs
- Usar el template de issue para bugs
- Incluir pasos para reproducir
- Especificar versión del sistema
- Adjuntar screenshots si es posible

### ✨ Sugerir Features
- Usar el template de feature request
- Explicar el caso de uso
- Proporcionar mockups si es posible

### 🔧 Contribuir Código
- Fork el repositorio
- Crear rama descriptiva
- Seguir las convenciones de código
- Escribir tests
- Actualizar documentación

## 🚀 Proceso de Desarrollo

### 1. Setup del Entorno
```bash
# Clonar el repositorio
git clone https://github.com/charliAI/CubanJobsBot.git
cd CubanJobsBot

# Crear rama para tu feature
git checkout -b feature/nueva-funcionalidad
2. Configuración Local

# Copiar variables de entorno
cp .env.example .env

# Configurar tokens
TELEGRAM_BOT_TOKEN=tu_token_aqui
WEBHOOK_URL=tu_webhook_url
3. Testing

# Ejecutar tests
npm test

# Test específico
npm test -- --grep "filtrado de ofertas"

# Coverage
npm run coverage
📋 Convenciones
Git Commits
feat: agregar soporte para nuevo sitio web
fix: corregir filtrado de fechas
docs: actualizar README con nuevas instrucciones
style: mejorar formato de mensajes
refactor: optimizar scraping de Revolico
test: agregar tests para filtros
chore: actualizar dependencias
Branches
main                    # Rama principal
develop                 # Desarrollo activo
feature/nombre-feature  # Nuevas funcionalidades
hotfix/nombre-fix      # Correcciones urgentes
release/v1.1.0         # Preparación de releases
Code Style

// Usar camelCase para variables
const jobTitle = "Desarrollador Full Stack";

// Usar PascalCase para clases
class JobScraper {
  constructor() {}
}

// Usar UPPER_CASE para constantes
const MAX_JOBS_PER_SITE = 50;
🧪 Testing Guidelines
Unit Tests

def test_filter_by_keywords():
    job = {
        'title': 'Diseñador UX/UI',
        'description': 'Buscamos diseñador con experiencia'
    }
    result = filter_job_by_keywords(job)
    assert result == True

def test_filter_by_date():
    job = {'date': '27/01/2026'}
    result = filter_job_by_date(job, hours=48)
    assert result == True
Integration Tests

def test_full_workflow():
    # Simular trigger de Telegram
    trigger_data = {'message': 'Ofertas'}
    
    # Ejecutar workflow completo
    result = run_workflow(trigger_data)
    
    # Verificar resultado
    assert 'ofertas encontradas' in result['message']
    assert len(result['jobs']) > 0
📚 Documentación
Actualizar README
Mantener ejemplos actualizados
Documentar nuevas features
Actualizar screenshots
API Documentation
Documentar nuevos endpoints
Incluir ejemplos de request/response
Actualizar schemas
Changelog

## [1.1.0] - 2026-02-01
### Added
- Soporte para nuevo sitio web XYZ
- Filtro por tipo de contrato
- Notificaciones push

### Changed
- Mejorado algoritmo de filtrado
- Optimizado tiempo de respuesta

### Fixed
- Corregido bug en parsing de fechas
- Solucionado problema con caracteres especiales
🎨 Nuevos Sitios Web
Agregar Nuevo Sitio
Investigar estructura HTML

curl -s "https://nuevo-sitio.com/empleos" | grep -A5 -B5 "job-title"
Crear scraper

def scrape_nuevo_sitio():
    url = "https://nuevo-sitio.com/empleos"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    jobs = []
    for job_element in soup.select('.job-listing'):
        job = {
            'title': job_element.select_one('.title').text.strip(),
            'company': job_element.select_one('.company').text.strip(),
            'url': urljoin(url, job_element.select_one('a')['href'])
        }
        jobs.append(job)
    
    return jobs
Agregar a workflow

{
  "id": "scrape_nuevo_sitio",
  "app": "webhooks",
  "action": "get",
  "config": {
    "url": "https://nuevo-sitio.com/empleos"
  }
}
Actualizar tests

def test_nuevo_sitio_scraping():
    jobs = scrape_nuevo_sitio()
    assert len(jobs) > 0
    assert 'title' in jobs[0]
    assert 'url' in jobs[0]
🔍 Nuevos Filtros
Agregar Filtro por Salario

def filter_by_salary(job, min_salary=None, max_salary=None):
    salary_text = job.get('salary', '').lower()
    
    # Extraer números del texto de salario
    numbers = re.findall(r'\d+', salary_text)
    if not numbers:
        return True  # Incluir si no hay info de salario
    
    salary = int(numbers[0])
    
    if min_salary and salary < min_salary:
        return False
    if max_salary and salary > max_salary:
        return False
    
    return True
Agregar Filtro por Ubicación

def filter_by_location(job, allowed_locations):
    location = job.get('location', '').lower()
    return any(loc.lower() in location for loc in allowed_locations)
🚨 Issues y Pull Requests
Template de Issue

**Tipo de Issue:** Bug / Feature Request / Pregunta

**Descripción:**
Descripción clara del problema o feature solicitado.

**Pasos para Reproducir:** (solo para bugs)
1. Ir a...
2. Hacer clic en...
3. Ver error...

**Comportamiento Esperado:**
Lo que debería pasar.

**Comportamiento Actual:**
Lo que está pasando.

**Screenshots:**
Si aplica, agregar screenshots.

**Entorno:**
- Versión del Bot: [v1.0.0]
- Navegador: [Chrome/Firefox/Safari]
Template de Pull Request

**Descripción:**
Breve descripción de los cambios realizados.

**Tipo de Cambio:**
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

**Testing:**
- [ ] Tests pasan localmente
- [ ] Agregué nuevos tests
- [ ] Actualicé documentación

**Checklist:**
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He realizado self-review de mi código
- [ ] He comentado código complejo
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban mi fix/feature
- [ ] Tests nuevos y existentes pasan localmente
🏆 Reconocimientos
Contributors
Todos los contributors serán listados en el README principal.

Hall of Fame
Mejor Bug Report: @usuario1
Mejor Feature: @usuario2
Mejor Documentación: @usuario3
📞 Contacto
GitHub Issues: Para bugs y features
Telegram: @charliAI para preguntas rápidas
Email: charlyia2026@gmail.com para temas privados
¡Gracias por contribuir a CubanJobsBot! 🚀