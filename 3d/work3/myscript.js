const d2r = deg => deg/180 * Math.PI;
function rotateX(deg) {
    rad = d2r(deg);
    return [
        1, 0, 0, 0,
        0, Math.cos(rad), Math.sin(rad), 0,
        0, - Math.sin(rad), Math.cos(rad), 0,
        0, 0, 0, 1
    ]
}
function rotateY(deg) {
    rad = d2r(deg);
    return [
        Math.cos(rad), 0, - Math.sin(rad), 0,
        0, 1, 0, 0,
        Math.sin(rad), 0, Math.cos(rad), 0,
        0, 0, 0, 1
    ]
}

function rotateZ(deg) {
    rad = d2r(deg);
    return [
        Math.cos(rad), Math.sin(rad), 0, 0,
        - Math.sin(rad), Math.cos(rad), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}
function dot(m1, m2) {
    // const retval = [Array(4), Array(4), Array(4), Array(4)];
    const retval = Array(16);

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let c = 0;
            for (k = 0; k < 4; k++) {
                // c += m1[i][k] * m2[k][j];
                c += m1[i * 4 + k] * m2[k * 4 + j];
            }
            // retval[i][j] = c;
            retval[i * 4 + j] = c;
        }
    }
    return retval;
}

const $ = id => document.getElementById(id);

const three = $("three");
const persX = $("pers_x");

const initialTransform = window.getComputedStyle(three).transform;
[persX].forEach(e => {
    e.addEventListener("input", function(){
        three.style.transform = `rotateY(${persX.value}deg) ${initialTransform}`;
    })
})

// $("cow3").style.transform = `matrix3d(${dot(rotateX(-90),rotateZ(90))})`;
$("cow3").style.transform = `matrix3d(${dot(rotateX(-90), dot(rotateY(90),rotateZ(90)))})`;
$("cow3").style.transform = `matrix3d(${dot(dot(rotateX(-90), rotateY(90),rotateZ(90)))})`;
