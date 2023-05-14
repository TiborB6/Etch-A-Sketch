const container = document.querySelector("#container")
const info = document.querySelector("#info");
let grid = 16;

// Generates the grid by the mathematical operation in the forloop and flex-wrap
function createSketch(baseGridNumber) { 
    let baseGridWidht = 720; // Width and Height always 1/1 ratio  !!!has to be changed in css!!! 

    const sketch = document.createElement("div"); 
        sketch.classList.add("sketch");
        sketch.style["border-style"] = "solid";
        sketch.style["border-width"] = "1px";
        sketch.style["border-color"] = "black";
    container.appendChild(sketch);

    for (let i = 0; i < Math.pow(baseGridNumber, 2); i++) {
        const baseBox = document.createElement("div");
            baseBox.classList.add("base-box");
            baseBox.id = "box"            
            baseBox.style["height"] = `${baseGridWidht/baseGridNumber - 2 + "px"}`;
            baseBox.style["width"] = `${baseGridWidht/baseGridNumber - 2 + "px"}`;
            
        sketch.appendChild(baseBox);
    };
};

function deleteOldSketch(){
    const dltSketch = document.querySelector(".sketch");
    const dltBoxes = document.querySelector("#box");

    dltSketch.removeChild(dltBoxes);
    container.removeChild(dltSketch);
}


// Adds listener to button, which if pressed takes the value of the input and creates a new sketch and deletes the old one
function createHeader () { 
    const h1 = document.createElement("h1");
    h1.textContent = "Etch-A-Sketch";
    h1.id = "header";
    info.appendChild(h1);

    const input = document.createElement("input");
        input.type = "text";
        input.value = "Number: 1-100";
        input.style["color"] = "grey";
    info.appendChild(input);

    const playButton = document.createElement("button");
        playButton.classList.add("button");
        playButton.textContent = "Play/Reset";
    info.appendChild(playButton);

    playButton.addEventListener("click", () => {
        let inputValue = parseInt(input.value);
        if (0 < inputValue < 100 && inputValue%1 === 0) {
            createSketch(inputValue);
            deleteOldSketch();
            addEventListener();
        };
    });
};

// This part of the script call the addButtonColor() function which make the blocks black
// addEvntListenerNeeds to be called if new sketch is deleted
function addEventListener() {
    const boxList = document.querySelectorAll("#box");
    let isHovering = false;
    let isClicking = false;

    boxList.forEach(box => {
        box.addEventListener("mouseover", () => {
            isHovering = true; 
                if (isClicking) {
                addButtonColor(box);
            };
        });

        box.addEventListener("mouseout", () => {
            isHovering = false; 
        });

        box.addEventListener("mousedown", (e) => {
            isClicking = true;
            e.preventDefault();
        });

        box.addEventListener("mouseup", () => {
            isClicking = false; 
        });
    });
};

function addButtonColor(colorBox) {
    colorBox.style["background-color"] = "black";
};

createHeader();
createSketch(grid);
addEventListener();