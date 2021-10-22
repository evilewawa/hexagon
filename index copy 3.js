
const container = document.getElementById("container");
const cubeContainer = document.getElementById("cubeContainer")
const width = container.clientWidth
const height = container.clientHeight
const area = 400;
const sqSide = Math.sqrt(area)
const hxSide = Math.sqrt((area*2)/(3*Math.sqrt(3)))
const hexWidth = Math.cos(30*(Math.PI/180))*hxSide*2
// const hexWidth = 20;
const hexHeight = hexWidth*1.1547
const numRows = parseInt(height/(2+(hxSide+(hxSide*Math.sin(30*(Math.PI/180))))))
const numCols = parseInt(width/(hexWidth+2))
const numRowsSq = parseInt(height/(sqSide+2))
// const
// function makeRows(rows, cols) {
//   container.style.setProperty('--grid-rows', rows);
//   container.style.setProperty('--grid-cols', cols);
//   for (c = 0; c < (rows * cols); c++) {
//     let cell = document.createElement("div");
//     cell.innerText = (c + 1);
    
//     container.appendChild(cell).className = "grid-item";
//   };
// };

// makeRows(16, 16);
function makeRows(rows, cols){
  //container.style.setProperty("--amount", rows)
  for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("li");
        let cellIn = document.createElement("div");
        cellIn.innerText = (c + 1);
        //cell.style.setProperty("grid-row", ((c+ c).toString() + "/ span 2"))
        if (c%2==0){
          // cell.style.backgroundColor = "aqua"
          cellIn.style.backgroundColor = "aqua"
          //cell.style.setProperty("grid-row", ((c + c - 1).toString() + "/ span 2"))
        }
        let element = document.querySelector(".hex-grid__list")
        let styl = getComputedStyle(element)

        let amount = styl.getPropertyValue("--amount")//container.style.getPropertyValue("--amount")
        container.style.setProperty("--counter", (c%amount) + 1)
        console.log(c%amount+1)
        
        let counter = styl.getPropertyValue("--counter")
        console.log(counter)
        for (i = 1; i < amount+1;i++){
          if ((c-i)%amount == 0){
            cell.style.setProperty("grid-column", ((i+i-1).toString() + ' / span 3'));
            if (i%2 == 0){
              cell.style.setProperty("grid-row", ((counter+ counter -1).toString()) + " / span 2")
            }
          }
        }
        cell.appendChild(cellIn).className = "hex-grid_content";
        cell.style.setProperty("grid-column", "")
        container.appendChild(cell).className = "hex-grid_item";
  }
}


function makeHexs(){
  for (let i = 0; i < numRows; i++){
    let row = []
    let path = []
    if (i %2 == 0){
      for (let c = 0; c < numCols; c++){
        let cell = document.createElement("div")
        // cell.style.width=hexWidth
        // cell.style.height = hexHeight
        cell.classList.add("hex")
        
        cell.setAttribute("id", c.toString() + "," + i.toString() + "HX")
        container.appendChild(cell)
        row.push([c,i])
        path.push([])
      }
    }
    else{
      for (let c = 0; c < numCols; c++){
        let cell = document.createElement("div")
        // cell.style.width=hexWidth
        // cell.style.height = hexHeight
        cell.classList.add("hex")
        
        cell.setAttribute("id", c.toString() + "," + i.toString() + "HX")
        container.appendChild(cell)
        row.push([c,i])
        path.push([])
      }
    }
    hxpath.push(path)
    grid.push(row)
    
  }
  // for (c = 0; c < num; c++){
  //   let cell = document.createElement("div")
  //   cell.classList.add("hex")
  //   // cell.setAttribute("id", )
  //   container.appendChild(cell)
  // }
  // document.getElementsByClassName('hex').style.height = hexHeight;
}


class square{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.done = false
    this.prev = null
  }
  coords(){
    return [this.x,this.y]
  }
  id(){
    return this.x.toString() + "," + this.y.toString() + "SQ"
  }
}


function makeSquares(){
  for (let i = 0; i < numRowsSq; i++){
    let row = []
    let path = []
    for (let c = 0; c < numRowsSq;c++){
      let cell = document.createElement("div")
      cell.classList.add("square")
      cell.setAttribute("id", c.toString() + "," + i.toString() + "SQ")
      cubeContainer.appendChild(cell)
      let sq = new square(c, i)
      row.push([c,i])
      path.push([])
    }
    sqgrid.push(row)
    sqPath.push(path)
  }
}

function djikstraSq(endSq){
//   let sqID = sq.id()
//   if (!((sq.coords()[0] == endSq.coords()[0]) && (sq.coords()[1] == endSq.coords()[1]))){
//     let coords = sq.coords()
//     let neighbours = []
//     //right
//     if (!(coords[0]+1 >= sqgrid[0].length)){
//       let newcoords = [coords[0]+1, coords[1]]
//       let newsq = sqgrid[newcoords[0]][newcoords[1]]
//       newsq.done=true
//       newsq.prev = sq
//       neighbours.push(newsq)
//     }
//     // left
//     if (!(coords[0]-1 < 0)){
//       let newcoords = [coords[0]+1, coords[1]]
//       let newsq = sqgrid[newcoords[0]][newcoords[1]]
//       newsq.done=true
//       newsq.prev = sq
//       neighbours.push(newsq)
//     }
//   }
//   else{
//     let node = document.getElementById(sqID)
//     node.style.backgroundColor = "yellow"
//   }
  // // let ApproximateDistance = (Math.random())*()
  // // let node = [0,28]
  // let startingID = node[0].toString() + "," + node[1].toString() + "SQ"
  // // console.log(startingID)
  // let startingNode = document.getElementById(startingID)
  // startingNode.style.backgroundColor = "blue"
  
  //right
  
  
  // return node;
  let reachedEnd = false
  while (queue.length > 0){
    let node = queue[0]
    queue.shift()
    sqdone.push(node)
    if (node[0] == endSq[0] && node[1] == endSq[1]){
      // console.log("path found")
      return sqPath[node[0]][node[1]]
      // console.log(queue)
      // console.log(node)
    }
    // console.log(node)
    // console.log(queue)
    check_neighbours(node)
  }
  // console.log("path not found")
}

function changeColor(node, color, type){
  // console.log(node)
  let id = node[1].toString() + "," + node[0].toString() + type
  document.getElementById(id).style.backgroundColor = color
}
//grid
//1. 
//c'est un peu ineffiecient cuz the end node might be in the queue after the other nodes so gotta add some checkers in tto the check neighbours stuff as well

function check_neighbours(node){
  // console.log(node)
  //right
  // console.log(node)
  if ((node[0]+1 < sqgrid.length) && !(checkIfIn(sqdone,[node[0]+1, node[1]]) )){
    queue.push([node[0]+1,node[1]])
    let newNode = [node[0]+1, node[1]]
    // console.log(newNode)
    // console.log("right")
    // sqPath[node[0]+1][node[1]] = sqPath[node[0]][node[1]] 
    changeColor(newNode, "red", "SQ")
    sqPath[node[0]+1][node[1]].push( [node[0], node[1]])

  }
  //left
  if ((node[0]-1 >= 0)  && !(checkIfIn(sqdone,[node[0]-1,node[1]]))){
    queue.push([node[0]-1,node[1]])
    // console.log("left")
    // sqPath[node[0]-1][node[1]] = sqPath[node[0]][node[1]] 
    let newNode = [node[0]-1, node[1]]
 
    changeColor(newNode, "blue", "SQ")
    sqPath[node[0]-1][node[1]].push( [node[0], node[1]])
  }
  //up
  if ((node[1]-1 >= 0)&& !(checkIfIn(sqdone,[node[0],node[1]-1]) )){
    queue.push([node[0],node[1]-1])
    // sqPath[node[0]][node[1]-1] = sqPath[node[0]][node[1]] 
    let newNode = [node[0], node[1]-1]
 
    changeColor(newNode, "purple", "SQ")
    sqPath[node[0]][node[1]-1].push([node[0], node[1]])
  }
  //down
  if ((node[1]+1 < sqgrid[0].length) && !(checkIfIn(sqdone,[node[0],node[1]+1]))){
    queue.push([node[0],node[1]+1])
    let newNode = [node[0], node[1]+1]
 
    changeColor(newNode, "orange", "SQ")
    // sqPath[node[0]][node[1]+1] = sqPath[node[0]][node[1]] 
    sqPath[node[0]][node[1]+1].push( [node[0], node[1]])
  }
  let newQueue = 0
  newQueue = []
  // console.log("newqueue")
  // console.log(newQueue)
  // console.log("queue")
  // console.log(queue)
  for (let i = 0; i < queue.length; i++){
    let element = queue[i]
    if (!(checkIfIn(newQueue, element))){
      newQueue.push(element)
    }
  }
  // console.log("newqueue")
  // console.log(newQueue)
  queue = newQueue
  // console.log("queue")
  // console.log(queue)
  // for (let i = 0; i < queue.length; i++){
  //   // console.log(queue[i])
  //   // console.log(queue.length)
  //   let id = queue[i][0].toString() + "," + queue[i][1].toString() + "SQ"
  //   // console.log(id)
  //   let node = document.getElementById(id)
  //   node.style.backgroundColor = ("green")
  // }
}

// console.log("walid")

function checkIfIn(li, node){
  for (i = 0; i < li.length; i++){
    if ((li[i][0] == node[0]) && (li[i][1] == node[1])){
      return true
    }
  }
  return false
}

function djikstraHx(endSq){
  while (hxqueue.length > 0){
    // console.log(queue)
    let node = hxqueue[0]
    hxqueue.shift()
    hxdone.push(node)
    if (node[0] == endSq[0] && node[1] == endSq[1]){
      // console.log("hello")?
      return hxpath[node[1]][node[0]]
      // console.log(queue)
      // console.log(node)
    }
    // console.log(node)
    // console.log(queue)
    check_neighboursHX(node)
  }
}


function check_neighboursHX(hxnode){
  // console.log(hxnode)
  // console.log(hxnode)
  //this is bad and only works with the hardcoded version
  let even = hxnode[1] %2 == 0
  // console.log(even)
  //even rows are shifted to the right meaning that the bottom and top peices are -1 and the same number in terms of hxnode[1]
  if (even){
    // console.log("even")
    //up left - need to check if can go up, and need to check that i can go left
    
    if (hxnode[1]-1 >= 0 && hxnode[0]-1 >= 0 && !(checkIfIn(hxdone, [hxnode[0]-1, hxnode[1]-1]))){
      hxqueue.push([hxnode[0]-1, hxnode[1]-1])
      hxpath[hxnode[1]-1][hxnode[0]-1].push([hxnode[0],hxnode[1]])
    }
    //up right - need to check if i can go up and need to check that i can go right
    if (hxnode[1]-1 >= 0 && hxnode[0] < grid[0].length && !(checkIfIn(hxdone, [hxnode[0], hxnode[1]-1]))){
      hxqueue.push([hxnode[0], hxnode[1]-1])
      hxpath[hxnode[1]-1][hxnode[0]].push([hxnode[0],hxnode[1]])
    }
    //bottom left
    if (hxnode[1]+1 < grid.length && hxnode[0]-1 >= 0 && !(checkIfIn(hxdone, [hxnode[0]-1, hxnode[1]+1]))){
      hxqueue.push([hxnode[0]-1, hxnode[1]+1])
      hxpath[hxnode[1]+1][hxnode[0]-1].push([hxnode[0],hxnode[1]])
    }
    //bottom right
    if (hxnode[1]+1 < grid.length && hxnode[0] < grid[0].length && !(checkIfIn(hxdone, [hxnode[0], hxnode[1]+1]))){
      hxqueue.push([hxnode[0], hxnode[1]+1])
      hxpath[hxnode[1]+1][hxnode[0]].push([hxnode[0],hxnode[1]])
    }
    //rgith

    // BIG DOODOO needa fix 
    // the hxpath first thing asks for the row not the x values so you gotta switch the hxnode[0] and hxnode[1] around for all of  them lmao whoops
    if (hxnode[0]+1 < grid[hxnode[1]].length && !(checkIfIn(hxdone, [hxnode[0]+1, hxnode[1]]))){
      // console.log(hxnode)
      hxqueue.push([hxnode[0]+1, hxnode[1]])
      // console.log([hxnode[0]+1] +","+ [hxnode[1]])
      // console.log([hxnode[0]+1, hxnode[1]])
      
      hxpath[hxnode[1]][hxnode[0]+1].push([hxnode[0],hxnode[1]])
    }
    //left
    
    if (hxnode[0]-1 >= 0 && !(checkIfIn(hxdone, [hxnode[0]-1, hxnode[1]]))){
      // console.log("left")
      hxqueue.push([hxnode[0]-1, hxnode[1]])
      hxpath[hxnode[1]][hxnode[0]-1].push([hxnode[0],hxnode[1]])
    }
  }
  else{
    //up left - need to check if can go up, and need to check that i can go left
    if (hxnode[1]-1 >= 0 && !(checkIfIn(hxdone, [hxnode[0], hxnode[1]-1]))){
      hxqueue.push([hxnode[0], hxnode[1]-1])
      hxpath[hxnode[1]-1][hxnode[0]].push([hxnode[0],hxnode[1]])
    }
    //up right - need to check if i can go up and need to check that i can go right
    if (hxnode[1]-1 >= 0  && hxnode[0] +1 <grid.length[hxnode[1]]  && !(checkIfIn(hxdone, [hxnode[0]+1, hxnode[1]-1]))){
      hxqueue.push([hxnode[0]+1, hxnode[1]-1])
      hxpath[hxnode[1]-1][hxnode[0]+1].push([hxnode[0],hxnode[1]])
    }
    //bottom left
    if (hxnode[1]+1 < grid.length && !(checkIfIn(hxdone, [hxnode[0], hxnode[1]+1]))){
      hxqueue.push([hxnode[0], hxnode[1]+1])
      hxpath[hxnode[1]+1][hxnode[0]].push([hxnode[0],hxnode[1]])
    }
    //bottom right
    if (hxnode[1]+1 < grid.length && hxnode[0] +1 <grid[hxnode[1]].length && !(checkIfIn(hxdone, [hxnode[0]+1, hxnode[1]+1]))){
      hxqueue.push([hxnode[0]+1, hxnode[1]+1])
      hxpath[hxnode[1]+1][hxnode[0]+1].push([hxnode[0],hxnode[1]])
      
    }
    //right
    if (hxnode[0]+1 < grid[hxnode[1]].length  && !(checkIfIn(hxdone, [hxnode[0]+1, hxnode[1]]))){
      hxqueue.push([hxnode[0]+1, hxnode[1]])
      hxpath[hxnode[1]][hxnode[0]+1].push([hxnode[0],hxnode[1]])
    }
    //left
    if (hxnode[0]-1 >= 0 && !(checkIfIn(hxdone, [hxnode[0]-1, hxnode[1]]))){
      hxqueue.push([hxnode[0]-1, hxnode[1]])
      hxpath[hxnode[1]][hxnode[0]-1].push([hxnode[0],hxnode[1]])
    }
  
  }
  // console.log("1" + hxqueue)
  let newQueue = []
  for (let i = 0; i < hxqueue.length; i++){
    let element = hxqueue[i]
    if (!(checkIfIn(newQueue, element))){
      newQueue.push(element)
    }
  }
  hxqueue = newQueue
  // console.log("2" + hxqueue)
  //odd rows are shifted to the left meaning that the bottom and top peices are the same and +1
  //two up
  //up left
  //up right
  //right
  //left
  //two down
  //down left
  //down right
  //even rows are shifted to the right meaning that the bottom and top peices are -1 and the same number in terms of node[1]
  //odd rows are shifted to the left meaning that the bottom and top peices are the same and +1

}

function clearEverything(){
  clearHexs()
  clearSq()
}
function clearHexs(){
  hxpath = []
  for (let row = 0; row < grid.length; row++){
    let hxrow = []
    for (let col = 0; col < grid[row].length; col++){
      let index = [col, row]
      let element = document.getElementById(idMaker(index, "HX"))
      element.style.backgroundColor = "";
      hxrow.push([])
    }
    hxpath.push(hxrow)
  }
}
function clearSq(){
  sqPath = []
  for (let row = 0; row < sqgrid.length; row++){
    let sqrow = []
    for (let col = 0; col < sqgrid[row].length; col++){
      let index = [col, row]
      let element = document.getElementById(idMaker(index, "SQ"))
      element.style.backgroundColor = "";
      sqrow.push([])
    }
    sqPath.push(sqrow)
  }
}
function idMaker(index, type){
  return index[0] + "," + index[1] + type
}

var d;
var t;
var grid = []
var hxpath = []
makeHexs()
var sqgrid = []
var sqPath = []
makeSquares()


var queue;
var sqdone;

var hxqueue = [];
var hxdone = []

function squares(nodes){
  // console.log(nodes)
  let node = nodes[0]
  let endnode = nodes[1]
  d= new Date()
  t = d.getTime()
  // node = [1,1]
  queue = [node]
  sqdone = []
  // console.log(endnode)
  sqPath[node[0]][node[1]] = node
  let path = djikstraSq(endnode)
  for (let i = 0; i < sqdone.length; i++){
    let id = sqdone[i][1].toString() + "," + sqdone[i][0].toString() + "SQ"
    let element = document.getElementById(id)
    element.style.backgroundColor = "green"
  }
  // console.log(path)
  let curPath = path[0]
  while (!(curPath[0]==node[0] && curPath[1]==node[1]) ){
    let id = curPath[1].toString() + "," + curPath[0].toString() + "SQ"
    let element = document.getElementById(id)
    element.style.backgroundColor = "yellow"
    // console.log(curPath)
    let newNode = sqPath[curPath[0]][curPath[1]]
    // console.log(newNode[0])
    curPath = newNode[0]
  }
  d = new Date()
  // console.log(d.getTime() - t)
  let time = d.getTime()-t
  // console.log("sq time ^")
  STimes.push(time)
}
var STimes = []


function getSqsByDistance(distance){
  let counter = 0;
  let possibles;
  let index;
  do{
    counter++;
  let randomX = parseInt(Math.random()*sqgrid[0].length)
  let randomY = parseInt(Math.random()*sqgrid.length)
  index = [randomX,randomY]
  let id = idMaker(index, "SQ")
  // let id = randomY.toString
  let element = document.getElementById(id)
  let startrect = element.getBoundingClientRect()
  element.style.backgroundColor = "purple"
  let startX = startrect.x
  let startY = startrect.y
  possibles = []
  for (let i = 0; i < sqgrid.length; i++){
    for (let c = 0; c < sqgrid[0].length; c++){
      let Sindex = sqgrid[i][c]
      let Sid = idMaker(Sindex, "SQ")
      let Selement = document.getElementById(Sid)
      let endRect = Selement.getBoundingClientRect()
      let endX = endRect.x
      let endY = endRect.y
      // console.log(endX)
      let Dbetween = Math.sqrt((endX - startX)**2 + (endY - startY)**2)
      // console.log(Dbetween.toString() + "Dbetween")
      // console.log(distance)
      if (((distance - hexWidth) <= Dbetween) && (Dbetween  <= (distance + hexWidth)))  {
        possibles.push(Sindex)
      }
    }
  }
  if (counter > 100){
    return NaN
  }
  }while(possibles.length <= 0)
  let endIndex = possibles[parseInt(Math.random()*possibles.length)]
  let endElement = document.getElementById(idMaker(endIndex, "SQ"))
  endElement.style.backgroundColor = "orange"
  // console.log(possibles)
  endIndex = [endIndex[1], endIndex[0]]
  index = [index[1], index[0]]
  return [index, endIndex]
  
}
function getHxsByDistance(distance){
  let counter = 0;
  let possibles;
  let index;
  do{
    counter++
    let randomY = parseInt(Math.random()*grid.length)
    let randomX = parseInt(Math.random()*grid[randomY].length)
    index = [randomX, randomY]
    let id = idMaker(index,"HX")
    let element = document.getElementById(id)
    element.style.backgroundColor = "purple"
    let startrect = element.getBoundingClientRect()
    let startX = startrect.x
    let startY = startrect.y
    possibles = []
    for (let i = 0; i < grid.length; i++){
      for (let c = 0; c < grid[i].length; c++){
        let Sindex = grid[i][c]
        // console.log(c,i, Sindex)
        let Sid = idMaker(Sindex, "HX")
        let Selement = document.getElementById(Sid)
        let endRect = Selement.getBoundingClientRect()
        let endX = endRect.x
        let endY = endRect.y
        // console.log(endX)
        let Dbetween = Math.sqrt((endX - startX)**2 + (endY - startY)**2)
        // console.log(Dbetween.toString() + "Dbetween")
        // console.log(distance)
        if (((distance - hexWidth) <= Dbetween) && (Dbetween  <= (distance + hexWidth)))  {
          possibles.push(Sindex)
        }
      }
    }
    if (counter > 100){
      return NaN
    }
  }while(possibles.length <=0)
  let endIndex = possibles[parseInt(Math.random()*possibles.length)]
  let endElement = document.getElementById(idMaker(endIndex, "HX"))
  endElement.style.backgroundColor = "orange"
  // console.log(possibles)
  // endIndex = [endIndex[1], endIndex[0]]
  // index = [index[1], index[0]]
  return [index,endIndex]
}



function hexagons(nodes){
  let node = nodes[0]
  // document.getElementById(node[1].toString() + "," + hxdone[i][0].toString() + "HX")
  let endnode = nodes[1]
  d= new Date()
  t = d.getTime()
  // node = [31,32]
  hxqueue = [node]
  hxdone = []
  hxpath[node[1]][node[0]] = node
  // let endnode= [0,0]
  let path = djikstraHx(endnode)
  // console.log(path)
  for (let i = 0; i < hxdone.length; i++){
    let id = hxdone[i][0].toString() + "," + hxdone[i][1].toString() + "HX"
    // console.log(id)
    let element = document.getElementById(id)
    element.style.backgroundColor = "green"
  }
  // console.log(path)
  curPath = path[0]
  while (!(curPath[0]==node[0] && curPath[1]==node[1]) ){
    // console.log(curPath)
    let id = curPath[0].toString() + "," + curPath[1].toString() + "HX"
    let element = document.getElementById(id)
    element.style.backgroundColor = "yellow"
    // console.log(curPath)
    let newNode = hxpath[curPath[1]][curPath[0]]
    // console.log(newNode[0])
    curPath = newNode[0]
  }
    
  d = new Date()
  time = d.getTime() - t
  // console.log(time)
  // console.log("hx time ^")
  HTimes.push(time)
}
var HTimes = []


// console.log(path)

// everything that needs to be fixed 
// 1. even hex rows not pathfinding till the very end
// 2. optimization of the pathfinding
// 3, scalable grids
// 4. more pathfinding algoritms
// 5. barriers


function main(){
  let distances = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]
  let avgTimesH = []
  let avgTimesS = []
  for (let i = 0; i < distances.length; i++){
    let distance = distances[i]
    pathFindDjikstra(distance)
    avgTimesH.push(getAvg(HTimes))
    avgTimesS.push(getAvg(STimes))
  }
  document.getElementById("HTimes").innerText = "Hexagon Average Timings = " + avgTimesH.toString()
  console.log("hx time: " + getSum(HTimes))
  console.log("sq time: " + getSum(STimes))
  document.getElementById("STimes").innerText = "Square Average Timings =  " + avgTimesS.toString()
}
function pathFindDjikstra(distance){
  STimes = []
  HTimes = []
  let problem = 0;
  for (let i =0; i < 50; i++){
    try{
      hexagons(getHxsByDistance(distance))
      squares(getSqsByDistance(distance))
    }
    catch (err){
      // console.log(err)
      // console.log(distance)
      problem++
    }
    finally{
    clearEverything()
    }
  }
  // console.log(problem)
}

function getAvg(arr){
  let sum = 0;
  for (let i = 0; i < arr.length; i++){
    sum+=arr[i]
  }
  return parseInt((sum/arr.length)+0.5)
}
// main()
function getSum(arr){
  let sum = 0;
  for (let i = 0; i < arr.length;i++){
    sum+=arr[i]
  }
  return sum
}
// hexagons(getHxsByDistance(500))
// squares(getSqsByDistance(500))
// clearEverything()

function getHTMLElement(index, type){
  return document.getElementById(idMaker(index,type))
}