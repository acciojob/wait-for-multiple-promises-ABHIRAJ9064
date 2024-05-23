document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('results');
    const loadingRow = table.rows[1]; // Row with Loading... text

    // Function to create a promise that resolves after a random time between 1 and 3 seconds
    function createPromise() {
        const randomTime = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 seconds
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(randomTime);
            }, randomTime * 1000);
        });
    }

    // Create an array of three promises
    const promises = [createPromise(), createPromise(), createPromise()];

    // Wait for all promises to resolve using Promise.all
    Promise.all(promises)
        .then((results) => {
            // Remove loading text
            table.deleteRow(1);

            // Populate table with results
            for (let i = 0; i < results.length; i++) {
                const row = table.insertRow(-1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = `Promise ${i + 1}`;
                cell2.textContent = `${results[i]}`;
            }

            // Calculate total time taken
            const totalTime = results.reduce((acc, curr) => acc + curr, 0);
            const totalRow = table.insertRow(-1);
            const totalCell1 = totalRow.insertCell(0);
            const totalCell2 = totalRow.insertCell(1);
            totalCell1.textContent = 'Total';
            totalCell2.textContent = `${totalTime.toFixed(3)}`;
        })
        .catch((error) => {
            console.error(error);
        });
});
