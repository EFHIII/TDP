const ZMAG=2;
var currentMap;
const gameMaps=[
  {
    title:"Test map",
    grid:[
      "                                    ",
      "     ,##################.           ",
      "     #{++++++++++++++++}#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #+++++++++]#[++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #[+++++++]###++++++#           ",
      "    ww###+++###ww#++++++#           ",
      "    w#{+++++++}#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#[+++++++]#w#++++++#           ",
      "    ww###+++###ww#++++++#           ",
      "    w#{+++++++}#w#++++++#           ",
      "    w#+++++++++#w#++++++#           ",
      "    w#+++++++++#w#++++++########    ",
      "    w#+++++++++#w#+++++++GGGGGG#    ",
      "    w#+++++++++#w#+++++++GGGGGG#    ",
      "    w#+++++++++#w#+++++++GGGGGG#    ",
      "    w#++++S++++#w#+++++++GGGGGG#    ",
      "    w#+++++++++#w#+++++++GGGGGG#    ",
      "    w#[+++++++]#w#[++++++GGGGGG#    ",
      "    wl#########rwl##############    ",
      "    wwwwwwwwwwwww"]
  }
];
const div={
  floor:[],
  rail:[],
  wall:[],
  goal:[],
};

var keys=[];
const controls={
  up:38,
  down:40,
  left:37,
  right:39,
  jump:32,
  spin:90,
  blink:88,
};
const camera={
  x:0,
  y:0
};
const player={
  x:0,
  y:0,
  z:0,
  vx:0,
  vy:0,
  vz:0,
  d:0.8,//diameter
  r:0.98,//resistence
  ar:0.98,//air resistence
  a:0.01,//acceleration
  az:0.1,//acceleration Z
  g:0.003,//gravity
  ms:30,//max spin
  sb:0.6,//spin boost
  rest:3,//resting 'speed'
  mx:1,//max acceleration
};

var onLevel=0;

var trail=[];
var jump=false;
var doubleJump=false;
var spinning=false;
var spin=0;

function preload() {
  inconsolata = loadFont('Inconsolata.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();

  textFont(inconsolata);
}

function maxHist(R, C, row) {
    let result = [];

    let top_val;
    let max_area = 0;
    let area = 0;
    let i = 0;
    let x=0;
    let X=0;
    while (i < C) {
        if (result.length === 0 || row[result[result.length - 1]] <= row[i]) {
            result.push(i++);
        }
        else {
            X=result[result.length - 1];
            top_val = row[X];
            result.pop();
            area = top_val * i;

            if (result.length > 0) {
                area = top_val * (i - result[result.length - 1] - 1);
            }
            if(area>max_area){
                x=X;
                max_area=area;
            }

        }
    }

    while (result.length > 0) {
        X=result[result.length - 1];
        top_val = row[X];
        result.pop();
        area = top_val * i;

        if (result.length > 0) {
            area = top_val * (i - result[result.length - 1] - 1);
        }

        if(area>max_area){
            x=X;
            max_area=area;
        }
    }

    return [x,max_area];
}
function maxRectangle(A) {
    let C=A[0].length;
    let R=A.length;

    let maxR=maxHist(R, C, A[0]);
    let result = maxR[1];
    let x=maxR[0],y=0,w=0,h=1;

    for (let i = 1; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (A[i][j] === 1) {
                A[i][j] += A[i - 1][j];
            }
        }
        maxR=maxHist(R, C, A[i]);
        if(maxR[1]>result){
            result=maxR[1];
            x=maxR[0];
            y=i-A[i][x]+1;
            h=A[i][x];
            w=result/h;
        }
    }

    return {x:x,y:y,w:w,h:h};
}
function rectDivision(chars){
  let rects=[];
  let a=1;
  while(a>0){
    let tgrid=[];
    for(let i=0;i<currentMap.grid.length;i++){
        tgrid.push([]);
        for(let j=0;j<currentMap.grid[i].length;j++){
            tgrid[i].push(
                chars.indexOf(currentMap.grid[i][j])>=0?1:0);
        }
    }
    for(let i=0;i<rects.length;i++){
        for(let x=rects[i].w-1;x>=0;x--){
            for(let y=rects[i].h-1;y>=0;y--){
                tgrid[rects[i].y+y][rects[i].x+x]=i+2;
            }
        }
    }

    for(var i=0;i<rects.length;i++){
        for(var x=rects[i].w-1;x>=0;x--){
            for(var y=rects[i].h-1;y>=0;y--){
                tgrid[rects[i].y+y][rects[i].x+x]=0;
            }
        }
    }

    rects.push(maxRectangle(tgrid));
    a=rects[rects.length-1].w;

    if(a===0){
        rects.pop();
    }
  }
  return rects;
}

function setupLevel(lvl){
  onLevel=lvl;
  player.vx=0;
  player.vy=0;

  trail=[];
  jump=false;
  spinning=false;
  spin=0;
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
  camera.x=player.x;
  camera.y=player.y;

  div.floor=rectDivision('+S[]{}');
  div.rail=rectDivision('#');
  div.wall=rectDivision('w');
  div.goal=rectDivision('G');
}
setupLevel(0);

var tileSize=0;
function drawTile(x,y,s){
  push();
  translate(x,y);
  plane(s?s:tileSize);
  pop();
}
const dirAr=[[0,1],[-1,0],[0,-1],[1,0]];
function drawBox(x,y,h,ca,cb){
  fill(ca?ca:90+h*10);
  push();
    translate(x*tileSize,y*tileSize,(h-1)*tileSize);
    plane(tileSize);
    fill(cb?cb:40);
  for(let k=0;k<4;k++){
    if(getGround(x+dirAr[k][0],y+dirAr[k][1])>=h){
      continue;
    }
    push();
      rotateZ(PI/2*k);
      translate(0,tileSize/2,-tileSize/2*h*ZMAG);
      rotateX(PI/2);
      plane(tileSize,tileSize*h*ZMAG);
    pop();
  }
  pop();
}

function triangleBox(x,y,h,r){
  push();
    translate(x*tileSize,y*tileSize,(-(h+1)/2+0.5)*tileSize*ZMAG);
    rotateZ(PI/4*r);
    rotateX(PI/2);
    plane(tileSize*1.4142135623730951,tileSize*h*ZMAG);
  pop();

  fill(100);
  push();
  translate(x*tileSize,y*tileSize,(h-1)*tileSize*ZMAG);
  rotateZ(-PI/4*(r-3)*45);
  triangle(
    0.5*tileSize,-0.5*tileSize,
    -0.5*tileSize,0.5*tileSize,
    -0.5*tileSize,-0.5*tileSize);
  pop();
}

function pointLineDist(x0,y0,x1,y1,x2,y2,r){
    let b=-1;
    let a=(y2-y1)/(x2-x1);
    let c=y1-x1*a;

    let x=(b*(b*x0-a*y0)-a*c)/(a*a+b*b);
    let y=(a*(-b*x0+a*y0)-b*c)/(a*a+b*b);

    let d=Math.sqrt(sq(x-x0)+sq(y-y0));

    if(d<r){
        if(x1<x2){
            if(x1<x&&x<x2){
                return {x:x,y:y,dist:d};
            }
        }
        else if(x1>x&&x>x2){
            return {x:x,y:y,dist:d};
        }
        let da=Math.sqrt(sq(x0-x1)+sq(y0-y1));
        let db=Math.sqrt(sq(x0-x2)+sq(y0-y2));
        if(da<db&&da<r*r){
            return {x:x1,y:y1,dist:da};
        }
        if(db<r*r){
            return {x:x2,y:y2,dist:db};
        }
    }
};
function shapeIntersect(points,sz,x,y,z,r){
  if(z>=sz){return;}
  let closest=r*2;
  let closestP={x:0,y:0};
  for(let i=1;i<points.length;i++){
    let cl=pointLineDist(x,y,points[i-1].x,points[i-1].y,points[i].x,points[i].y,r);
    if(cl&&cl.dist<closest){
      closest=cl.dist;
      closestP={x:cl.x,y:cl.y};
    }
  }
  let cl=pointLineDist(x,y,points[0].x,points[0].y,points[points.length-1].x,points[points.length-1].y,r);
  if(cl&&cl.dist<closest){
      closest=cl.dist;
      closestP={x:cl.x,y:cl.y};
  }
  if(closest<r){
    return closestP;
  }
}

function playerCollision(i,j){
  if(i<0||j<0){return;}
  let t=currentMap.grid.length>j?(currentMap.grid[j].length>i?currentMap.grid[j][i]:false):false;
  if(t===false){return;}
  switch(t){
    case('#'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],1,player.x,player.y,player.z,player.d/2);
    break;
    case('w'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],4,player.x,player.y,player.z,player.d/2);
    break;
  }
}

function getGround(x,y){
  let X=x+0.5>>0;
  let Y=y+0.5>>0;
  if(X<0||Y<0||Y>=currentMap.grid.length||X>=currentMap.grid[Y].length){
    return -100;
  }
  switch(currentMap.grid[Y][X]){
    case(' '):
      return -100;
    case('#'):
      return 1;
    case('w'):
      return 4;
    default:
      return 0;
  }
}

function stepPlayer(){
  if(player.z<-20){
    setupLevel(onLevel);
  }
  let ground=getGround(player.x,player.y);
  for(let i=0;i<PI*2;i+=PI/4){
    let temp=getGround(player.x+cos(i)*(player.d-0.001)/2,player.y+sin(i)*(player.d-0.001)/2);
    if(temp>ground&&temp<=player.z){
      ground=temp;
    }
  }
  if(spinning){
    spin++;
    if(spin>player.ms){
      spin=player.ms;
    }
  }
  else if(player.z>ground&&keys[controls.spin]){
    spinning=true;
  }
  trail.push([player.x,player.y,player.z]);
  if(keys[controls.up]){
    player.vy-=player.a*(player.mx/(player.rest+abs(player.vy)));
    if(!spinning&&spin){
      player.vy-=player.a*spin*player.sb;
    }
  }
  if(keys[controls.down]){
    player.vy+=player.a*(player.mx/(player.rest+abs(player.vy)));
    if(!spinning&&spin){
      player.vy+=player.a*spin*player.sb;
    }
  }
  if(keys[controls.left]){
    player.vx-=player.a*(player.mx/(player.rest+abs(player.vx)));
    if(!spinning&&spin){
      player.vx-=player.a*spin*player.sb;
    }
  }
  if(keys[controls.right]){
    player.vx+=player.a*(player.mx/(player.rest+abs(player.vx)));
    if(!spinning&&spin){
      player.vx+=player.a*spin*player.sb;
    }
  }
  if(player.z===ground&&!jump&&keys[controls.jump]){
    jump=true;
    player.vz+=player.az;
  }
  else if(!jump&&keys[controls.jump]){
    jump=true;
  }

  if(!spinning){spin=0;}

  player.vz-=player.g;

  player.z+=player.vz;


  if(player.z<=ground){
    player.z=ground;
    player.vz=0;
    spinning=false;
  }

  if(player.z===ground){
    player.vx*=player.ar;
    player.vy*=player.ar;
  }
  else{
    player.vx*=player.r;
    player.vy*=player.r;
  }

  player.x+=player.vx;
  player.y+=player.vy;

  let x=(player.x>>0);
  let y=(player.y>>0);
  for(let i=-1;i<2;i++){
    for(let j=-1;j<2;j++){
      let collision=playerCollision(x+j,y+i);
      if(collision){
        let v={x:player.x-collision.x,y:player.y-collision.y};
        v={x:v.x/Math.sqrt(sq(v.x)+sq(v.y)),y:v.y/Math.sqrt(sq(v.x)+sq(v.y))};
        player.x=collision.x+v.x*player.d/2;
        player.y=collision.y+v.y*player.d/2;

        let theta1=atan2(player.vy,player.vx);
        let theta2=atan2(-v.y,-v.x)+Math.PI/2;
        let theta=theta2-(theta1-theta2);

        let m=Math.sqrt(player.vx*player.vx+player.vy*player.vy);
        player.vx=cos(theta)*m;
        player.vy=sin(theta)*m;
        if(spinning){
          spinning=false;
          spin=0;
          player.vx*=1+0.03*spin;
          player.vy*=1+0.03*spin;
        }
      }
    }
  }

}

function drawPlayer(){

  stepPlayer();
  stepPlayer();
  stepPlayer();

  while(trail.length>128){
    trail.shift();
  }


  for(var i=trail.length-1;i>=0;i--){
    let a=i/128;
    let b=(1-a)*(90+(trail[i][2])*10);
    fill(80,180,250,i);
    push();
      translate(trail[i][0]*tileSize,trail[i][1]*tileSize,tileSize*ZMAG*(trail[i][2]-0.99));
      ellipse(0,0,tileSize*player.d/3,tileSize*player.d/3);
    pop();
  }

  fill(30,130,200);
  push();
    translate(player.x*tileSize,player.y*tileSize,tileSize*ZMAG*(player.z-0.99));
    ellipse(0,0,tileSize*player.d,tileSize*player.d);
  pop();
}

function drawMap(){
  tileSize=min(width/16,height/16);

  camera.x+=(player.x-camera.x)*0.3;
  camera.y+=(player.y-camera.y)*0.3;

  push();
    translate(-camera.x*tileSize,-camera.y*tileSize);
    noStroke();

  for(let i=0;i<currentMap.grid.length;i++){
    for(let j=0;j<currentMap.grid[i].length;j++){
      switch(currentMap.grid[i][j]){
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
          fill(40);
          triangleBox(j,i,1,1);
        break;
        case("{"):
          fill(40);
          triangleBox(j,i,1,3);
        break;
        case("]"):
          fill(40);
          triangleBox(j,i,1,7);
        break;
        case("["):
          fill(40);
          triangleBox(j,i,1,5);
        break;
        case("#"):
          //drawBox(j,i,1);
        break;
        case("w"):
          //drawBox(j,i,4,color(60,65,70),color(50,55,60));
        break;
        case("S"):
        case("+"):
        /*
          push();
            translate(0,0,-tileSize*ZMAG);
            fill(90);
            drawTile(j*tileSize,i*tileSize);
          pop();
          */
        break;
        case("G"):
        /*
          push();
            fill(50,150,50);
            translate(0,0,-tileSize*ZMAG);
            drawTile(j*tileSize,i*tileSize);
          pop();
          */
        break;
      }
    }
  }

  for(let i=0;i<div.floor.length;i++){
    push();
      translate(0,0,-tileSize*ZMAG);
      fill(90);
      push();
        translate(
          (div.floor[i].x-0.5+div.floor[i].w/2)*tileSize,
          (div.floor[i].y-0.5+div.floor[i].h/2)*tileSize);
        plane(
          tileSize*div.floor[i].w,
          tileSize*div.floor[i].h);
      pop();
    pop();
  }
  for(let i=0;i<div.goal.length;i++){
    push();
      translate(0,0,-tileSize*ZMAG);
      fill(50,150,50);
      push();
        translate(
          (div.goal[i].x-0.5+div.goal[i].w/2)*tileSize,
          (div.goal[i].y-0.5+div.goal[i].h/2)*tileSize);
        plane(
          tileSize*div.goal[i].w,
          tileSize*div.goal[i].h);
      pop();
    pop();
  }
  for(let i=0;i<div.rail.length;i++){
    push();
      //translate(0,0,-tileSize*ZMAG);
      fill(100);
      push();
        translate(
          (div.rail[i].x-0.5+div.rail[i].w/2)*tileSize,
          (div.rail[i].y-0.5+div.rail[i].h/2)*tileSize);
        plane(
          tileSize*div.rail[i].w,
          tileSize*div.rail[i].h);
      pop();
    pop();
  }
  for(let i=0;i<div.wall.length;i++){
    push();
      translate(0,0,3*tileSize*ZMAG);
      fill(120);
      push();
        translate(
          (div.wall[i].x-0.5+div.wall[i].w/2)*tileSize,
          (div.wall[i].y-0.5+div.wall[i].h/2)*tileSize);
        plane(
          tileSize*div.wall[i].w,
          tileSize*div.wall[i].h);
      pop();
    pop();
  }

  drawPlayer();

  fill(250);
  //textAlign(LEFT,TOP);

  textFont("Arial");
  text("Test",50,50);
  //text((frameRate()*100>>0)/100,50,50);
}

function draw() {
  background(0);
  drawMap();
}

function keyPressed(){
  keys[keyCode]=true;
}
function keyReleased(){
  keys[keyCode]=false;
  if(keyCode===controls.jump){jump=false;}
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
