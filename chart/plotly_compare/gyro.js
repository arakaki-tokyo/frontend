(function () {
    // initialize chart --->
    TESTER3 = document.getElementById('tester3');
    const alphaDS = { x: [], y: [], mode: 'Scatter', name: 'alpha' };
    const betaDS = { x: [], y: [], mode: 'Scatter', name: 'beta' };
    const gammaDS = { x: [], y: [], mode: 'Scatter', name: 'gamma' };
    const data = [alphaDS, betaDS, gammaDS];

    const layout = {
        width: window.innerWidth,
        height: window.innerWidth,
        yaxis: {
            // range: [-1, 1]
        },
        legend: {
            orientation: "h"
        },
        datarevision: ""
    };

    Plotly.newPlot(TESTER3, data, layout);

    // <--- initialize chart 
    const options = { frequency: 60};
    const sensor = new Gyroscope(options);

    sensor.addEventListener('error', error => {
        if (event.error.name == 'NotReadableError') {
            console.log("Sensor is not available.");
        }
    });
    sensor.start();

    let cnt = 0;
    sensor.addEventListener('reading', () => {
        console.log(sensor);
        const alpha = sensor.x;
        const beta = sensor.y;
        const gamma = sensor.z;

        alphaDS.y.push(alpha);
        betaDS.y.push(beta);
        gammaDS.y.push(gamma);

        data.forEach(ds => ds.x.push(cnt));
        layout.datarevision = cnt;

        Plotly.react(TESTER3, data, layout);

        cnt++;
        if (cnt > 100) {
            data.forEach(ds => { ds.y.splice(0, 1); ds.x.splice(0, 1) });
        }
    })
})();