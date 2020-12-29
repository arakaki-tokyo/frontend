const DS = {
	x: [],
	alpha: [],
	beta: [],
	gamma: []
};

// 	// initialize chart --->
const myChart = echarts.init(document.getElementById('main'), null, { renderer: 'svg' });

const option = {
	title: {
		text: 'DeviceOrientation API Demo'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			animation: false,
		}
	},
	color: ['#c4c', '#cc4', '#4cc'],
	legend: {
		data: ['alpha', 'beta', 'gamma'],
		bottom: 'bottom'
	},
	xAxis: {
		data: DS.x
	},
	yAxis: {
		name: 'value (deg.)',
		max: 400,
		min: -200
	},
	series: [
		{
			name: 'alpha',
			type: 'line',
			data: DS.alpha,
			symbol: 'none'
		},
		{
			name: 'beta',
			type: 'line',
			data: DS.beta,
			symbol: 'none'
		},
		{
			name: 'gamma',
			type: 'line',
			data: DS.gamma,
			symbol: 'none'
		},
	],
	animation: false
};

myChart.setOption(option);
// 	// <--- initialize chart

let cnt = 0;
window.addEventListener("deviceorientation", ev => {

    addData({ x: cnt++, alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma });
    if (cnt > 100) removeData();

	myChart.setOption(option);

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
