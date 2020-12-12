const $ = id => document.getElementById(id);

const three = $("three");
const xs = $("xs");
const ys = $("ys");
const zs = $("zs");
const sw = $("sw");

const updateView = () => {
    three.style.transform = `rotateX(${xs.value}deg) rotateY(${ys.value}deg) rotateZ(${zs.value}deg)`;
}
xs.addEventListener("input", updateView);
ys.addEventListener("input", updateView);
zs.addEventListener("input", updateView);

const player = three.animate([
    { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
    { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)' }
], {
    duration: 3000,
    iterations: Infinity
});

sw.addEventListener("input", function () {
    if (this.checked)
        player.pause();
    else
        player.play();
});