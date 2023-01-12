var startvar = 1;
const ip = document.getElementById('ip');
const port = document.getElementById('port');
const options = document.getElementsByClassName('option');
const workingdiv = document.getElementById('empty');
var mode = 'null'
var sample = 0;
var colors = [];
var pixels;
var redRange;
var greenRange;
var blueRange;
var button;
var checks;
var interval1;
var interval2;
var getpathaddition = "/get_data"; // /xD/measurements.php 
var sendpathaddition = "/put_led"; // /xD/led_display.php 
var readycharts = [];


mainLoop()

async function mainLoop() {
    for (const option of options) {
        option.addEventListener('click', function () {
            if (ip.value != '' && port.value != '') {
            // Change buttons apparance
            if (option.classList.contains('ripple')) {
                for (const otheroption of options) {
                    otheroption.classList.remove('active');
                    otheroption.classList.add('ripple');
                }
                option.classList.remove('ripple');
                option.classList.add('active');
                // Set mode
                clearInterval(interval1)
                clearInterval(interval2)
                // Clear working div
                workingdiv.innerHTML = "";
                startvar = 1;
                mode = option.id
            }
            }
            modeChanger()
        });
    }
}

function modeChanger() {
    switch (mode) {
        case 'charts':
            interval1 = setInterval(charts, 100);
            break;
        case 'table':
            interval2 = setInterval(table, 100);
            break;
        case 'matrix':
            matrix();
            break;
        case 'null':
            break
    }
}

async function charts() {
    const data = await getData()
    if (data != -1 && mode == 'charts') {
        if (startvar == 1) {
            startvar = 0;
            sample = 1;
            colors = ['#C7E5C3', '#82ADC2', '#7E72A8', '#D46A8F', '#F5878B', '#FFCCA1']
            readycharts = [];
            createCharts(data)
        }
        else {
            addData2Chart(data)
        }
    }
}

async function table() {
    const data = await getData()
    if (data != -1 && mode == 'table') {
        if (startvar == 1) {
            startvar = 0;
            generateHeader(data)
        }
        addRow(data);
    }
}

async function matrix() {
    if (startvar == 1) {
        pixels = document.getElementsByClassName('pixel');
        redRange = document.getElementById('red');
        greenRange = document.getElementById('green');
        blueRange = document.getElementById('blue');
        button = document.getElementById('button');
        checks = document.getElementsByClassName('check');
        generateMatrixAndSliders();
        startvar = 0;
    }
    await ClickSendData();
    checkPixels()
}

// HTML Requests

async function getData() {
    let link = ip.value + ":" + port.value + getpathaddition;
    const response = await fetch(link);
    const data = await response.json();
    return data
  }


async function sendData(data) {
    prepareddata = JSON.stringify(data);
    console.log(prepareddata)
    let link = ip.value + ":" + port.value + sendpathaddition;
    const response = await fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: prepareddata
    });
    replay = await response.json();
    console.log(replay)
}


// Charts

function addData2Chart(data) {
    for (const object of data) {
        for (const key in object) {
            if (object[key].value !== undefined) {
                for (let i = 0; i < readycharts.length; i++) {
                    if (key === readycharts[i].name) {
                        console.log(sample)
                        readycharts[i].value.data.labels.push(sample.toString())
                        readycharts[i].value.data.datasets[0].data.push(object[key].value);
                        readycharts[i].value.update();

                    }
                }

            }
        }
    }
    sample++;
}

function createCharts(data) {
    const parentElement = document.getElementById("empty");
    const row = document.createElement('div');
    row.classList.add('row', 'gap-2', 'd-xl-flex', 'd-lg-flex', 'd-md-flex');
    for (var key in data[0]) {
        if (data[0][key].hasOwnProperty('value') && data[0][key].hasOwnProperty('unit')) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            let canvasDiv = document.createElement('div');
            canvasDiv.classList.add('card-body', 'chart');
            let canvas = document.createElement('canvas');
            canvas.id = 'chart-' + key;
            readycharts.push({ name: key, value: createChart(canvas, key, data[0][key].unit) });
            canvasDiv.appendChild(canvas)
            cardDiv.appendChild(canvasDiv);
            let colDiv = document.createElement('div');
            colDiv.classList.add('col-xl-3', 'col-lg-5', 'col-md-auto', 'flex-fill', 'mx-1', 'my-2');
            row.appendChild(colDiv);
            colDiv.appendChild(cardDiv);
        }
    }
    parentElement.appendChild(row);
    chartsExist = 1;
}


function createChart(ctx, name, ylabel) {
    return chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: name,
                fill: false,
                borderColor: "#418CF0",
                data: [],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'samples'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: ylabel,
                    }
                }
            },
        }
    });
}

// Table

function generateHeader(data) {
    const parentElement = workingdiv;
    const tableDiv = document.createElement('div');
    parentElement.appendChild(tableDiv);
    tableDiv.classList.add('container');
    const newtable = document.createElement('table');
    newtable.id = 'table';
    newtable.classList.add('table', 'text-center', 'mt-3');
    tableDiv.appendChild(newtable);
    const header = newtable.createTHead();
    const hrow = header.insertRow(0);
    for (var key in data[0]) {
        let cell = hrow.insertCell(-1);
        cell.innerHTML = key;
        cell.setAttribute('scope', 'col');
        cell.style.fontWeight = 'bold';
    }
    const tbody = newtable.createTBody()
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

// Matrix

async function ClickSendData() {
    button.addEventListener('click', async function () {
        const data = [];
        for (const check of checks) {
            const id = check.id;
            const [x, y] = id.split('x').map(x => parseInt(x));
            const color = check.style.backgroundColor;
            const [r, g, b] = color.match(/\d+/g).map(x => parseInt(x));

            data.push({ x, y, r, g, b });
        }
        await sendData(data);
    });
}

function checkPixels() {
    for (const pixel of pixels) {
        pixel.addEventListener('click', function () {
            const red = parseInt(redRange.value);
            const green = parseInt(greenRange.value);
            const blue = parseInt(blueRange.value);
            pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        });
    }
}


function generateMatrixAndSliders() {
    const parentElement = workingdiv;
    const div = document.createElement('div');
    parentElement.appendChild(div);
    div.classList.add('d-flex', 'flex-column', 'm-5');
    const tableDiv = document.createElement('div');
    div.appendChild(tableDiv);
    tableDiv.classList.add('container', 'd-flex', 'justify-content-center');
    const newtable = document.createElement('table');
    for (let y = 0; y < 8; y++) {
        const row = document.createElement('tr');
        for (let x = 0; x < 8; x++) {
            const cell = document.createElement('td');
            let check = document.createElement('input')
            const checkbox = document.createElement('input');
            checkbox.type = 'button';
            checkbox.className = 'btn check btn-dark pixel';
            checkbox.style.backgroundColor = `rgb(0, 0, 0)`;
            checkbox.id = `${x}x${y}`;
            cell.appendChild(checkbox);
            row.appendChild(cell);
        }
        newtable.appendChild(row);
    }
    tableDiv.appendChild(newtable);

    const centerDiv = document.createElement('div');
    div.appendChild(centerDiv);
    centerDiv.classList.add('d-flex', 'justify-content-center', 'm-3');

    const slidersDiv = document.createElement('div');
    centerDiv.appendChild(slidersDiv);
    slidersDiv.classList.add('d-flex', 'flex-column', 'mt-3');

    const colors = ['red', 'green', 'blue']
    colors.forEach((color) => {
        const sliderDiv = document.createElement('div');
        sliderDiv.classList.add('slider');
        slidersDiv.appendChild(sliderDiv);
        const input = document.createElement('input');
        input.type = 'range';
        input.className = 'form-range';
        input.min = 0;
        input.max = 255;
        input.id = color;
        sliderDiv.appendChild(input);

    });
    redRange = document.getElementById('red')
    greenRange = document.getElementById('green')
    blueRange = document.getElementById('blue')
    const centerDiv2 = document.createElement('div');
    div.appendChild(centerDiv2);
    centerDiv2.classList.add('d-flex', 'justify-content-center');
    button = document.createElement('button');
    button.id = 'button';
    button.className = 'btn btn-primary';
    button.type = 'button';
    button.textContent = 'Save';
    centerDiv2.appendChild(button);
}

