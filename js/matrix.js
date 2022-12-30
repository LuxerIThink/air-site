generateTable();

const pixels = document.getElementsByClassName('pixel');
const redRange = document.getElementById('red');
const greenRange = document.getElementById('green');
const blueRange = document.getElementById('blue');

const button = document.getElementById('button');
const checks = document.getElementsByClassName('check');

button.addEventListener('click', function() {
    const data = [];

    for (const check of checks) {
        const id = check.id;
        const [x, y] = id.split('x').map(x => parseInt(x));
        const color = check.style.backgroundColor;
        console.log(color)
        console.log('xD')
        const [r, g, b] = color.match(/\d+/g).map(x => parseInt(x));

        data.push({ x, y, r, g, b });
    }

    console.log(JSON.stringify(data));
    // sendRequest(data);
});

for (const pixel of pixels) {
    pixel.addEventListener('click', function() {
        const red = parseInt(redRange.value);
        const green = parseInt(greenRange.value);
        const blue = parseInt(blueRange.value);
        pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    });
}

function sendRequest(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/submit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function generateTable() {
    const parentElement = document.getElementById('empty');
    const div = document.createElement('div');
    parentElement.appendChild(div);
    div.classList.add('d-flex', 'flex-column', 'm-5');
    const tableDiv = document.createElement('div');
    div.appendChild(tableDiv);
    tableDiv.classList.add('container', 'd-flex', 'justify-content-center');
    const table = document.createElement('table');
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
        table.appendChild(row);
    }
    tableDiv.appendChild(table);

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
    const centerDiv2 = document.createElement('div');
    div.appendChild(centerDiv2);
    centerDiv2.classList.add('d-flex', 'justify-content-center');
    const button = document.createElement('button');
    button.id = 'button';
    button.className = 'btn btn-primary';
    button.type = 'button';
    button.textContent = 'Save';
    centerDiv2.appendChild(button);
}