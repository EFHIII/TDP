function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  pg = createGraphics(400, 100);
  pg.textSize(120);

  tile = createGraphics(400, 400);
  tile.textSize(120);

  tile2 = createGraphics(400, 400);
  tile2.textSize(120);
}

function draw() {
  background(0);
  pg.background(255);
  pg.text('Test', 80, 90);
  tile.background(0,180,0);
  tile.text('Test', 100, 240);
  tile2.background(0,200,0);
  tile2.text('Test', 100, 240);

  var tileSize=min(width/4,height/4);

  //pass image as texture
  texture(pg);
  push();
  translate(-width/2,-height/2);
  //translate(0,0,-500);
  //rotateX(mouseY/100);
  noStroke();
  for(var i=0;i<4;i++){
    push();
    translate(mouseX,mouseY);
    rotateZ(PI/2*i);
    translate(0,tileSize/2);
    rotateX(PI/2);
    //plane(tileSize,tileSize/4);
    image(pg,-tileSize/2,-tileSize/8,tileSize,tileSize/4);
    pop();
  }
  translate(0,0,-tileSize/8);
  image(tile,mouseX-tileSize/2,mouseY-tileSize/2,tileSize,tileSize);
  translate(0,0,tileSize/4);
  image(tile2,mouseX+tileSize/2,mouseY-tileSize/2,tileSize,tileSize);
  image(tile2,mouseX-tileSize/2,mouseY+tileSize/2,tileSize,tileSize);
  image(tile2,mouseX-tileSize/2,mouseY-tileSize*1.5,tileSize,tileSize);
  image(tile2,mouseX-tileSize*1.5,mouseY-tileSize/2,tileSize,tileSize);

  normalMaterial(); // For effect
  push();
    translate(mouseX,mouseY,0);
    rotateX(PI/2);
    scale(2);
    //model(teapot);
}

function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

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
