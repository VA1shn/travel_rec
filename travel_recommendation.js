// script.js

// Function to fetch data from the JSON file
function fetchData() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Handle data, such as updating the content based on the fetched JSON
            console.log(data);

            // For example, you can loop through countries, cities, temples, beaches and log their details
            data.countries.forEach(country => {
                console.log(`Country: ${country.name}`);
                country.cities.forEach(city => {
                    console.log(`City: ${city.name}, Description: ${city.description}`);
                });
            });

            data.temples.forEach(temple => {
                console.log(`Temple: ${temple.name}, Description: ${temple.description}`);
            });

            data.beaches.forEach(beach => {
                console.log(`Beach: ${beach.name}, Description: ${beach.description}`);
            });

        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to handle search when the Search button is clicked
function search() {
    // Fetch user input from the search input field
    let searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Check for variations of keywords
    if (searchInput.includes('beach')) {
        // Display beach recommendations
        displayRecommendations('beaches');
    } else if (searchInput.includes('temple')) {
        // Display temple recommendations
        displayRecommendations('temples');
    } else if (searchInput.includes('country')) {
        // Display country recommendations
        displayRecommendations('countries');
    } else {
        // No match, display a message or handle as needed
        displayResults('No matching recommendations found.');
    }
}

function displayRecommendations(category) {
    // Fetch data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Get the specific category data
            const categoryData = data[category];

            // Get the container where recommendations will be displayed
            const recommendationsContainer = document.getElementById('recommendationsContainer');

            // Clear previous recommendations
            recommendationsContainer.innerHTML = '';

            // Loop through the category data and display recommendations
            categoryData.forEach(item => {
                const recommendationDiv = document.createElement('div');
    recommendationDiv.classList.add('recommendation');

    const titleElement = document.createElement('h2');
    titleElement.textContent = item.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = item.description;

    const imageElement = document.createElement('img');
    imageElement.src = item.imageUrl;
    imageElement.alt = item.name;
    imageElement.classList.add('recommendation-image');

                // Append elements to the recommendation div
                recommendationDiv.appendChild(titleElement);
                recommendationDiv.appendChild(descriptionElement);
                recommendationDiv.appendChild(imageElement);
            

                // Append the recommendation div to the container
                recommendationsContainer.appendChild(recommendationDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Function to display search results (replace this with your actual logic)
function displayResults(message) {
    console.log(message);
    // Update your webpage content based on the search results
}
function clearResults() {
    // Get the container where recommendations are displayed
    const recommendationsContainer = document.getElementById('recommendationsContainer');

    // Clear the container content
    recommendationsContainer.innerHTML = '';
}

// Function to clear the search input field
function clearSearch() {
    // Implement reset functionality here
    document.getElementById('searchInput').value = '';
    // Reset any search results or content updates
}

// Event listener for the Search button
document.getElementById('searchButton').addEventListener('click', search);
document.getElementById('clearButton').addEventListener('click', clearResults);
// Call the function to fetch data
fetchData();
