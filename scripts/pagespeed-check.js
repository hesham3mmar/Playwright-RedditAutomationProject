import fetch from 'node-fetch';

const apiKey = 'YOUR_API_KEY_HERE'; 
const url = 'https://www.reddit.com';

async function checkPageSpeed() {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const score = data.lighthouseResult.categories.performance.score * 100;
    console.log(`PageSpeed score for ${url}: ${score}`);
    
    if (score < 40) {
        console.error('PageSpeed score is below acceptable threshold!');
        process.exit(1);  // Exit with error code to fail CI/CD job
    }
}

checkPageSpeed();