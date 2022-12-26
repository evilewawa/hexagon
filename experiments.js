var side_length = 25
const window_height = window.innerHeight*1.2
const window_width = window.innerWidth*1.2
console.log(window_width,window_height)
const svg_container = document.getElementById("svg-container")
svg_container.setAttribute("width", "" + window.innerWidth*2)
svg_container.setAttribute("height", "" + window.innerHeight*2)
var height = Math.sqrt((side_length**2 + (side_length/2)**2))
var width = Math.cos(Math.PI/6)*side_length
var hexagon_extreme_side_lengths = [20, 70]

var row_count = 25
var node_count_per_row = 25
var offset = [0,0]
updateVars()
drawSvg(node_count_per_row, row_count, offset)

function initialPosition(){
    let elem = document.elementFromPoint(parseInt(window_width/2),parseInt(window_height/2))
    let points = elem.getAttribute("points").split(",")
    let point = points[0].split(' ')
    return [parseFloat(point[0]), parseFloat(point[1])+side_length]

    
}

function updateVars(){
    height = Math.sqrt((side_length**2 + (side_length/2)**2))
    width = Math.cos(Math.PI/6)*side_length
    row_count = window_height / (side_length*(3/2))
    node_count_per_row = window_width / (width*2)
}

function turnCoordsToString(coords){
    let out = ""
    for (let coor_i = 0; coor_i < coords.length; coor_i++){
        let coord = coords[coor_i]
        out += coord[0]+ " " +coord[1]
        if (!(coor_i == coords.length -1)){
            out+= ", "
        }
    }
    return out
}
function offsetHexCoords(coords, offsetX, offsetY){
    for (let i = 0; i < coords.length; i++){
        coords[i][0]+= offsetX
        coords[i][1] += offsetY
    }
    return coords
}
function getHexCoords(i ,j, offset){
    let hex_coords = []
    if (i%2 == 0){
        hex_coords = [
            [width*2*j + width,0 + side_length/2*3*i],
            [width*2 + width*2*j, side_length/2 + side_length/2*3*i],
            [width*2 +width*2*j, side_length/2 + side_length+ side_length/2*3*i],
            [width+width*2*j, side_length*2+ side_length/2*3*i],
            [0+width*2*j, side_length*Math.cos(Math.PI/3) + side_length+ side_length/2*3*i],
            [0+width*2*j,side_length*Math.cos(Math.PI/3)+ side_length/2*3*i]] 
    }
    else{
        hex_coords = [
            [width*2*j + width + width,0 + side_length/2*3*i],
            [width*2+width*2*j + width, side_length/2 + side_length/2*3*i],
            [width*2 +width*2*j+ width, side_length/2 + side_length+ side_length/2*3*i],
            [width +width*2*j+ width, side_length*2+ side_length/2*3*i],
            [0 +width*2*j+ width, side_length*Math.cos(Math.PI/3) + side_length+ side_length/2*3*i],
            [0+width*2*j + width,side_length*Math.cos(Math.PI/3)+ side_length/2*3*i]] 
    }

    return offsetHexCoords(hex_coords, offset[0], offset[1])
}
function textInHex(hex_coords, i,j){
    let top = hex_coords[0]
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute("x", "" + top[0])
    text.setAttribute("y", "" + (top[1]+side_length))
    text.setAttribute('text-anchor', "middle")
    text.setAttribute('fill', "white")
    text.setAttribute("font-size", "" + side_length/2)
    text.innerHTML = (i*node_count_per_row+j) + ''
    return text

}
function drawSvg(node_count, row_count, offset){
    height = Math.sqrt((side_length**2 + (side_length/2)**2))
    width = Math.cos(Math.PI/6)*side_length
    svg_container.innerHTML = ""
    for (let i = 0; i < row_count; i++){
        for (let j = 0; j <node_count; j++){
            let hex_coords = getHexCoords(i, j, offset)
            let poly = document.createElementNS("http://www.w3.org/2000/svg","polygon")
            poly.setAttribute("points", turnCoordsToString(hex_coords))
            poly.classList.add("hex")
            // let text = textInHex(hex_coords, i ,j)
            // svg_container.appendChild(text)
            svg_container.appendChild(poly)
            
        }
    }
}


document.querySelector("#main-container").addEventListener("wheel", preventScroll, {passive:false})
function preventScroll(e){
    let lowerMax = hexagon_extreme_side_lengths[0]
    let upperMax = hexagon_extreme_side_lengths[1]
    e.preventDefault()
    //scroll down then delta y is postive
    // scroll up then delta y is negative
    if (lowerMax < side_length && side_length< upperMax){
        if (e.deltaY > 0 && side_length-1 != lowerMax){
            side_length -=1
        }
        else if (e.deltaY < 0 && side_length +1 != upperMax){
            side_length+=1
        }
        drawSvg(node_count_per_row, row_count, offset)
    }
    // else{
    //     if (side_length == 20)
    // }
    // side_length -= 1
    
    // console.log(e)
    return false
}
var drag = false
var dragCoords = [0,0]
var curr_pos = []
var ogoff =[offset[0],offset[1]]
var moving = false
var moveTo = [1400, 1000]

document.querySelector("#main-container").addEventListener("mousedown", mouseHandler)
// document.querySelector("#main-container").addEventListener("mouseover", mouseHandler)
// document.querySelector("#main-container").addEventListener("mouseup", mouseHandler)
// document.querySelector("#main-container").addEventListener("onclick", clickHandler)
function mouseHandler(e){
    // if (e.type == "mousedown"){
    //     drag = true
    //     dragCoords = [e.clientX, e.clientY]
    //     curr_pos = [e.clientX, e.clientY]
    // }
    // else if (e.type == "mouseover" && drag){
    //     // if (e.movementX !=0 || e.movementY != 0)
    //     // offset = [e.clientX-dragCoords[0], e.clientY-dragCoords[1]]
    //     // drawSvg(node_count_per_row, row_count, offset)
    //     // console.log(e)
    //     curr_pos = [e.clientX, e.clientY]
    // }
    // else if (e.type == "mouseup"){
    //     drag = false
    //     ogoff =[offset[0],offset[1]]
        // offset = [e.clientX-dragCoords[0], e.clientY-dragCoords[1]]
        // console.log(offset)
        // drawSvg(node_count_per_row, row_count, offset)
    // }
    // console.log(e)
    // console.log(e.clientX-e.offsetX)
    // console.log(e.cl)
    // console.log(e.type)
    if (e.type == "mousedown"){
        console.log(e.srcElement)
    }
}
var playerLocation = initialPosition()
createPlayer(playerLocation[0],playerLocation[1])
function createPlayer(x,y){
    p_w = side_length/2
    p_h = side_length/2
    p_coords = [
        [x-p_w,y-p_h],
        [x+p_w, y-p_h],
        [x+p_w, y+p_h],
        [x-p_w, y+p_h]
    ]
    let poly = document.createElementNS("http://www.w3.org/2000/svg","polygon")
    poly.setAttribute("points", turnCoordsToString(p_coords))
    poly.classList.add("player")
    svg_container.appendChild(poly)
}
var change = false
document.addEventListener('keydown', keyHandler)
function keyHandler(e){
    change = true
    magnitude = 5
    if (e.key == "ArrowDown"){
        offset[1] -= 5
    }
    else if (e.key == "ArrowUp"){
        offset[1] += 5
    }
    else if (e.key == "ArrowLeft"){
        offset[0] += 5
    }
    else if (e.key == "ArrowRight"){
        offset[0] -= 5
    }
    else{
        change = false
        console.log(e)
    }
}
// document.onclick = clickHandler(e)
// document.addEventListener("onclick", function(){
//     console.log(e)
// })
svg_container.addEventListener("click", clickHandler)
function clickHandler(e){
    console.log(e)
    // let elem = e.srcElement
    // elem.setAttribute("fill", "black")
}

setInterval(function(){
    if (change){
    // if (drag){
        // offset = [ogoff[0]+curr_pos[0]-dragCoords[0],ogoff[1]+curr_pos[1]-dragCoords[1]]
        drawSvg(node_count_per_row, row_count, offset)
        // }
        createPlayer(playerLocation[0],playerLocation[1])
        change = false
    }
}, 15)
