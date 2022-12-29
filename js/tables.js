var isheader = 0;

function getData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'link');
    xhr.onload = function() {
        if (xhr.status === 100) {
            const data = JSON.parse(xhr.response)
            console.log(data)
            addData2Table(data)
        } else {
            console.error(xhr.response);
        }
    };
}

function addData2Table(data) {
    if (isheader === 0) {
        generateHeader(data)
    }
    addRow(data)
}

function generateHeader(data) {
    const parentElement = document.getElementById('empty');
    const table = document.createElement('table');
    table.id = 'table';
    table.classList.add('table', 'text-center', 'mt-3');
    parentElement.appendChild(table);
    const header = table.createTHead();
    const hrow = header.insertRow(0);
    for (var key in data[0]) {
        let cell = hrow.insertCell(-1);
        cell.innerHTML = key;
        cell.setAttribute('scope', 'col');
        cell.style.fontWeight = 'bold';
    }
    const tbody = table.createTBody()
    tbody.id = "inner-table"
    isheader = 1;
}

function addRow(data) {
    const tbody = document.getElementById('inner-table');
    for (const object of data) {
        const row = tbody.insertRow(-1);
        for (const key in object) {
            const cell = row.insertCell(-1);
            const values = Object.values(object[key]);
            const text = values.join(' ');
            cell.innerHTML = text;
        }
    }
}