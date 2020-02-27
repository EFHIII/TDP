const gameMaps=[
  {
    title:"Test map",
    grid:[
      "##########",
      "#++++++++#",
      "#++++++++#",
      "#+++##+++#",
      "#++++++++#",
      "#+++##+++#",
      "#+++##+++###",
      "#+S+##+++GG#",
      "#+++##+++GG#",
      "############",
    ]
  }
];

const player={
  x:0,
  y:0,
  vx:0,
  vy:0
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  pg = createGraphics(400, 100);
  pg.textSize(120);

  tile = createGraphics(400, 400);
  tile.textSize(120);

  tile2 = createGraphics(400, 400);
  tile2.textSize(120);
}
var tileSize=0;
function drawTile(x,y){
  push();
  translate(x,y);
  plane(tileSize);
  pop();
}

function draw() {
  background(0);
  pg.background(255);
  pg.text('Test', 80, 90);
  tile.background(0,180,0);
  tile.text('Test', 100, 240);
  tile2.background(0,200,0);
  tile2.text('Test', 100, 240);

  //noLights();
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;

  tileSize=min(width/10,height/10);

  //pass image as texture
  //texture(pg);
  push();
  translate(-width/2,-height/2);
  translate(mouseX,mouseY);
  //translate(0,0,-500);
  //rotateX(mouseY/100);
  noStroke();
  fill(0);

  for(var i=0;i<gameMaps[0].grid.length;i++){
    for(var j=0;j<gameMaps[0].grid[i].length;j++){
      switch(gameMaps[0].grid[i][j]){
        case("#"):
          fill(100);
          push();
          translate(j*tileSize,i*tileSize);
          plane(tileSize);
          fill(80);
          for(var k=0;k<4;k++){
            push();
            rotateZ(PI/2*k);
            translate(0,tileSize/2,-tileSize/8);
            rotateX(PI/2);
            plane(tileSize,tileSize/4);
            pop();
          }
          pop();
        break;
        case("+"):
          push();
          translate(0,0,-tileSize/4);
          fill(90);
          drawTile(j*tileSize,i*tileSize);
          pop();
        break;
      }
    }
  }
}
/*
function touchStarted () {
  var fs = fullscreen();
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
