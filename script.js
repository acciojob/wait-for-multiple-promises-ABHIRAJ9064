const tableBody = document.querySelector("#output");

// Create three Promises that resolve after a random time between 1 and 3 seconds
const promises = [
  new Promise((resolve) => setTimeout(() => resolve("Promise 1"), Math.floor(Math.random() * 3000) + 1000)),
  new Promise((resolve) => setTimeout(() => resolve("Promise 2"), Math.floor(Math.random() * 3000) + 1000)),
  new Promise((resolve) => setTimeout(() => resolve("Promise 3"), Math.floor(Math.random() * 3000) + 1000)),
];

// Add a row that spans 2 columns with the text "Loading..."
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.setAttribute("colspan", "2");
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
tableBody.appendChild(loadingRow);

// Use Promise.all to wait for all the Promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    tableBody.removeChild(loadingRow);

    // Create a row for each Promise result
    results.forEach((result) => {
      const row = document.createElement("tr");
      const promiseCell = document.createElement("td");
      const timeCell = document.createElement("td");
      promiseCell.textContent = result;
      timeCell.textContent = (new Date() - startTime) / 1000; // Calculate time taken in seconds
      row.appendChild(promiseCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });

    // Calculate total time taken and add a row for it
    const totalTimeRow = document.createElement("tr");
    const totalTimeCell = document.createElement("td");
    const totalDuration = (new Date() - startTime) / 1000;
    totalTimeCell.setAttribute("colspan", "2");
    totalTimeCell.textContent = `Total: ${totalDuration.toFixed(3)}s`;
    totalTimeRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalTimeRow);
  });

// Save start time for calculating time taken
const startTime = new Date();