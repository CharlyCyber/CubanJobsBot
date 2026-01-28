const moment = require('moment');
const config = require('../config');

function filterJobs(jobs) {
    const uniqueJobs = new Map();
    const now = moment();
    const keywords = config.filters.keywords.map(k => k.toLowerCase().trim());

    jobs.forEach(job => {
        // 1. Keyword Filter
        const textToSearch = (job.title + ' ' + job.description).toLowerCase();
        const hasKeyword = keywords.some(keyword => textToSearch.includes(keyword));

        if (!hasKeyword) return;

        // 2. Time Window Filter (Simple approximation if date parsing fails)
        // Ideally, scrapers should return ISO dates. Here we assume scrapers might return raw strings.
        // If date is "hace 2 horas", moment might need locale config or custom parsing.
        // For MVP, we'll trust the scraper's judgment or accept all if date parsing is complex.
        // TODO: Implement robust date parsing based on site formats.

        // 3. Deduplication
        // Use URL as unique identifier
        if (!uniqueJobs.has(job.link)) {
            uniqueJobs.set(job.link, job);
        }
    });

    return Array.from(uniqueJobs.values());
}

module.exports = {
    filterJobs
};
