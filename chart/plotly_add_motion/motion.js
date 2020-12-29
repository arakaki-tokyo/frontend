(function () {
    // initialize chart --->
    MOTION = document.getElementById('motion');
    const xDS = { x: [], y: [], mode: 'Scatter', name: 'acceleration-x' };
    const yDS = { x: [], y: [], mode: 'Scatter', name: 'acceleration-y' };
    const zDS = { x: [], y: [], mode: 'Scatter', name: 'acceleration-z' };
    const alphaDS = { x: [], y: [], mode: 'Scatter', name: 'rotationRate-alpha' };
    const betaDS = { x: [], y: [], mode: 'Scatter', name: 'rotationRate-beta' };
    const gammaDS = { x: [], y: [], mode: 'Scatter', name: 'rotationRate-gamma' };
    const data = [xDS, yDS, zDS, alphaDS, betaDS, gammaDS];

    const layout = {
        width: window.innerWidth,
        height: window.innerWidth,
        yaxis: {
            range: [-200, 400]
        },
        legend: {
            orientation: "h"
        },
        datarevision: ""
    };

    Plotly.newPlot(MOTION, data, layout);

    // <--- initialize chart 

    let cnt = 0;
    window.addEventListener("devicemotion", ev => {
        const x = ev.acceleration.x;
        const y = ev.acceleration.y;
        const z = ev.acceleration.z;
        const alpha = ev.rotationRate.alpha;
        const beta = ev.rotationRate.beta;
        const gamma = ev.rotationRate.gamma;

        alphaDS.y.push(alpha);
        betaDS.y.push(beta);
        gammaDS.y.push(gamma);

        xDS.y.push(x);
        yDS.y.push(y);
        zDS.y.push(z);

        data.forEach(ds => ds.x.push(cnt));
        layout.datarevision = cnt;

        if (cnt > 10) {
            data.forEach(ds => { ds.y.splice(0, 1); ds.x.splice(0, 1) });
        }

        Plotly.react(MOTION, data, layout);

        cnt++;
    });
})();