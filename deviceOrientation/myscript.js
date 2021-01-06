const d2r = deg => deg / 180 * Math.PI;
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
// initialize -->
genCube([
    "1",
    "6",
    "2",
    "5",
    "3",
    "4"
]);
// <-- initialize

// DeviceOrientation Event
window.addEventListener("deviceorientation", ev => {
    document.getElementById("cube1_1").style.transform
        = `rotateX(90deg) rotateZ(${- ev.alpha}deg) rotateX(${- ev.beta}deg) rotateY(${ev.gamma}deg)`;

    const matrix3d = dot(dot(rotateY(ev.gamma), rotateX(-ev.beta)), rotateZ(-ev.alpha));
    document.getElementById("cube1_2").style.transform
        = `rotateX(90deg) matrix3d(${matrix3d})`;

})
// RelativeOrientationSensor
const options = { frequency: 15, referenceFrame: 'device' };
const sensor1 = new RelativeOrientationSensor(options);

sensor1.start();

sensor1.addEventListener('reading', function (ev) {
    const targetMatrix = new Float32Array(16);
    sensor1.populateMatrix(targetMatrix);

    document.getElementById("cube2_1").style.transform 
        = `rotateX(90deg) matrix3d(${targetMatrix}) `;

    const x = this.quaternion[0];
    const y = this.quaternion[1];
    const z = this.quaternion[2];
    const w = this.quaternion[3];

    const matrix2 = (function (x, y, z, w) {
        return [
            x * x - y * y - z * z + w * w,
            2 * (x * y + z * w),
            2 * (x * z - y * w),
            0,
            2 * (x * y - z * w),
            -x * x + y * y - z * z + w * w,
            2 * (y * z + x * w),
            0,
            2 * (x * z + y * w),
            2 * (y * z - x * w),
            -x * x - y * y + z * z + w * w,
            0,
            0, 0, 0, 1
        ]
    })(x, -y, z, -w);
    document.getElementById("cube2_2").style.transform
        = `rotateX(90deg) matrix3d(${matrix2}) `;

        document.getElementById("cube2_3").style.transform
        = `rotateX(90deg) rotate3d(${x}, ${-y}, ${z}, ${2 * Math.acos(-w)}rad)`;

})

// 3. Absolute
window.addEventListener("deviceorientationabsolute", ev => {
    document.getElementById("cube3_1").style.transform
        = `rotateX(90deg) rotateZ(${- ev.alpha}deg) rotateX(${- ev.beta}deg) rotateY(${ev.gamma}deg) `;
})

const sensor2 = new AbsoluteOrientationSensor(options);
sensor2.start();

sensor2.addEventListener('reading', function (ev) {

    const x = this.quaternion[0];
    const y = this.quaternion[1];
    const z = this.quaternion[2];
    const w = this.quaternion[3];

    document.getElementById("cube3_2").style.transform
        = `rotateX(90deg) rotate3d(${x}, ${-y}, ${z}, ${2 * Math.acos(-w)}rad)`;

})
