let mouseDown = false;
let toggleRainbow = false;
document.addEventListener("DOMContentLoaded", function(){
    document.body.addEventListener("mousedown", () => (mouseDown = true));
    document.body.addEventListener("mouseup", () => (mouseDown = false));
    const rainbow_toggle = document.querySelector("#rainbow-color");
    const slider_input = document.querySelector("#slider");
    const clear_button = document.querySelector("#clear-canvas");
    rainbow_toggle.addEventListener("click", () => {
        toggleRainbow = !toggleRainbow;
    });
    clear_button.addEventListener("click", (event) => {
        clear_canvas(slider_input);
    });
    slider_input.value = 16
    change_slider_text(slider_input)
    create_boxes(slider_input)     
    slider_input.addEventListener("input", (event) => {
        delete_boxes();
        change_slider_text(slider_input);
        create_boxes(slider_input);     
    });
})

function delete_boxes(){
    var grid = document.querySelector(".canvas");
    var child = grid.firstElementChild;
    while(child){
        grid.removeChild(child);
        child = grid.firstElementChild;
    }
}
function change_slider_text(slider_input){
    const slider_text = document.querySelector("#grid-size-text");
    slider_text.innerHTML = `${slider_input.value}x${slider_input.value}`;
}

function create_boxes(slider_input){
    const input_val = slider_input.value
    const grid_div = document.querySelector(".canvas")
    grid_div.style.gridTemplateColumns = `repeat(${input_val}, 1fr)`
    for(let i = 0; i < (input_val ** 2); i++){
        const grid_box = document.createElement("div");
        // grid_box.style = `width: ${(500/input_val).toFixed(10)}px !important; height: ${(500.0/input_val).toFixed(10)}px !important`;
        grid_box.classList.add(`box`);
        
        grid_box.addEventListener("mouseover", handleMouseOver);
        grid_box.addEventListener("mousedown", handleMouseOver);
        grid_div.append(grid_box);
    }
}
function handleMouseOver(e){
    if(e.type === "mouseover" && !mouseDown) return
    else if(toggleRainbow == true){
        e.target.style.backgroundColor = 'rgb(' + [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)].join(',') + ')';
        return;
    }
    const square_color = document.querySelector("#square-color").value
    e.target.style.backgroundColor = square_color;
}
function clear_canvas(slider_input){
    delete_boxes(slider_input);
    create_boxes(slider_input);
}