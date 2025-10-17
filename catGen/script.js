document.getElementById('generate-cat').addEventListener('click', getCatImage);

async function getCatImage() {
    const apiKey = 'live_8z19fvajb9a4xOKzGfxctFshBQ6kT7W8MLS9YBReGoMSnBFC6Zpeutqp1mx7YRUW';
    const url = 'https://api.thecatapi.com/v1/images/search?limit=1'; //put the search limit to 1 only so that only 1 random cat pic will appear each time the user clicks the button
    const catContainer = document.getElementById('cat-container');
    const catImageElement = document.getElementById('cat-image');

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

        // Update the image element with the new cat image
        catImageElement.src = catImageUrl;
        catImageElement.style.display = 'block'; // Make the image visible

    } catch (error) {
        console.error('Failed to fetch cat image:', error);
    }
}

