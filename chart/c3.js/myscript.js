const DS = {
    x: ['x'],
    alpha: ['alpha'],
    beta: ['beta'],
    gamma: ['gamma']
}
// initialize chart --->
var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            // ['x', ...DS.x],
            // ['alpha', ...DS.alpha],
            // ['beta', ...DS.beta],
            // ['gamma', ...DS.gamma]
            DS.x,
            DS.alpha,
            DS.beta,
            DS.gamma
        ]
    },
    transition: {
        duration: 0
    },
    axis: {
        y: {
            max: 350,
            min: -150,
            label: "value (deg)"
        }
    }
});

// <--- initialize chart 
let cnt = 0;

window.addEventListener("deviceorientation", ev => {

    addData({x: cnt++, alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma});
    if(cnt > 100) removeData();

    chart.load({
        columns: [
            // ['x', ...DS.x],
            // ['alpha', ...DS.alpha],
            // ['beta', ...DS.beta],
            // ['gamma', ...DS.gamma]
            DS.x,
            DS.alpha,
            DS.beta,
            DS.gamma
        ]
    });

    timer();
})
function addData(data) {
    for(key in DS)
        DS[key].push(data[key]);
}
function removeData() {
    for(key in DS)
        // DS[key].shift();
        DS[key].splice(1, 1);
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
