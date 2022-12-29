window.onload = function() {
    // przykładowe dane w formacie JSON
    var data = [{ "temperature": { "value": 0.65, "unit": "C" }, "pressure": { "value": 988.25, "unit": "hPa" }, "humidity": { "value": 12.27, "unit": "%" }, "roll": { "value": -0.19, "unit": "deg" }, "pitch": { "value": -0.19, "unit": "deg" }, "yaw": { "value": -0.19, "unit": "deg" }, "joystick": { "timestamp": 537, "direction": "up", "action": "pressed" } }, { "temperature": { "value": 0.45, "unit": "C" }, "pressure": { "value": 998.25, "unit": "hPa" }, "humidity": { "value": 15.27, "unit": "%" }, "roll": { "value": 0.3, "unit": "deg" }, "pitch": { "value": -0.29, "unit": "deg" }, "yaw": { "value": 0, "unit": "deg" }, "joystick": { "timestamp": 35, "direction": "left", "action": "pressed" } }, { "temperature": { "value": 0.3, "unit": "C" }, "pressure": { "value": 1000, "unit": "hPa" }, "humidity": { "value": 18, "unit": "%" }, "roll": { "value": 0.8, "unit": "deg" }, "pitch": { "value": -0.59, "unit": "deg" }, "yaw": { "value": 0.1, "unit": "deg" }, "joystick": { "timestamp": 80, "direction": "right", "action": "pressed" } }];
    generateTable(data);
};

function generateTable(data) {
    // tworzenie elementu table
    var parentElement = document.getElementById("empty");
    parentElement.innerHTML = `<table id="table" class="table text-center"></table>` + parentElement.innerHTML;
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
        // dodawanie wierszy tabeli z danymi
    for (let i = 0; i < data.length; i++) {
        let row = tbody.insertRow(-1);
        for (let key in data[i]) {
            let cell = row.insertCell(-1);
            let values = Object.values(data[i][key]);
            cell.innerHTML = values.join(' ');
        }
    }

    // dodanie tabeli do dokumentu
    document.body.appendChild(table);
}