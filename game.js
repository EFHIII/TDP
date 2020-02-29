const gameMaps=[
  {
    title:"Test map",
    grid:[
      "     ,##################.           ",
      "     #{++++++++++++++++}#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #+++++++++]#[++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #+++++++++###++++++#           ",
      "     ####+++#### #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     ####+++#### #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++#           ",
      "     #+++++++++# #++++++########    ",
      "     #+++++++++# #+++++++GGGGGG#    ",
      "     #+++++++++# #+++++++GGGGGG#    ",
      "     #+++++++++# #+++++++GGGGGG#    ",
      "     #++++S++++# #+++++++GGGGGG#    ",
      "     #+++++++++# #+++++++GGGGGG#    ",
      "     #[+++++++]# #[++++++GGGGGG#    ",
      "     l#########r l##############    "]
  }
];

var keys=[];

var currentMap;

const player={
  x:0,
  y:0,
  z:0,
  vx:0,
  vy:0,
  vz:0,
};

function setupLevel(lvl){
  player.vx=0;
  player.vy=0;
  currentMap=gameMaps[lvl];
  for(let i=0;i<currentMap.grid.length;i++){
    for(let j=0;j<currentMap.grid[i].length;j++){
      if(currentMap.grid[i][j]==='S'){
        player.x=j;
        player.y=i;
        player.z=0;
        i=100;
        break;
      }
    }
  }
}

setupLevel(0);

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
  pg = createGraphics(400, 100);
  pg.textSize(120);
}
var tileSize=0;
function drawTile(x,y,s){
  push();
  translate(x,y);
  plane(s?s:tileSize);
  pop();
}
function drawBox(x,y,h){
  fill(90+h*10);
  push();
    translate(x*tileSize,y*tileSize);
    plane(tileSize);
    fill(40);
  for(let k=0;k<4;k++){
    push();
      rotateZ(PI/2*k);
      translate(0,tileSize/2,-tileSize/2*h);
      rotateX(PI/2);
      plane(tileSize,tileSize*h);
    pop();
  }
  pop();
}

function triangleBox(x,y,h,r){
  push();
    translate(x*tileSize,y*tileSize,(-(h+1)/2+0.5)*tileSize);
    rotateZ(PI/4*r);
    rotateX(PI/2);
    plane(tileSize*1.4142135623730951,tileSize);
  pop();

  fill(100);
  push();
  translate(x*tileSize,y*tileSize,(h-1)*tileSize);
  rotateZ(-PI/4*(r-3)*45);
  triangle(
    0.5*tileSize,-0.5*tileSize,
    -0.5*tileSize,0.5*tileSize,
    -0.5*tileSize,-0.5*tileSize);
  pop();
}

function draw() {
  background(0);
  tileSize=min(width/16,height/16);

  push();
    translate(-player.x*tileSize,-player.y*tileSize,0);
    noStroke();
    fill(30,130,200);
    push();
      translate(player.x*tileSize,player.y*tileSize,tileSize/2);
      ellipse(0,0,tileSize*0.8,tileSize*0.8);
    pop();

  for(let i=0;i<gameMaps[0].grid.length;i++){
    for(let j=0;j<gameMaps[0].grid[i].length;j++){
      switch(gameMaps[0].grid[i][j]){
        case("l"):
          fill(40);
          triangleBox(j,i,1,1);
        break;
        case("r"):
          fill(40);
          triangleBox(j,i,1,3);
        break;
        case(","):
          fill(40);
          triangleBox(j,i,1,7);
        break;
        case("."):
          fill(40);
          triangleBox(j,i,1,5);
        break;
        case("}"):
          push();
            translate(0,0,-tileSize);
            fill(90);
            drawTile(j*tileSize,i*tileSize);
          pop();

          fill(40);
          triangleBox(j,i,1,1);
        break;
        case("{"):
          push();
            translate(0,0,-tileSize);
            fill(90);
            drawTile(j*tileSize,i*tileSize);
          pop();

          fill(40);
          triangleBox(j,i,1,3);
        break;
        case("]"):
          push();
            translate(0,0,-tileSize);
            fill(90);
            drawTile(j*tileSize,i*tileSize);
          pop();

          fill(40);
          triangleBox(j,i,1,7);
        break;
        case("["):
          push();
            translate(0,0,-tileSize);
            fill(90);
            drawTile(j*tileSize,i*tileSize);
          pop();

          fill(40);
          triangleBox(j,i,1,5);
        break;
        case("#"):
          drawBox(j,i,1);
        break;
        case("S"):
        case("+"):
          push();
            translate(0,0,-tileSize);
            fill(90);
            drawTile(j*tileSize,i*tileSize);
          pop();
        break;
        case("G"):
          push();
            fill(50,150,50);
            translate(0,0,-tileSize);
            drawTile(j*tileSize,i*tileSize);
          pop();
        break;
      }
    }
  }
}

function keyPressed=function(){
  keys[keyCode]=true;
}
function keyReleased=function(){
  keys[keyCode]=false;
}

/*
function touchStarted () {
  let fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}
*/
/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};
