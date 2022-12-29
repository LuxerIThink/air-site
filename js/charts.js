var chartsExist = 0;
var charts = [];
var sample = 1;
var colors = ['#C7E5C3', '#82ADC2', '#7E72A8', '#D46A8F', '#F5878B', '#FFCCA1']

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
    if (chartsExist === 0) {
        createCharts(data)
    }
    addData(data)
}

function addData(data) {
    for (const object of data) {
        for (const key in object) {
            if (object[key].value !== undefined) {
                for (let i = 0; i < charts.length; i++) {
                    if (key === charts[i].name) {
                        charts[i].value.data.labels.push(sample.toString())
                        charts[i].value.data.datasets[0].data.push(object[key].value);
                        charts[i].value.update();

                    }
                }

            }
        }
    }
    sample++;
}

function createCharts(data) {
    const parentElement = document.getElementById("empty");
    parentElement.classList.add('mt-3', 'p-4');
    const row = document.createElement('div');
    row.classList.add('row', 'gap-2', 'd-xl-flex', 'd-lg-flex', 'd-md-flex');
    let count = 0
    for (var key in data[0]) {
        if (data[0][key].hasOwnProperty('value') && data[0][key].hasOwnProperty('unit')) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            let canvasDiv = document.createElement('div');
            canvasDiv.classList.add('card-body', 'chart');
            let canvas = document.createElement('canvas');
            canvas.id = 'chart-' + key;
            charts.push({ name: key, value: createChart(canvas, key, data[0][key].unit) });
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
    console.log(colors)
    return chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: name,
                fill: false,
                borderColor: colors.pop(),
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