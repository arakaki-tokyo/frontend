const $ = id => document.getElementById(id);

const three = $("three");
const persX = $("pers_x");

const initialTransform = window.getComputedStyle(three).transform;
[persX].forEach(e => {
    e.addEventListener("input", function(){
        three.style.transform = `rotateY(${persX.value}deg) ${initialTransform}`;
    })
})


