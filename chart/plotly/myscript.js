const DS = {
    x: [],
    alpha: [],
    beta: [],
    gamma: []
};
// initialize chart --->
TESTER = document.getElementById('tester');
const data = [
    { x: DS.x, y: DS.alpha, mode: 'Scatter', name: 'alpha' },
    { x: DS.x, y: DS.beta, mode: 'Scatter', name: 'beta' },
    { x: DS.x, y: DS.gamma, mode: 'Scatter', name: 'gamma' },
];

const layout = {
    title: {
        text: 'DeviceOrientation API Demo'
    },
    width: window.innerWidth,
    height: window.innerWidth,
    yaxis: {
        title: {
            text: 'value (deg.)'
        },
        range: [-200, 400]
    },
    legend: {
        orientation: "h"
    },
    datarevision: ""
};

Plotly.newPlot(TESTER, data, layout);

// <--- initialize chart 

let cnt = 0;
window.addEventListener("deviceorientation", ev => {

    addData({ x: cnt++, alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma });
    if (cnt > 100) removeData();

    layout.datarevision = cnt;

    Plotly.react(TESTER, data, layout);

    // for debug
    timer();
})

function addData(data) {
    for (key in DS)
        DS[key].push(data[key]);
}
function removeData() {
    for (key in DS)
        DS[key].shift();
}

// for debug
const start = Date.now();
let lastTime = start;
function timer() {
    if (cnt % 100 == 0) {
        const now = Date.now();
        console.log(`${cnt} times, ${Math.floor((now - start) / 1000)} s from start, LAP: ${now - lastTime} ms, about ${(now - lastTime) / 100} ms per single draw`)
        lastTime = now;
    }
}
