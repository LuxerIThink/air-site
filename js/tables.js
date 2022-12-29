var isheader = 0;

window.onload = function() {

};

function addData2Table(data) {
    if (isheader === 0) {
        generateHeader(data)
    }
    addRow(data)
}

function generateHeader(data) {
    var parentElement = document.getElementById("empty");
    parentElement.innerHTML = `<table id="table" class="table text-center mt-3"></table>` + parentElement.innerHTML;
    var table = document.getElementById("table");
    var header = table.createTHead();
    var hrow = header.insertRow(0);
    for (var key in data[0]) {
        var cell = hrow.insertCell(-1);
        cell.innerHTML = key;
        cell.setAttribute('scope', 'col');
        cell.style.fontWeight = 'bold';
    }
    var tbody = table.createTBody()
    tbody.id = "inner-table"
    isheader = 1;
}

function addRow(data) {
    var tbody = document.getElementById("inner-table");
    let row = tbody.insertRow(-1);
    for (let i = 0; i < data.length; i++) {
        let row = tbody.insertRow(-1);
        for (let key in data[i]) {
            let cell = row.insertCell(-1);
            let values = Object.values(data[i][key]);
            cell.innerHTML = values.join(' ');
        }
    }
}