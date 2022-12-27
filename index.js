var side_length = 25
const window_height = window.innerHeight*1.2
const window_width = window.innerWidth*1.2

console.log(window_width,window_height)
const svg_container = document.getElementById("svg-container")
const svg_container_dimensions = svg_container.getBoundingClientRect()
svg_container.setAttribute("width", "" + window.innerWidth*2)
svg_container.setAttribute("height", "" + window.innerHeight*2)
var height = Math.sqrt((side_length**2 + (side_length/2)**2))
var width = Math.cos(Math.PI/6)*side_length
// var hexagon_extreme_side_lengths = [20, 70]

var row_count = 50
var node_count_per_row = 50
var offset = [0,0]
// updateVars()
drawSvg(node_count_per_row, row_count, offset)

function initialPosition(){
    let elem = document.elementFromPoint(parseInt(window_width/2),parseInt(window_height/2))
    let points = elem.getAttribute("points").split(",")
    let point = points[0].split(' ')
    return [parseFloat(point[0]), parseFloat(point[1])+side_length]

    
}

// function updateVars(){
//     height = Math.sqrt((side_length**2 + (side_length/2)**2))
//     width = Math.cos(Math.PI/6)*side_length
//     row_count = window_height / (side_length*(3/2))
//     node_count_per_row = window_width / (width*2)
// }

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
var moving = false
var moveTo = false

var playerLocation = initialPosition()
createPlayer(playerLocation[0],playerLocation[1])
function createPlayer(x,y){
    p_w = side_length/2
    p_h = side_length/2
    //coords are centered around the x,y not starting from
    p_coords = [
        [x-p_w,y-p_h],
        [x+p_w, y-p_h],
        [x+p_w, y+p_h],
        [x-p_w, y+p_h]
    ]
    let poly = document.createElementNS("http://www.w3.org/2000/svg","polygon")
    poly.setAttribute("points", turnCoordsToString(p_coords))
    poly.classList.add("player")
    poly.setAttribute("id", "player")
    svg_container.appendChild(poly)
}
var change = false
svg_container.addEventListener("click", clickHandler)
function clickHandler(e){
    console.log(e.srcElement)
    e.srcElement.classList.add("destination")
    moveTo = e.srcElement

}
function getPointsFromPolygon(elem){
    let points_string_arr = elem.getAttribute("points").split(",")
    let points = []
    for (let i = 0; i < points_string_arr.length; i++){
        let point = points_string_arr[i].split(" ")
        points.push([parseFloat(point[0]), parseFloat(point[1])])
    }
    return points
}
function getMiddileOfHexagon(hex){
    let points = getPointsFromPolygon(hex)
    let point = points[0]
    point[1] += side_length
    return point
}
function checkIfPlayerInHexagon(hex){
    let player = document.getElementById("player")
    let middle = getMiddileOfHexagon(hex)
    let point = svg_container.createSVGPoint()
    point.x = middle[0]
    point.y = middle[1]
    // console.log(point)
    return player.isPointInFill(point)
}
setInterval(function(){
    if (moveTo){
        if (!checkIfPlayerInHexagon(moveTo)){
            drawSvg(node_count_per_row, row_count, offset)
            createPlayer(playerLocation[0],playerLocation[1])
            movePlayerToHex(moveTo)
        }
        else{
            moveTo.classList.remove("destination")
            moveTo = false
        }
    }
}, 50)

function getSvgCoords(coords){
    let x_offset = svg_container_dimensions.x
    let y_offset = svg_container_dimensions.y
    return [coords[0] + x_offset, coords[1]+ y_offset]
}

function movePlayerToHex(hex){
    let magnitude = 10
    let middle = getMiddileOfHexagon(hex)
    let vector = [playerLocation[0]-middle[0], playerLocation[1]-middle[1]]
    if (vector[0]> 0){
        playerLocation[0] -= magnitude
    }
    else if (vector[0] < 0){
        playerLocation[0] += magnitude
    }
    if (vector[1]> 0){
        playerLocation[1] -= magnitude
    }
    else if (vector[1] < 0){
        playerLocation += magnitude
    }
}

