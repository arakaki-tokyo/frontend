const DS = {
	x: [],
	alpha: [],
	beta: [],
	gamma: []
};

// 	// initialize chart --->
// 	// <--- initialize chart

let cnt = 0;
window.addEventListener("deviceorientation", ev => {

    addData({ x: cnt++, alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma });
    if (cnt > 100) removeData();

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
