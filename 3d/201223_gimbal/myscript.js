const $ = selector => document.querySelectorAll(selector);

const axes = $(".axis");
const sliders = $(".slider");

function sliderHandler(ev){
    let target;

    // determine target
    if(this.id == "xs") target = axes[0];
    else if(this.id == "ys") target = axes[1];
    else target = axes[2];

    target.style.transform = target.getAttribute("initRotate") + ` rotateX(${this.value}deg)`;
}

// initialize -->
genCube([
    "<span>&#x31;&#xfe0f;&#x20e3;</span>",
    "<span>&#x36;&#xfe0f;&#x20e3;</span>",
    "<span>&#x32;&#xfe0f;&#x20e3;</span>",
    "<span>&#x35;&#xfe0f;&#x20e3;</span>",
    "<span>&#x33;&#xfe0f;&#x20e3;</span>",
    "<span>&#x34;&#xfe0f;&#x20e3;</span>"
]);
axes.forEach(axis => {
    const initRotate = window.getComputedStyle(axis).transform;
    axis.setAttribute("initRotate", initRotate == "none"? "": initRotate);
})

for(const slider of $(".slider")){
    console.log(slider)
    slider.addEventListener("input", sliderHandler);
}
// <-- initialize

const options = { frequency: 10, referenceFrame: 'device' };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener('error', error => {
    if (event.error.name == 'NotReadableError') {
        console.log("Sensor is not available.");
    }
});
sensor.start();

let cnt = 0;
sensor.addEventListener('reading', (ev) => {
    // const targetMatrix = new DOMMatrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    const targetMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    console.log("ini: ", `${targetMatrix}`);
    console.log(ev);
    console.log(sensor);
    console.log(sensor.populateMatrix(targetMatrix));
    console.log("ini: ", `matrix3d(${targetMatrix})`);

    document.getElementById("content").style.transform = `matrix3d(${targetMatrix}) `;
})
