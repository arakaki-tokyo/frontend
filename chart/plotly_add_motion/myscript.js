// initialize chart --->
TESTER = document.getElementById('tester');
const alphaDS = { x: [], y: [], mode: 'Scatter', name: 'alpha' };
const betaDS = { x: [], y: [], mode: 'Scatter', name: 'beta' };
const gammaDS = { x: [], y: [], mode: 'Scatter', name: 'gamma' };
const data = [alphaDS, betaDS, gammaDS];

const layout = {
    width: window.innerWidth,
    height: window.innerWidth,
    yaxis: {
        range: [-100, 400]
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

    const alpha = ev.alpha;
    const beta = ev.beta;
    const gamma = ev.gamma;

    alphaDS.y.push(alpha);
    betaDS.y.push(beta);
    gammaDS.y.push(gamma);

    data.forEach(ds => ds.x.push(cnt));
    layout.datarevision = cnt;

    Plotly.react(TESTER, data, layout);

    cnt++;
    if (cnt > 100) {
        data.forEach(ds => { ds.y.splice(0, 1); ds.x.splice(0, 1) });
    }
})
