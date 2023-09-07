const axios = require("axios");
const fs = require("fs");

// Google Books API base URL
const baseUrl = "https://www.googleapis.com/books/v1/volumes";

// Number of books to fetch
const numBooks = 1000;

// Maximum results per request
const maxResultsPerRequest = 40;

// List of search categories
const categories = [
    "fiction",
    "history",
    "science",
    "biography",
    "fantasy",
    "self-help",
    "mystery",
    "romance",
    "philosophy",
    "technology",
    "travel",
    "cooking",
    "health",
    "business",
    "art",
    "music",
    "sports",
    "religion",
    "comics",
    "science-fiction",
];

// Array to store book details
const bookDetails = [];

// Function to fetch books
async function fetchBooks(startIndex, category) {
    const params = {
        q: `subject:${category}`,
        startIndex: startIndex,
        maxResults: maxResultsPerRequest,
    };

    try {
        const response = await axios.get(baseUrl, { params });
        const data = response.data;

        if (data.items) {
            data.items.forEach((item) => {
                bookDetails.push(item.volumeInfo);
            });
        }
    } catch (error) {
        console.error(`Error fetching books for category '${category}':`, error.message);
    }
}

// Fetch all books for each category
async function fetchAllBooks() {
    var counter = 0;
    for (const category of categories) {
        for (let startIndex = 0; startIndex < numBooks; startIndex += maxResultsPerRequest) {
            await fetchBooks(startIndex, category);
            console.log(counter++);
        }
    }

    // Save book details to a JSON file
    const jsonData = JSON.stringify(bookDetails, null, 4);
    fs.writeFileSync("books.json", jsonData);

    console.log(`Total ${bookDetails.length} books fetched and saved to 'books.json'.`);
}

fetchAllBooks();


// https://openlibrary.org/search/authors.json?q=j%20k%20rowling
// https://openlibrary.org/authors/OL23919A.json

// key: AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA