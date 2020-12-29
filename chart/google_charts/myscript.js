google.charts.load('current', {'packages':['corechart'], 'language': 'ja'});

google.charts.setOnLoadCallback(() => {
	// initialize chart --->
	const data = new google.visualization.DataTable();

	data.addColumn('number', 'x');
	data.addColumn('number', 'alpha');
	data.addColumn('number', 'beta');
	data.addColumn('number', 'gamma');

	const options = {
		title: 'DeviceOrientation API Demo',
		colors: ['#c4c', '#cc4', '#4cc'],
		crosshair: { trigger: 'both' },
		vAxis: {
			title: 'value (deg.)',
			maxValue: 400,
			minValue: -200
		},
		legend: { position: 'bottom' },
		height: 400
	};

	const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	let isReady = false;
	google.visualization.events.addListener(chart,  'ready', () => isReady = true);
	chart.draw(data, options);
	// <--- initialize chart

	let cnt = 0;
	window.addEventListener("deviceorientation", ev => {

		if(isReady) isReady = false;
		else return;

		const alpha = ev.alpha;
		const beta = ev.beta;
		const gamma = ev.gamma;
	
		data.addRow([cnt, alpha, beta, gamma]);
		cnt++;

		if (cnt > 100) {
			data.removeRow(0);
		}

		chart.draw(data, options);

		// for debug
		timer(cnt);
	})

});

// for debug
const start = Date.now();
let lastTime = start;
function timer(cnt) {
    if(cnt % 100 == 0){
        const now = Date.now();
        console.log(`${cnt} times, ${Math.floor((now - start)/1000)} s from start, LAP: ${now - lastTime} ms, about ${(now - lastTime) / 100} ms per single draw`)
        lastTime = now;
    }
}

