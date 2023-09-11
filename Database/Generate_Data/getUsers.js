const axios = require('axios');
const fs = require('fs');

async function getUsers() {
  const users = [];

  // Fetch 100 user records
  for (let id = 1; id <= 100; id++) {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      users.push(response.data); // Assuming the response is JSON data
      console.log(`Fetched user with id ${id}`);
    } catch (error) {
      console.error(`Error fetching user with id ${id}: ${error.message}`);
    }
  }

  // Write the users to a JSON file
  const jsonData = JSON.stringify(users, null, 2);
  fs.writeFile('users.json', jsonData, (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
    } else {
      console.log('Users data has been written to users.json');
    }
  });
}

getUsers();
