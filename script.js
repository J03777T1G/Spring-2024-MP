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
        const table = document.getElementById('dataTable');
        table.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            const row = table.insertRow();
            for (let j = 0; j < data[i].length; j++) {
                const cell = row.insertCell();
                cell.textContent = data[i][j];
            }
        }
    }
});
