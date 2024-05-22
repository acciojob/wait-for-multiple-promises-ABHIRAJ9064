//your JS code here. If required.
// Function to generate a random delay between 1 and 3 seconds
function randomDelay() {
  return Math.floor(Math.random() * 3) + 1;
}

// Function to create a Promise that resolves after a random delay
function createPromise(id) {
  return new Promise((resolve) => {
    const delay = randomDelay();
    setTimeout(() => {
      resolve({ id, delay });
    }, delay * 1000);
  });
}

// Array to hold the Promises
const promises = [];

// Create 3 promises
for (let i = 1; i <= 3; i++) {
  promises.push(createPromise(i));
}

// Add a row with "Loading..." text
const table = document.getElementById('myTable');
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.textContent = 'Loading...';
loadingCell.colSpan = 2;

// Wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading text row
    table.deleteRow(0);

    // Populate the table with the resolved values
    results.forEach((result) => {
      const row = table.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      cell1.textContent = 'Promise ' + result.id;
      cell2.textContent = result.delay;
    });

    // Calculate and add the total time taken
    const totalDelay = results.reduce((total, result) => total + result.delay, 0);
    const totalRow = table.insertRow();
    const totalCell1 = totalRow.insertCell();
    const totalCell2 = totalRow.insertCell();
    totalCell1.textContent = 'Total';
    totalCell2.textContent = totalDelay.toFixed(3);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
