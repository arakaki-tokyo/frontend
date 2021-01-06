function $(obj) {
    switch (Object.keys(obj)[0]) {
        case "id": return document.getElementById(obj.id);
        case "className": return document.getElementsByClassName(obj.className);
    }

}

// initialize node
const container = $({ id: "container" });
const contents = [
    "&#x1F600;",
    "&#x1F601;",
    "&#x1F605;",
    "&#x1F923;",
    "&#x1F62D;",
    "&#x1F97A;"];
let strHtml = "";
const rotateAngle = 360 / contents.length;
for (i = 0; i < contents.length; i++) {
    strHtml += `
    <div class="rotate_z" style="transform: rotateZ(${rotateAngle * i}deg);">
    <!-- 1st: rotateZ, revers for container -->
    <!-- 2nd: rotateX, revers for container -->
    <span class="contents" style="transform: rotateZ(${-45}deg) rotateX(${-90}deg)">${contents[i]}</span>
    </div>`
}
container.innerHTML = strHtml;


// function declarations


// slider input turn around contents
const iniValContainerTransform = window.getComputedStyle(container).transform;
$({ id: "sRotateY" }).addEventListener("input", function () {
    container.style.transform = `rotateY(${this.value}deg) ${iniValContainerTransform}`;
})

// devide orientation
// initialize chart
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    "type": "line",
    "data": {
        "labels": ["0"],
        "datasets": [
            {
                "label": "alpha",
                "data": [0],
                "fill": false, 
                "borderColor": "rgb(75, 192, 192)", 
                "lineTension": 0.1
            },
            {
                "label": "beta",
                "data": [0],
                "fill": false, 
                "borderColor": "rgb(192, 192, 75)", 
                "lineTension": 0.1
            },
            {
                "label": "gamma",
                "data": [0],
                "fill": false, 
                "borderColor": "rgb(192, 75, 192)", 
                "lineTension": 0.1
            }]
    },
    "options": {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        animation: {
            duration: 0, // 一般的なアニメーションの時間
        },
        hover: {
            animationDuration: 0, // アイテムのマウスオーバー時のアニメーションの長さ
        },
        responsiveAnimationDuration: 0,
        showLines: false,
        elements: {
            line: {tension: 0}
        }
    }
});

// initialize chart done
let cnt = 1;
window.addEventListener("deviceorientation", ev => {

    const alpha = ev.alpha;
    const beta = ev.beta;
    const gamma = ev.gamma;

    container.style.transform = `rotateY(${-alpha}deg) ${iniValContainerTransform}`;
    // console.log(`alpha: ${alpha}, beta: ${beta}, gamma: ${gamma}`);

    // addData(myChart, cnt++, alpha);
    // myChart.data.labels.push(cnt++);
    // myChart.data.datasets[0].data.push(alpha);
    // myChart.data.datasets[1].data.push(beta);
    // myChart.data.datasets[2].data.push(gamma);

    // if(cnt > 100) removeData(myChart);
    // myChart.update();
})
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
function removeData(chart) {
    chart.data.labels.splice(0, 1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.splice(0, 1);
    });
    // chart.update();
}