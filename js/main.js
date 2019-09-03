
var gridContainerWidth = 500;
var gridColumns = 32;
var gridRows = 32;
var borderWidth = 0.8;
var selectedColor = "rgb(0, 0, 0)";
var bgColor =  "rgb(255, 255, 255)";
var picker;

function blend(src, a, tgt) {
    return Math.round(((1 - a) * tgt) + (a * src));
}

function setPixelColor(e) {
    selectedColor = picker.colorRGB;
    if (e.target.getAttribute("bg") != selectedColor)
        e.target.setAttribute("op", 0);
    e.target.setAttribute("op", Number(e.target.getAttribute("op")) + 0.1);
    e.target.setAttribute("bg", selectedColor);
    e.target.style.backgroundColor = rgba2rgb(bgColor, selectedColor, e.target.getAttribute("op")); 
}

function rgba2rgb(bgc, src, sa) {
    [bgc, br, bg, bb] = bgc.match(/rgb\((\d{1,3}),[ ]*(\d{1,3}),[ ]*(\d{1,3})\)/);
    [src, sr, sg, sb] = src.match(/rgb\((\d{1,3}),[ ]*(\d{1,3}),[ ]*(\d{1,3})\)/);
    return "rgb("+blend(sr, sa, br)+ ", " + blend(sg, sa, bg) + ", " + blend(sb, sa, bb);
}

function resizeGrid(s) {
    let gridContainer = document.querySelector('.grid-container');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    gridColumns = s;
    gridRows = s;
    let gridItemWidth = (gridContainerWidth-gridColumns*2*borderWidth) / gridColumns;
    let count = 0;
    for (let i=0; i<gridColumns; i++) {
        for (let j=0; j<gridRows; j++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = gridItemWidth+"px";
            gridItem.style.height = gridItemWidth+"px";
            gridItem.setAttribute("id", count++);
            gridContainer.appendChild(gridItem);
            gridItem.setAttribute("op", 1.0);
            gridItem.setAttribute("bg", "rgb(255, 255, 255)");
            gridItem.addEventListener('mouseover', setPixelColor);
        }
    }
}

window.onload = function()
{
    let slider = document.getElementById("gridSizeRange");
    let sliderText = document.getElementById("sliderText");
    sliderText.innerHTML = slider.value + "x" + slider.value;

    slider.oninput = function() {
        sliderText.innerHTML = slider.value + "x" + slider.value;
        resizeGrid(slider.value);
    } 

    resizeGrid(slider.value);
    var $picker = document.getElementById("colorPicker");
    picker  = tinycolorpicker($picker);
    picker.setColor(selectedColor);

}