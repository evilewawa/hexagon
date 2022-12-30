class Tile{

    constructor(element, row, col){
        this.element = element
        this.row = row
        this.col = col
        this.classes = []
        this.heat = null
        this.sign_element = false
        this.sign_content = false
    }
    update(){
        let c = this.element.classList
        this.classes = []
        for (let i = 0; i < c.length; i++){
            this.classes.push(c[i])
        }
    }
}

var side_length = 25
const window_height = window.innerHeight*1.2
const window_width = window.innerWidth*1.2
const svg_container = document.getElementById("svg-container")
var height = Math.sqrt((side_length**2 + (side_length/2)**2))
var width = Math.cos(Math.PI/6)*side_length
var row_count = 50
var node_count_per_row = 50
var grid = []
var offset = [0,0]
svg_width = node_count_per_row*width*2 + width+ 5
svg_container.setAttribute("width", svg_width)
svg_height = row_count*(side_length*1.5)+ height + 5
svg_container.setAttribute("height", svg_height)
const svg_container_dimensions = svg_container.getBoundingClientRect()
drawSvg(node_count_per_row, row_count, offset)
var playerLocation = initialPosition()
var player = createPlayer(playerLocation[0],playerLocation[1])


function initialPosition(){
    // finds the initial position of the player, should be in the middle hexagon of the page 
    let pos = [0,0]
    // this is a precaution in case the window is greater than the svg element, should be unlikely
    if (svg_container_dimensions.width > window_width){
        pos[0] = window_width/2
    }
    else{
        pos[0] = svg_container_dimensions.width/2
    }
    if (svg_container_dimensions.height > window_height){
        pos[1] = window_height/2
    }
    else{
        pos[1] = svg_container_dimensions.height/2
    }

    // finds the corresponding hexagon from the middle of the page
    let elem = document.elementFromPoint(parseInt(pos[0]),parseInt(pos[1]))
    let points = elem.getAttribute("points").split(",")
    let point = points[0].split(' ')
    return [parseFloat(point[0]), parseFloat(point[1])+side_length]

}


function drawSvg(node_count, row_count, offset){
    // draws the svg hexagon grid 
    height = Math.sqrt((side_length**2 + (side_length/2)**2))
    width = Math.cos(Math.PI/6)*side_length
    // empties svg container
    svg_container.innerHTML = ""
    for (let i = 0; i < row_count; i++){
        let row = []
        for (let j = 0; j <node_count; j++){
            let hex_coords = getHexCoords(i, j, offset)
            let poly = document.createElementNS("http://www.w3.org/2000/svg","polygon")
            poly.setAttribute("points", turnCoordsToString(hex_coords))
            poly.setAttribute("id", "" + i + " " + j)
            poly.classList.add("hex")
            // boundaries of the island
            

            if (4 < i && i < 45 ) {
                if(4 < j && j < 45){
                    poly.classList.add("land")
                }
                else{
                    poly.classList.add("water")
                }
            }
            else{
                poly.classList.add("water")
            }
            let col = new Tile(poly, i, j)
            col.update()
            row.push(col)
            // let text = textInHex(hex_coords, i ,j)
            // svg_container.appendChild(text)
            svg_container.appendChild(poly)
        }
        grid.push(row)
    }
}
function turnCoordsToString(coords){   
    // changes coords into strings (opposite of string to array function)
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

function getHexCoords(i ,j, offset){
    // function for baseline hexagon coordinates 
    // returns overall hex coordinates (each indivdual is changed based on changedHexCoords  fucntion)
    let hex_coords = []
    if (i%2 == 0){
        hex_coords = [
            [width,0 ],
            [width*2 , side_length/2 ],
            [width*2 , side_length/2 + side_length],
            [width, side_length*2],
            [0, side_length*Math.cos(Math.PI/3) + side_length],
            [0,side_length*Math.cos(Math.PI/3)]] 
    }
    else{
        hex_coords = [
            // all x coords have an extra width
            [ width + width,0 ],
            [width*2+  width, side_length/2 ],
            [width*2+ width, side_length/2 + side_length],
            [width + width, side_length*2],
            [0 + width, side_length*Math.cos(Math.PI/3) + side_length],
            [0+  width,side_length*Math.cos(Math.PI/3)]] 
    }

    hex_coords = changeHexCoords(i,j, hex_coords)
    for (let i = 0; i < hex_coords.length ; i++){
        let coord = hex_coords[i]
        coord[0] = parseInt(coord[0])
        coord[1] = parseInt(coord[1])
        hex_coords[i] = coord
    }
    return hex_coords
}
function changeHexCoords(i,j,hex_coords){
    let shiftx = width*2*j
    let shifty = side_length/2*3*i
    for (let i = 0; i < hex_coords.length; i++){
        hex_coords[i][0] += shiftx
        hex_coords[i][1] += shifty
    }
    return hex_coords
}



var moveTo = false

function createPlayer(x,y){
    // creates a player
    // code is probably redundant with the updatePlayer function below

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
    return poly
}
function updatePlayer(x,y, offsetx, offsety){
    // updates the player around a central point
    // the code below is for a square
    p_w = side_length/2
    p_h = side_length/2
    x = x-offsetx
    y = y-offsety
    //coords are centered around the x,y not starting from
    p_coords = [
        [x-p_w,y-p_h],
        [x+p_w, y-p_h],
        [x+p_w, y+p_h],
        [x-p_w, y+p_h]
    ]
    player.setAttribute("points", turnCoordsToString(p_coords))
}

svg_container.addEventListener("click", clickHandler)
function clickHandler(e){
    // gets the destination element after the click assuming destination not defined and its on land
    if (e.srcElement.classList.contains("land") && !moveTo){
        e.srcElement.classList.add("destination")
        moveTo = e.srcElement
    }

}
function getPointsFromPolygon(elem){
    // gets a array of points of the svg element (assuming elem is polygon <- probably should check)
    // (string to array[n][2] where n is the number of points)
    let points_string_arr = elem.getAttribute("points").split(",")
    let points = []
    for (let i = 0; i < points_string_arr.length; i++){
        let point = points_string_arr[i].split(" ")
        points.push([parseFloat(point[0]), parseFloat(point[1])])
    }
    return points
}
function getMiddileOfHexagon(hex){
    // finds the middle coordinates of the given hexagon (points are relative to svg element)
    let points = getPointsFromPolygon(hex)
    let point = points[0]
    point[1] += side_length
    return point
}
function checkIfPlayerInHexagon(hex){
    // checks if player is in the given hexagon
    let player = document.getElementById("player")
    let middle = getMiddileOfHexagon(hex)
    let point = svg_container.createSVGPoint()
    point.x = middle[0]
    point.y = middle[1]
    return player.isPointInFill(point)
}


function getSvgCoords(coords){
    // finds the relative svg coords since most coords are based off of the overall document 
    let x_offset = svg_container_dimensions.x
    let y_offset = svg_container_dimensions.y
    return [coords[0] + x_offset, coords[1]+ y_offset]
}


function moveSvg(offsetx, offsety){
    //move the overall svg element <- tad ineffiecient 
    svg_container.style.top = offsety
    svg_container.style.left = offsetx
    updatePlayer(playerLocation[0],playerLocation[1], offsetx, offsety)

}

function movePlayer(hex){
    // find the movement vector that the hex should move for that interval
    let magnitude = 10
    let middle = getMiddileOfHexagon(hex)
    // finds the overall vector using the player location offseted by the current offset and the middle of the destination hexagon
    let vector = [playerLocation[0]-offset[0]-middle[0], playerLocation[1]-offset[1]-middle[1]]
    // console.log(vector)
    let movement = [0,0]
    //checks if the x and y direction is greater than the magnitude, stops jittering
    if (Math.abs(vector[0]) > magnitude){ 
        // checks if the x and y direction is greater than 0, finds the minimal vector such that it is a subset of 
            // [m, m], [-m, m], [-m, -m], [m, -m] where m is magnitude
        if (vector[0]> 0){
            movement[0] = -1*magnitude
        }
        else if (vector[0] < 0){
            movement[0] = magnitude
        }
    }
    if (Math.abs(vector[1])>magnitude){
        if (vector[1]> 0){
            movement[1] = -1*magnitude
        }
        else if (vector[1] < 0){
            movement[1] = magnitude
        }
    }
    return movement
}
let half = 0
let signs = []
let sign_visible = false
let onSign = false
let count = 0
let interv = NaN
setInterval(function(){
    // i think its possible to only call this interval at certain times
    // creates an interval that moves the player to the hexagon
    if (half%2== 0){
        if (moveTo){
            if (!checkIfPlayerInHexagon(moveTo)){
                // find the vector that the player should move and moves it
                let movementVector = movePlayer(moveTo)
                offset[0] -= movementVector[0]
                offset[1] -= movementVector[1]
                moveSvg(offset[0], offset[1])
            }
            else{
                moveTo.classList.remove("destination")
                moveTo = false
                // for the sign div content stuff
                let sign = checkIfPlayerOnSign(signs)
                if (sign){
                    onSign = sign
                    sign_visible = true
                    sign.sign_element.style.display = ""
                    // sign.sign_element.innerText= sign.sign_content
                    interv = setInterval(div_animation, 50, sign.sign_element, sign.sign_content)
                }
            }
            if (sign_visible){
                if (!checkIfPlayerInHexagon(onSign.element)){
                    sign_visible = false
                    onSign.sign_element.style.display = "none"
                    onSign.sign_element.innerText = ""
                    onSign = false
                    clearInterval(interv)
                    count = 0
                }
            }
        }


    }
    half+=1
}, 17)
function div_animation(elem, total_text){
    if (count == total_text.length+1){
        clearInterval(interv)
        count = 0
        console.log("walid")
    }
    else{
        elem.innerText = total_text.substring(0, count)
        count++
    }
}
function checkIfPlayerOnSign(signs){
    for (let i = 0; i < signs.length; i++){
        let sign = signs[i]
        if (checkIfPlayerInHexagon(sign.element)){
            // console.log(sign.row, sign.col)
            return sign
        }
    }
    return false
}
// next steps
// biome generation
function changeHexAroundCentral(grid, central, radius,coords, heat){
    let row = central.row
    let col = central.col
    // going to make a set of all coordinates in range of the radius by doing simple coordinate subtraction and making 
    // sure that the sum of the coordinate is within the radius of the central coordinate
    let total = radius*2+1
    for (let i = 0; i < total; i++){
        let r = row +radius-i
        // console.log(r)
        if (row %2 != 0){
            if (r%2!=0){
                for (let j = 0; j < total; j ++){
                    let c = col+radius-j
                    let coord = [r, c]
                    if (grid[r][c].element.classList.contains("land")){
                        coords.push(coord)
                    }
                }
            }
            else{
                for (let j = 1;j < total; j++){
                    let c = col+radius-j + 1
                    let coord = [r, c]
                    if (grid[r][c].element.classList.contains("land")){
                        coords.push(coord)
                    }
                }
            }
        }
        else{
            if (r%2== 0){
                for (let j = 0; j < total; j ++){
                    let c = col+radius-j
                    let coord = [r, c]
                    if (grid[r][c].element.classList.contains("land")){
                        coords.push(coord)
                    }
                }
            }
            else{
                for (let j = 1;j < total; j++){
                    let c = col+radius-j 
                    let coord = [r, c]
                    
                    if (grid[r][c].element.classList.contains("land")){
                        coords.push(coord)
                    }
                }
            }
        }
    }
    for (let i = 0; i < coords.length; i++){
        findBiome(grid, coords[i], heat)
    }
}


var biomes = ["tundra", "desert", "jungle"]
function isNotBiome(hex){
    for (let i = 0; i < biomes.length;i++){
        if (hex.element.classList.contains(biomes[i])){
            return false
        }
    }
    return true
}
function findBiome(grid, coord, heat){
    let elem = grid[coord[0]][coord[1]]
    
    let empty = true
    for (let i = 0; i < biomes.length ;i++){
        if (elem.element.classList.contains(biomes[i])){
            empty = false
        }
    }
    if (empty){
        elem.element.classList.add(biomes[heat])
        elem.update()
    }
}
function generateBiomes(grid){
    for (let i = 6; i < 44; i ++){
        let row = grid[i]
        for (let j = 6; j < 44; j++){
            let hex = row[j]
            // 5 is the max radius that can be changed around a tile
            let random = parseInt(Math.random()*50)
            if (random == 1 && isNotBiome(hex)){
                let heat = parseInt(Math.random()*3)
                let rad = parseInt(Math.random()*4) + 1
                makeBiome(heat, rad, hex)
            }
        }
    }
}
// resume content addition

// player shape change
// player animation?
// proper pathfinding algo <
//    ^- probably break up the path into seperate straight lines that way it can work w the method rn

//biome generation



function makeBiome(heat, rad, central){
    let coords = []
    let h = grid[central.row][central.col]
    // h.element.classList.add("walid")
    changeHexAroundCentral(grid, h, 1, coords, heat)
    for (let radius = 1; radius < rad; radius++){
        let temp = []
        for (let i = 0; i < coords.length; i ++){
            h = grid[coords[i][0]][coords[i][1]]
            changeHexAroundCentral(grid, h ,1, temp, heat)
        }
        coords = [...temp]
    }
}




function removeFromArray(arr, elem){
    let index = elemIsIn(arr,elem);
    if (index > -1) { // only splice array when item is found
    arr.splice(index, 1); // 2nd parameter means remove one item only
    }
    // return arr
}
function elemIsIn(arr, elem){
    // assumes elem is a list
    for (let i = 0; i < arr.length; i++){
        let e = arr[i]
        if (arr[i].length == elem.length){
            let same = true
            for (let j = 0; j < arr[i].length; j++){
                if (arr[i][j] != elem[j]){
                    same = false
                }
            }
            if (same){
                return i
            }
        }
    }
    return -1
}

generateBiomes(grid)

//creating method for divs
let resume_content_divs_ids = {
    "walid":"walid is a cutie pie",
    "sharusan": "sharusan is a cutie pie",
    "ahmy":"ahmy is a cutie pie", 
    "ayaan":"Ion albert inside F", 
    "umer":"umer has an absolutely massive dumptruck"}
//temporary 
let resume_div_location = {
    "walid": [10, 10],
    "sharusan": [20, 10],
    "ahmy" : [30, 10],
    "ayaan":[30, 30],
    "umer":[20, 20]
}

function assignSigns(){
    for (let [key, value] of Object.entries(resume_content_divs_ids)){
        let loc = resume_div_location[key]
        grid[loc[0]][loc[1]].sign_element = document.getElementById(key)
        document.getElementById(key).style.display = "none"
        grid[loc[0]][loc[1]].sign_content = value
        grid[loc[0]][loc[1]].element.classList.add("sign")
        grid[loc[0]][loc[1]].update()
        signs.push(grid[loc[0]][loc[1]])
    }
}
assignSigns()
