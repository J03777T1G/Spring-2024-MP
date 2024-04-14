document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uploadLink').addEventListener('click', function() {
        document.getElementById('csvFileInput').click();
    });

    document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        Papa.parse(file, {
            complete: function(results) {
                displayData(results.data);
            }
        });
    }

    function displayData(data) {
        const table = document.createElement('table');
        for (let i = 0; i < data.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < data[i].length; j++) {
                const cell = document.createElement('td');
                cell.textContent = data[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        // Clear any existing data and add the new table to the DOM
        const section = document.getElementById('usageHistorySection');
        section.innerHTML = '';
        const header = document.createElement('h2');
        header.textContent = 'Usage History';
        section.appendChild(header);
        section.appendChild(table);
    }
});
