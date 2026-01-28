const moment = require('moment');
const config = require('../config');

function filterJobs(jobs) {
    const uniqueJobs = new Map();
    const keywords = config.filters.keywords.map(k => k.toLowerCase().trim());

    console.log(`Filtering ${jobs.length} jobs with keywords: ${keywords.join(', ')}`);

    jobs.forEach(job => {
        const textToSearch = (job.title + ' ' + (job.description || '')).toLowerCase();
        const hasKeyword = keywords.some(keyword => textToSearch.includes(keyword));

        if (!hasKeyword) {
            // console.log(`Rejected (no keyword): ${job.title}`);
            return;
        }

        if (!uniqueJobs.has(job.link)) {
            uniqueJobs.set(job.link, job);
        }
    });

    console.log(`Filter result: ${uniqueJobs.size} unique jobs matched.`);
    return Array.from(uniqueJobs.values());
}

module.exports = {
    filterJobs
};
