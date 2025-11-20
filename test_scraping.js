const https = require('https');

const url = "https://link.coupang.com/a/c6b54X";

function getFinalUrl(initialUrl) {
    return new Promise((resolve, reject) => {
        const req = https.get(initialUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Follow redirect
                let newUrl = res.headers.location;
                if (newUrl.startsWith('/')) {
                    const u = new URL(initialUrl);
                    newUrl = `${u.protocol}//${u.host}${newUrl}`;
                }
                console.log(`Redirecting to: ${newUrl}`);
                resolve(getFinalUrl(newUrl));
            } else {
                resolve({ url: initialUrl, res });
            }
        }).on('error', reject);
    });
}

getFinalUrl(url).then(({ url, res }) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log(`Final URL: ${url}`);
        console.log(`Status: ${res.statusCode}`);
        
        // Simple regex for og:image
        const ogImageMatch = data.match(/property="og:image"\s+content="([^"]+)"/);
        if (ogImageMatch) {
            console.log(`Found Image: ${ogImageMatch[1]}`);
        } else {
            console.log("Image not found in meta tags.");
            // Check for title to see if we are blocked
            const titleMatch = data.match(/<title>(.*?)<\/title>/);
            if (titleMatch) console.log(`Title: ${titleMatch[1]}`);
        }
    });
}).catch(err => console.error(err));

