generateTable();
console.log('first')
const inputs = document.querySelectorAll('input.btn-check');
console.log('second')
const ids = [];


inputs.forEach((input) => {
    input.addEventListener('change', (event) => {
        console.log('xD')
        const input = event.target;
        if (input.checked) {
            ids.push(input.id);
            console.log(ids)
        } else {
            const index = ids.indexOf(input.id);
            ids.splice(index, 1);
            console.log(ids)
        }
    });
});


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
            checkbox.type = 'checkbox';
            checkbox.className = 'btn-check';
            checkbox.id = `${x}x${y}`;
            checkbox.autocomplete = 'off';
            const label = document.createElement('label');
            label.className = 'btn check shadow-sm m-1';
            label.htmlFor = `${x}x${y}`;
            cell.appendChild(checkbox);
            cell.appendChild(label);
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
    slidersDiv.classList.add('d-flex', 'flex-column');

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
}