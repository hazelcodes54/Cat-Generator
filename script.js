document.getElementById('generate-cat').addEventListener('click', getCatImage);

// Generate a cat image on page load
window.addEventListener('load', () => {
    setTimeout(getCatImage, 500); // Small delay for better UX
});

async function getCatImage() {
    const apiKey = 'live_8z19fvajb9a4xOKzGfxctFshBQ6kT7W8MLS9YBReGoMSnBFC6Zpeutqp1mx7YRUW';
    const url = 'https://api.thecatapi.com/v1/images/search?limit=1';
    const catContainer = document.getElementById('cat-container');
    const catImageElement = document.getElementById('cat-image');
    const loadingElement = document.getElementById('loading');
    const button = document.getElementById('generate-cat');

    // Show loading state
    loadingElement.style.display = 'block';
    catImageElement.style.display = 'none';
    button.disabled = true;
    button.style.opacity = '0.6';
    button.textContent = '🔄 Loading...';

    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const catImageUrl = data[0].url;

        // Preload the image to ensure smooth transition
        const img = new Image();
        img.onload = () => {
            // Hide loading and show image with animation
            loadingElement.style.display = 'none';
            catImageElement.src = catImageUrl;
            catImageElement.style.display = 'block';
            
            // Reset button state
            button.disabled = false;
            button.style.opacity = '1';
            button.textContent = '✨ Generate New Cat ✨';
        };
        
        img.onerror = () => {
            throw new Error('Failed to load cat image');
        };
        
        img.src = catImageUrl;

    } catch (error) {
        console.error('Failed to fetch cat image:', error);
        
        // Hide loading and reset button on error
        loadingElement.style.display = 'none';
        button.disabled = false;
        button.style.opacity = '1';
        button.textContent = '❌ Try Again';
        
        // Show error message
        setTimeout(() => {
            button.textContent = '✨ Generate New Cat ✨';
        }, 2000);
        
        // Optionally show a placeholder or error message to user
        catImageElement.style.display = 'none';
    }
}

