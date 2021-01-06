function genCube(values) {
    const valuesLocal = ["", "", "", "", "", ""];
    if(Array.isArray(values)){
        for(let i = 0; i < 6 || i < values.length; i++){
            valuesLocal[i] = values[i];
        }
    }else{
        throw new Error('Parameter must be array.');
    }
    const cubes = document.getElementsByClassName("cube");
    Array.prototype.forEach.call(cubes, cube => {
        const edge = Number(window.getComputedStyle(cube).width.match(/\d+(?=px)/)[0]);
        const faces = [
            { value: valuesLocal[0], prop: `translateZ(${edge / 2}px)` },
            { value: valuesLocal[1], prop: `translateZ(${-edge / 2}px) rotateX(180deg)` },
            { value: valuesLocal[2], prop: `translateY(${-edge / 2}px) rotateX(90deg)` },
            { value: valuesLocal[3], prop: `translateY(${edge / 2}px) rotateX(-90deg)` },
            { value: valuesLocal[4], prop: `translateX(${edge / 2}px) rotateY(90deg)` },
            { value: valuesLocal[5], prop: `translateX(${-edge / 2}px) rotateY(-90deg)` }
        ];

        let HTML = "";
        for (const face of faces) {
            HTML += `<div style="position:absolute; transform:${face.prop};width:${edge}px; height:${edge}px;">${face.value}</div>`;
        }
        cube.innerHTML = HTML;
        cube.style.transformStyle = "preserve-3d";
    
    });
}