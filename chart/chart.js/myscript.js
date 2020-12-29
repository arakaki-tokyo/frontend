const DS = {
    x: [],
    alpha: [],
    beta: [],
    gamma: []
}
// initialize chart
var myChart = new Chart(document.getElementById('myChart'), {
    type: "line",
    data: {
        labels: DS.x,
        datasets: [
            {
                label: "alpha",
                data: DS.alpha,
                fill: false,
                borderColor: "hsl(300, 50%, 50%)",
                pointRadius: 0
            },
            {
                label: "beta",
                data: DS.beta,
                fill: false,
                borderColor: "hsl(60, 50%, 50%)",
                pointRadius: 0
            },
            {
                label: "gamma",
                data: DS.gamma,
                fill: false,
                borderColor: "hsl(180, 50%, 50%)",
                pointRadius: 0
            }]
    },
    options: {
        title: {
            display: true,
            text: 'DeviceOrientation API Demo'
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: -200,
                    suggestedMax: 400
                },
                scaleLabel: {
                    display: true,
                    labelString: 'value (deg.)'
                }
            }]
        },
        animation: {
            duration: 0,
        },
        hover: {
            animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        elements: {
            line: {
                tension: 0
            }
        },
        legend: {
            position: "bottom"
        }
    }
});

// initialize chart done
let cnt = 0;
window.addEventListener("deviceorientation", ev => {

    addData({x: cnt++, alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma});
    if(cnt > 100) removeData();
    myChart.update();

    // for debug
    timer();
})
function addData(data) {
    for(key in DS)
        DS[key].push(data[key]);
}
function removeData() {
    for(key in DS)
        DS[key].shift();
}

// for debug
const start = Date.now();
let lastTime = start;
function timer() {
    if(cnt % 100 == 0){
        const now = Date.now();
        console.log(`${cnt} times, ${Math.floor((now - start)/1000)} s from start, LAP: ${now - lastTime} ms, about ${(now - lastTime) / 100} ms per single draw`)
        lastTime = now;
    }
}
