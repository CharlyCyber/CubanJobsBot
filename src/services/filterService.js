const moment = require('moment');
const config = require('../config');

function filterJobs(jobs) {
    const uniqueJobs = new Map();
    const keywords = config.filters.keywords.map(k => k.toLowerCase().trim());

    // 48h Window: Today and Yesterday
    const threshold = moment().subtract(48, 'hours').startOf('day');

    console.log(`Filtering ${jobs.length} jobs. Threshold: ${threshold.format('YYYY-MM-DD')}`);

    jobs.forEach(job => {
        // 1. Date Filter (48h)
        const jobDate = moment(job.date, 'YYYY-MM-DD');
        if (!jobDate.isValid() || jobDate.isBefore(threshold)) {
            return;
        }

        // 2. Keyword Filter (including source/category)
        const textToSearch = (job.title + ' ' + (job.description || '') + ' ' + (job.source || '')).toLowerCase();
        const hasKeyword = keywords.some(keyword => textToSearch.includes(keyword));

        if (!hasKeyword) {
            return;
        }

        // 3. Deduplication
        if (!uniqueJobs.has(job.link)) {
            uniqueJobs.set(job.link, job);
        }
    });

    console.log(`Filter result: ${uniqueJobs.size} unique jobs matched in the last 48h.`);
    return Array.from(uniqueJobs.values());
}

module.exports = {
    filterJobs
};
