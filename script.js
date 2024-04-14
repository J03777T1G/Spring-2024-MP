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
        const dataTable = document.getElementById('dataTable');
        // Clear any existing data
        dataTable.innerHTML = '';

        // Create table element
        const table = document.createElement('table');
        table.classList.add('data-table');

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = Object.keys(data[0]);
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(rowData => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.textContent = rowData[header];
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Add table to the DOM under the appropriate section
        const section = document.getElementById('usageHistorySection');
        section.innerHTML = '';
        const header = document.createElement('h2');
        header.textContent = 'Usage History';
        section.appendChild(header);
        section.appendChild(table);
    }
});
