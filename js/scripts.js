window.onload = function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'link');
    xhr.onload = function() {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.response)
            console.log(data)
            const xs = [];
            const ys = [];
            for (const obj of data) {
                const x = obj.x;
                xs.push(value);
                const y = obj.y;
                ys.push(value);
            }
            createChart("id", ys, xs, "label name", '#ffffff')
        } else {
            console.error(xhr.response);
        }
    };
    xhr.send();
};

function createChart(id, values, labels, labelname, color) {
    var ctx = document.getElementById(id);
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: labelname,
                fill: false,
                data: values,
                borderColor: color,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                }
            }
        }
    });
}