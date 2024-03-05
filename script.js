
var grid = document.querySelector('.grid')
/* Color Panel*/

var colorPalette = document.querySelector('.colorCircle')
var pencilFill = document.getElementById('PencilBtn')

const rainbow = document.getElementById('RainbowBtn')
const eraser = document.getElementById('EraserBtn')
const clear = document.getElementById('clearBtn')
/*
const gridBtn = document.getElementById('gridBtn')
*/
var slider = document.getElementById('sizeSlider')
var sliderSize = document.querySelector('.size')
var current = pencilFill

let gridOn = false
let mouseDown = false

colorPalette.onclick = () => {buttonClicked(pencilFill)}
pencilFill.onclick = () => {buttonClicked(pencilFill)}
rainbow.onclick = () => {buttonClicked(rainbow)}
eraser.onclick = () => {buttonClicked(eraser)}
clearBtn.onclick = () => {createGrid(slider.value)}

function buttonClicked(buttonType) {
    if (buttonType == eraser) {
       clickUpdate(buttonType)
    } else if (buttonType == rainbow) {
        clickUpdate(buttonType)
    } else if (buttonType == pencilFill) {
        clickUpdate(buttonType)
    } 
}

function clickUpdate(buttonType) {
    current.style.backgroundColor = 'whitesmoke'
    current.style.color = 'black'
    current = buttonType
    current.style.backgroundColor = '#2E2929'
    current.style.color = 'white'
}

slider.addEventListener('mousemove', () => {
    sliderSize.textContent = `${slider.value}x${slider.value}`
    if (mouseDown) {
        createGrid(slider.value)
    }
})

slider.addEventListener('click', () => {
    sliderSize.textContent = `${slider.value}x${slider.value}`
    createGrid(slider.value)
})


function createGrid(size) {
    grid.innerHTML = ""
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i ++) {
        const gridObj = document.createElement('div')
        gridObj.classList.add('gridObj')
        gridObj.onmousedown = (e) => {
            mouseDown = true
            updateColor(e)
        }
        gridObj.onmouseup = () => { mouseDown = false}
        gridObj.addEventListener('mouseover', updateColor)
        grid.appendChild(gridObj)
    }
}

function updateColor(e) {
    e.preventDefault() /* Prevents dragging the div element */

    /* Current block */
    if (mouseDown && e.type === 'mousedown') {
        e.target.style.backgroundColor = colorPalette.value
    }

    if (mouseDown) {
        if (current == pencilFill) {
            e.target.style.backgroundColor = colorPalette.value
        } else if (current == rainbow) {
            const r = Math.floor(Math.random() * 255)
            const g = Math.floor(Math.random() * 255)
            const b = Math.floor(Math.random() * 255)
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        } else if (current == eraser) {
            e.target.style.backgroundColor = 'whitesmoke'
        }
    }
}

/*

gridBtn.addEventListener('click', () => {
    gridOn = !gridOn
    gridMode()
})

function gridMode() {
    grid.innerHTML = ""
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i ++) {
        const gridObj = document.createElement('div')
        gridObj.classList.add('gridObj')

        gridObj.onmousedown = (e) => {
            mouseDown = true
            updateColor(e)
        }
        gridObj.onmouseup = () => { mouseDown = false}

        gridObj.addEventListener('mouseover', updateColor)
        grid.appendChild(gridObj)

    }
}
*/
function main() {
    /* Initial State */
    pencilFill.style.backgroundColor = '#2E2929'
    pencilFill.style.color = 'white'
    createGrid(slider.value)
}
main()



