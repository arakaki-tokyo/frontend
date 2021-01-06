const $ = id => document.getElementById(id);

const scene = $("scene");
const updateScene = () => {
    scene.style.transform = `rotateY(${pxs.value}deg)`;
};
const three = $("three");
const pxs = $("pxs");
const xs = $("xs");
const ys = $("ys");
const zs = $("zs");
const sw = $("sw");
let m0 = curMatrix();
let currentTransform;

function updateView(){
    const prop =
        (this.id === "xs")? ` rotateX(${xs.value}deg) ${currentTransform}`:
        (this.id === "ys")? `${currentTransform} rotateY(${ys.value}deg) `:
        ` rotateZ(${zs.value}deg) ${currentTransform}`;

        three.style.transform = prop;
    console.log(prop);
};

let iPrspctv = 0;

function anime(e) {
    console.log(e.target.checked);
    (function doAnimation() {
        if (e.target.checked) {
            function add(e) { e.value = Number(e.value) % 360 + 10; }
            add(xs);
            add(ys);
            add(zs);
            updateView();

            setTimeout(() => {
                doAnimation();
            }, 50)
        }
    })();
}

function postProc(){this.value = "0"}
function postProcForKey(){
    this.value = "0";
    this.addEventListener("keydown", preProcForKey);
}
function setCurrentMatrix(){m0 = curMatrix();console.log(m0);currentTransform = window.getComputedStyle(three).transform;}
function preProcForKey(e){
    setCurrentMatrix();
    ret = e.target.removeEventListener("keydown", preProcForKey);
    console.log(ret,e)
}
pxs.addEventListener("input", updateScene);
// xs.addEventListener("input", updateView);
xs.addEventListener("input", updateView2);
ys.addEventListener("input", updateView);
zs.addEventListener("input", updateView);
xs.addEventListener("keyup", postProcForKey);
ys.addEventListener("keyup", postProcForKey);
zs.addEventListener("keyup", postProcForKey);
xs.addEventListener("mouseup", postProc);
ys.addEventListener("mouseup", postProc);
zs.addEventListener("mouseup", postProc);
xs.addEventListener("mousedown", setCurrentMatrix);
ys.addEventListener("mousedown", setCurrentMatrix);
zs.addEventListener("mousedown", setCurrentMatrix);
xs.addEventListener("keydown", preProcForKey);
ys.addEventListener("keydown", preProcForKey);
zs.addEventListener("keydown", preProcForKey);

// const player = three.animate([
//     { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
//     { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)' }
// ], {
//     duration: 3000,
//     iterations: Infinity
// });

sw.addEventListener("input", anime
    // sw.addEventListener("input", function(e){
    //     console.log(e.target.checked);
    //     console.log(this.checked);
    // }
);


scene.addEventListener("mousedown", function (e) {
    // pre proc
    console.log(e)
    this.style.cursor = "grabbing";

    const currentXY = { X: e.clientX, Y: e.clientY };
    const currentRotateXY = { X: Number(xs.value), Y: Number(ys.value) };
    const currentSceneY = Number(pxs.value);
    const currentTransofrm3d = window.getComputedStyle(three).transform;
    // main proc
    function proc(e) {
        const X = e.clientX - currentXY.X;
        const Y = -1 * (e.clientY - currentXY.Y);

        console.log(X, Y);

        // xs.value = (currentRotateXY.X + 360 + Y) % 360;
        console.log(` ${window.getComputedStyle(three).transform} rotateX(${Y / 10}deg)`);
        three.style.transform =
            `rotateX(${Y}deg) ${currentTransofrm3d} `;
        // ys.value = (currentRotateXY.Y + 360 - X) % 360;
        pxs.value = (currentSceneY + 360 + X) % 360;

        // updateView();
        updateScene();
    }
    this.addEventListener("mousemove", proc);

    // post proc
    this.addEventListener("mouseup", function (e) {
        this.style.cursor = "grab";
        this.removeEventListener("mousemove", proc);
    });
})



// -------------------- debug --------------------------
function updateView2() {
    // m1[1][1] = 
    // m1[1][2] = 
    // m1[2][1] = 
    // m1[2][2] = 1;
    const mx = rotateX(Number(xs.value));
    const my = rotateY(Number(ys.value));
    const mz = rotateZ(Number(zs.value));

    const m3 =
        (this.id == "xs") ? dot(mx, m0)
            : (this.id == "ys") ? dot(my, m0)
                : dot(mz, m0);

    three.style.transform = `matrix3d(${m3})`;

}
function curMatrix() {
    let curTransform = window.getComputedStyle(three).transform;
    if(curTransform === "none")
        curTransform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
    const seed = curTransform.match(/(?<=\().*(?=\))/);
    const sArry3d = seed[0].split(/\s*,\s*/);
    const nArry3d = Array.from(sArry3d, d => Number(d));
    return a2m(nArry3d);
}
function dot(m1, m2) {
    const retval = [Array(4), Array(4), Array(4), Array(4)];

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let c = 0;
            for (k = 0; k < 4; k++) {
                c += m1[i][k] * m2[k][j];
            }
            retval[i][j] = c;
        }
    }
    return retval;
}

function m2s(matrix) {
    let str = "[";
    for (i = 0; i < 4; i++) {
        str += "[";
        for (j = 0; j < 4; j++) {
            str += matrix[i][j];
            str += ",";
        }
        str += "],";
    }
    str += "]";
    return str;
}
function a2m(arry) {
    const arry4x4 = [Array(4), Array(4), Array(4), Array(4)];
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++) arry4x4[i][j] = arry[i * 4 + j];

    return arry4x4;
}
function deg2rad(deg) {
    var rad = deg * Math.PI / 180;
    return rad;
}
function rotateX(rx) {
    var rad = deg2rad(rx);
    var matrix = [
        [1, 0, 0, 0],
        [0, Math.cos(rad), Math.sin(rad), 0],
        [0, -Math.sin(rad), Math.cos(rad), 0],
        [0, 0, 0, 1]
    ]
    return matrix;
}//角運動 Y軸
function rotateY(ry) {
    var rad = deg2rad(ry);
    var matrix = [
        [Math.cos(rad), 0, -Math.sin(rad), 0],
        [0, 1, 0, 0],
        [Math.sin(rad), 0, Math.cos(rad), 0],
        [0, 0, 0, 1]
    ]
    return matrix;
}

//角運動 Z軸
function rotateZ(rz) {
    var rad = deg2rad(rz);
    var matrix = [
        [Math.cos(rad), Math.sin(rad), 0, 0],
        [-Math.sin(rad), Math.cos(rad), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
    return matrix;
}