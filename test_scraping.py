import requests
from bs4 import BeautifulSoup

url = "https://link.coupang.com/a/c6b54X"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

try:
    # Allow redirects
    response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
    print(f"Status Code: {response.status_code}")
    print(f"Final URL: {response.url}")
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Try to find og:image
    og_image = soup.find("meta", property="og:image")
    if og_image:
        print(f"Found og:image: {og_image['content']}")
    else:
        print("og:image not found")
        # Check if it's a challenge page or access denied
        if "Access Denied" in response.text or "Access Denied" in soup.title.string:
             print("Access Denied")
        
except Exception as e:
    print(f"Error: {e}")

