const $ = id => document.getElementById(id);

const three = $("three");
const persX = $("pers_x");
const persY = $("pers_y");

let contentHTML = "";
for(let i = 0; i < 3; i++)
for(let j = 0; j < 3; j++)
for(let k = 0; k < 3; k++)
contentHTML += 
`<div class="point" style="transform: translate3d(${i*100}px,${j*100}px,${k*100}px);">(${i},${j},${k})</div>`;

three.innerHTML += contentHTML;

[persX, persY].forEach(e => {
    e.addEventListener("input", function(){
        three.style.transform = `rotateY(${persX.value}deg) rotateX(${persY.value}deg)`;
    })
})


