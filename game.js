const ZMAG=1.5;
var currentMap;
const gameMaps=[
  {
    title:"Jump",
    grid:[
      "   ",
      " G ",
      " + ",
      " + ",
      " + ",
      " + ",
      " + ",
      " + ",
      "   ",
      "   ",
      "   ",
      "   ",
      "   ",
      " + ",
      " + ",
      " + ",
      "   ",
      "   ",
      "   ",
      "   ",
      "   ",
      " + ",
      " + ",
      " S ",
      " + ",
      "   "]
  },
  {
    title:"Thing",
    grid:[
      "                                    ",
      "     ,##################.           ",
      "     ##{++++++++++++++}##           ",
      "     #{++++++++++++++++}#           ",
      "     #++++++++++++++++++#           ",
      "     #++++++++++++++++++#           ",
      "     #+++++++++###++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++#w#++++++#           ",
      "     #+++++++++###++++++#wwwwwwwwwww",
      "     #++++++++++++++++++#       l##w",
      "     #++++++++++++++++++#        l#w",
      "     #[+++++++]###++++++#wwww     lw",
      "    w##[+++++]##w#++++++#w         w",
      "    ww###+++###ww#++++++#w     ++++w",
      "    w##{+++++}##w#++++++#w     ++++w",
      "    w#{+++++++}#w#++++++#w     ++++w",
      "    w#+++++++++#w#++++++#w     ++++w",
      "    w#+++++++++#w#++++++#w         w",
      "    w#+++++++++#w#++++++#w         w",
      "    w#+++++++++#w#++++++#w++++     w",
      "    w#+++++++++#w#++++++#w++++     w",
      "    w#+++++++++#w#++++++#w++++     w",
      "    w#+++++++++#w#++++++#w++++     w",
      "    w#+++++++++#w#++++++#w         w",
      "    w#[+++++++]#w#++++++#w         w",
      "    w##[+++++]##w#++++++#w     ++++w",
      "    ww###+++###ww#++++++#w     ++++w",
      "    w##{+++++}##w#++++++#w     ++++w",
      "    w#{+++++++}#w#++++++#w     ++++w",
      "    w#+++++++++#w#++++++###########w",
      "    w#+++++++++#w#+++++++GGGGGG####w",
      "    w#+++++++++#w#+++++++GGGGGG####w",
      "    w#+++++++++#w#+++++++GGGGGG####w",
      "    w#++++S++++#w#+++++++GGGGGG####w",
      "    w#[+++++++]#w#+++++++GGGGGG####w",
      "    w##[+++++]##w#[++++++GGGGGG####w",
      "    wl#########rwl##############wwww",
      "    wwwwwwwwwwwww"]
  },
  {
    title:"A horrible level",
    grid:[
  "                              ",
  "                     w+ +     ",
  "                     w        ",
  "          w    w  +       +   ",
  "             w    w  w+       ",
  "      + w      +     w        ",
  "       w         w   w     +  ",
  "   +    +  +         w        ",
  "                     w        ",
  "      +   w +   w    w        ",
  "   +   w             w    +   ",
  "w   w     +   +      w        ",
  "                   w w        ",
  "   +   +       w w   w        ",
  "  w  +     +  w+     w        ",
  "                     w     +  ",
  "   w w  w + w    w   w +      ",
  " w            +      w        ",
  "     ++    ++      + w        ",
  "      + w    ++  w   w      + ",
  "       +  +    +   + w        ",
  "  +  +      ++ w     w        ",
  " w  w ww  w  +       w +      ",
  "         +  w  w     w        ",
  "               +     w        ",
  "    +   +    w       w        ",
  "     w    +          w        ",
  "     +     wwww      w      + ",
  "             S       w        ",
  "         +           w  G     ",
]
  },
  {
    title:"Mandelbrot",
    grid:[
      "                                        ",
      "                                        ",
      "               # ++   ++ #              ",
      "            + wwwww[ ]wwwww +           ",
      "           +#w#####w+w#####w#+          ",
      "            w###############w           ",
      "          +w#################w+         ",
      "          +w#################w+         ",
      "     [  +  w#################w  +  ]    ",
      "       +ww+w#################w+ww+      ",
      "     + w##ww#################ww##w +    ",
      "        ww+w#################w+ww       ",
      "           w#################w          ",
      "           w#################w          ",
      "           +w###############w+          ",
      "           +w###############w+          ",
      "          +##w#############w##+         ",
      "          +  +w###########w+  +         ",
      "             + wwwwwGwwwww +            ",
      "                 +##w##+                ",
      "                  #www#                 ",
      "                +]w###w[+               ",
      "                +w#####w+               ",
      "                #w#####w#               ",
      "                +w#####w+               ",
      "                ]#w###w#[               ",
      "                 +#www#+                ",
      "                  +}w{+                 ",
      "                   +#+                  ",
      "                    #                   ",
      "                    #                   ",
      "                    #                   ",
      "                    +                   ",
      "                    +                   ",
      "                   l#r                  ",
      "                    +                   ",
      "                    +                   ",
      "                    S                   ",
      "                    +                   "]
  },
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
      "    wwwwwwwwwwwww                   ",
      "                                    "]
  },
  {
    title: "Bemazed",
    grid: [
        "                                     ",
        "             ########################",
        "             #++++++++++++++++GGGG++#",
        "             #++++++++++++++++GGGG++#",
        "             #++++           #GGGG++#",
        "             #++++           #GGGG++#",
        "wwwwwwwwwwwwww++++##         #####++#",
        "w            w++++##              ++#",
        "w            wwwww  wwwwwwwwwwwwww++#",
        "w####   w     ++                  ++#",
        "w####   w     ++                  ++#",
        "wwwww   wwwwwwwwww    wwww  wwww  ++#",
        "w            w    ##     w  w     ++#",
        "w            w    ##     w  w     ++#",
        "w## w        w  ####     wGGw     ++#",
        "w## w        w  ####     wGGw     ++#",
        "w   w++##    www##wwwwwwwwwww     ++#",
        "w   w++##         w##   ++++++++++++#",
        "w   w  ++         w##   ++++++++++++#",
        "w   w  ++         w##   w############",
        "w++ wwwwwww  w  ##w##   w            ",
        "w++          w  ##wwww  w            ",
        "w++++        w  ##      w            ",
        "wS+++        w  ##      w            ",
        "wwwwwwwwwwwwwwwwwwwwwwwww            ",
        "                                     "]
    },
];

let save={
  version:0.1,
  mapTimes:{}
};
for(let m in gameMaps){
  save.mapTimes[gameMaps[m].title]=0;
}

function setCookie() {
  var d = new Date("Mar 14 159265 3:58:97");
  var expires="expires="+d.toUTCString();
  document.cookie="savedata="+JSON.stringify(save)+";"+expires+";path=/";
}

function getCookie() {
  var name = "savedata=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var data = getCookie();
  if (data != "") {
    try{
      data=JSON.parse(data);
      if(data.version>0.1){return;}
      for(let m in data.mapTimes){
        save.mapTimes[m]=data.mapTimes[m];
      }
    }catch(e){console.log("Save data invalid");}
  }
}

checkCookie();

const div={
  floor:[],
  rail:[],
  wall:[],
  goal:[],
};

let keys=[];
const controls={
  up:38,
  down:40,
  left:37,
  right:39,
  jump:32,
  spin:90,
  blink:88,
  restart:82,
  nextLevel:13,
  nextLevel2:10,
  skipLevel:83
};
/*
  up:87,
  down:83,
  left:65,
  right:68,
*/
const camera={
  x:0,
  y:0,
  z:0,
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
  ms:100,//max spin
  sb:0.3,//spin boost
  rest:3,//resting 'speed'
  mx:1,//max acceleration
  blink:30,//blink duration
  blinkV:0.3,
  blinkCooldown:300,
  trailLength:128,
  trailSpeed:0.04
};

let targetFPS=60;

let onLevel=0;

let timer=0;
let startedTime=false;

let trail=[];
let jump=false;
let doubleJump=false;
let spinning=false;
let spin=0;
let blinking=0;
let blinkTimer=false;
let blinked=false;

let finish=false;
let finishTransition=0;

let startingHeight;
let f;
let mouseIn=false;

let can;

function preload() {
  f = loadFont(
    "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
  );
}
function setup() {
  can=createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
  pg = createGraphics(200, 200);

  frameRate(60);

  textFont(f);
  startingHeight=height;
  //performanceMode(true);
}

function mOver(){
  mouseIn=true;
}
function mOut(){
  mouseIn=false;
}

function maxFromRow(row) {
    let maxR=0;
    let count=0;
    let cur=0;
    let x=0;
    let X=0;
    let w=0;
    for(let i=0;i<row.length;i++){
        if(row[i]===cur){
            count+=cur;
        }
        else{
            if(count>maxR){
                maxR=count;
                x=X;
                w=maxR/cur;
            }
            X=i;
            cur=row[i];
            count=cur;
        }
    }
    if(count>maxR){
        maxR=count;
        x=X;
        w=maxR/cur;
    }
    return [x,w,maxR];
};
function maxRectangle(A) {
    let C=A[0].length;
    let R=A.length;

    let maxR=maxFromRow(A[0]);
    let result = maxR[1];
    let x=maxR[0],y=0,w=maxR[1],h=1;

    for (let i = 1; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (A[i][j] === 1) {
                A[i][j] += A[i - 1][j];
            }
        }
        maxR=maxFromRow(A[i]);
        if(maxR[2]>result){
            result=maxR[2];
            x=maxR[0];
            y=i-A[i][x]+1;
            h=A[i][x];
            w=maxR[1];
        }
    }

    return {x:x,y:y,w:w,h:h};
};
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
  keys[controls.up]=false;
  keys[controls.down]=false;
  keys[controls.left]=false;
  keys[controls.right]=false;
  timer=0;
  startedTime=false;

  onLevel=lvl;
  player.vx=0;
  player.vy=0;

  trail=[];

  finish=false;
  finishTransition=0;

  jump=false;
  doubleJump=false;
  spinning=false;
  spin=0;
  blinking=0;
  blinkTimer=false;
  blinked=false;

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
  camera.x=currentMap.grid[0].length/2;
  camera.y=currentMap.grid.length/2;
  camera.z=Math.max(camera.x,camera.y)*2;

  div.floor=rectDivision('+S[]{}');
  div.rail=rectDivision('#');
  div.wall=rectDivision('w');
  div.goal=rectDivision('G');
}
setupLevel(onLevel);

var tileSize=0;
const dirAr=[[0,1],[-1,0],[0,-1],[1,0]];
function tileShadow(x,y,w,h,z,c,r){
  if(z<player.z+player.d/2&&
      player.x+0.5>x-player.d&&
      player.x+0.5<x+player.d+w&&
      player.y+(player.z+player.d-z)/4+0.5>y-player.d&&
      player.y+(player.z+player.d-z)/4+0.5<y+player.d+h){
    pg.resizeCanvas(w*tileSize, h*tileSize);

    pg.background(c);

    pg.noStroke();
    pg.fill(0,100);
    if(r!==undefined){
      pg.translate(w*tileSize/2,h*tileSize/2);
      pg.rotate(-r-HALF_PI);
      pg.translate(-w*tileSize/2,-h*tileSize/2);
    }
    else if(r){
      pg.translate(w*tileSize/2,h*tileSize/2);
      pg.rotate(-r-HALF_PI);
      pg.translate(-w*tileSize/2,-h*tileSize/2);
    }
    pg.ellipse(
      (player.x+0.5-x)*tileSize,
      (player.y+0.5-y+(player.z+player.d-z)/4)*tileSize,
      player.d*tileSize,
      player.d*tileSize);
    if(0){
      pg.stroke(0,255,0);
      pg.noFill();
      pg.rect(10,10,w*tileSize-20,h*tileSize-20);
      pg.fill(255,255,0);
      pg.noStroke();
      pg.ellipse(w*tileSize/2,h*tileSize/2,10,10);
      for(var i=0;i<2;i++){
        for(var j=0;j<2;j++){
          pg.ellipse(10+(w*tileSize-20)*i,10+(h*tileSize-20)*j,5,5);
        }
      }
      pg.fill(255,0,0);
      pg.ellipse(10,10,10,10);
      pg.fill(0,0,255);
      pg.ellipse(w*tileSize-10,10,10,10);
      pg.fill(0,255,0);
      pg.ellipse(10,h*tileSize-10,10,10);
    }
    texture(pg);
  }
  else{
    fill(c);
  }

  translate((x+w/2-0.5)*tileSize,(y+h/2-0.5)*tileSize,(z-1)*tileSize*ZMAG);
  if(r){rotateZ(r);}
}
function drawBox(x,y,w,h,z,r,g,b){
  push();

  tileShadow(x,y,w,h,z,b?color(r,g,b):color(90+z*10));
  plane(w*tileSize,h*tileSize);

  for(let k=0;k<4;k++){
    if(b){
      let sh=sin((k-1)*HALF_PI)*10-20;
      fill(sh+r,sh+g,sh+b);
    }
    else{
      fill(sin((k-1)*HALF_PI)*10+45);
    }

    push();

      rotateZ(HALF_PI*k);
      translate(0,tileSize/2*(k%2?w:h),-tileSize/2*z*ZMAG);
      rotateX(HALF_PI);
      plane(tileSize*(k%2?h:w),tileSize*z*ZMAG);
    pop();
  }
  pop();
}

function triangleBox(x,y,z,r){
  let k=-(r+3)/2;
  let h=1,w=1;
  push();
    fill(sin((k-1)*HALF_PI)*10+45);
    translate(x*tileSize,y*tileSize);
    rotateZ(HALF_PI*k);
    translate(0,tileSize/2,-tileSize/2*z*ZMAG);
    rotateX(HALF_PI);
    plane(tileSize,tileSize*z*ZMAG);
  pop();
  k++;
  push();
    fill(sin((k-1)*HALF_PI)*10+45);
    translate(x*tileSize,y*tileSize);
    rotateZ(HALF_PI*k);
    translate(0,tileSize/2,-tileSize/2*z*ZMAG);
    rotateX(HALF_PI);
    plane(tileSize,tileSize*z*ZMAG);
  pop();

  fill(sin((r+4)*QUARTER_PI)*10+45);
  push();
    translate(x*tileSize,y*tileSize,(-(z+1)/2+0.5)*tileSize*ZMAG);
    rotateZ(QUARTER_PI*r);
    rotateX(HALF_PI);
    plane(tileSize*1.4142135623730951,tileSize*z*ZMAG);
  pop();

  push();
  tileShadow(x,y,1,1,z,color(90+z*10),-PI/4*(r-3)*45);
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
      if(da<db&&da<r){
        return {x:x1,y:y1,dist:da};
      }
      if(db<r){
        return {x:x2,y:y2,dist:db};
      }
    }
};
function shapeIntersect(points,sz,x,y,z,r){
  if(z>=sz){return;}
  let closest=r;
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
  let temp;
  switch(t){
    case('+'):
    case('G'):
    case('S'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],0,player.x,player.y,player.z,player.d/2);
    break;
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
      ],5,player.x,player.y,player.z,player.d/2);
    break;
    case('['):
      temp=shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],0,player.x,player.y,player.z,player.d/2);
      if(temp){return temp;}
    case('.'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],1,player.x,player.y,player.z,player.d/2);
    break;
    case(']'):
      temp=shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],0,player.x,player.y,player.z,player.d/2);
      if(temp){return temp;}
    case(','):
      return shapeIntersect([
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5001,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],1,player.x,player.y,player.z,player.d/2);
    break;
    case('}'):
      temp=shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],0,player.x,player.y,player.z,player.d/2);
      if(temp){return temp;}
    case('l'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
      ],1,player.x,player.y,player.z,player.d/2);
    break;
    case('{'):
      temp=shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],0,player.x,player.y,player.z,player.d/2);
      if(temp){return temp;}
    case('r'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i-0.5,y:j+0.5},
      ],1,player.x,player.y,player.z,player.d/2);
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
      return 5;
    case('['):
      return y-Y>x-X?1:0;
    case(']'):
      return Y-y>x-X?0:1;
    case('l'):
      return y-Y>x-X?-100:1;
    case('r'):
      return Y-y>x-X?1:-100;
    case('}'):
      return y-Y>x-X?0:1;
    case('{'):
      return Y-y>x-X?1:0;
    case('.'):
      return y-Y>x-X?1:-100;
    case(','):
      return Y-y>x-X?-100:1;
    case('G'):
      if(player.z>=0){
        finish=true;
        if(!save.mapTimes[currentMap.title] || timer<save.mapTimes[currentMap.title]){
          save.mapTimes[currentMap.title]=timer;
          setCookie();
        }
      }
      return 0;
    default:
      return 0;
  }
}

function stepPlayer(){
  if(finish){return;}
  if(startedTime){
    timer++;
  }
  if(player.z<-20){
    setupLevel(onLevel);
  }
  let ground=getGround(player.x,player.y);
  for(let i=0;i<PI*2;i+=PI/4){
    let temp=getGround(player.x+cos(i)*(player.d-0.001)/2,player.y+sin(i)*(player.d-0.001)/2,1);
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
  if(blinking>0||player.vx*player.vx+player.vy*player.vy>player.trailSpeed){
    trail.push([player.x,player.y,player.z,Math.random()]);
  }
  else{
    trail.push(null);
  }


  let v = (!!keys[controls.left]^!!keys[controls.right])+(!!keys[controls.up]^!!keys[controls.down])>1?0.7071067811865476:1;

  if(keys[controls.up]){
    player.vy-=v*player.a*(player.mx/(player.rest+abs(player.vy)));
    if(!spinning&&spin){
      player.vy-=v*player.a*spin*player.sb;
    }
  }
  if(keys[controls.down]){
    player.vy+=v*player.a*(player.mx/(player.rest+abs(player.vy)));
    if(!spinning&&spin){
      player.vy+=v*player.a*spin*player.sb;
    }
  }
  if(keys[controls.left]){
    player.vx-=v*player.a*(player.mx/(player.rest+abs(player.vx)));
    if(!spinning&&spin){
      player.vx-=v*player.a*spin*player.sb;
    }
  }
  if(keys[controls.right]){
    player.vx+=v*player.a*(player.mx/(player.rest+abs(player.vx)));
    if(!spinning&&spin){
      player.vx+=v*player.a*spin*player.sb;
    }
  }
  if(player.z===ground&&!jump&&keys[controls.jump]){
    jump=true;
    player.vz+=player.az;
  }
  else if(player.z>ground&&!doubleJump&&!jump&&keys[controls.jump]){
    doubleJump=true;
    player.vz*=-0.25;
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
    doubleJump=false;
  }
  else{
    player.vx*=player.r;
    player.vy*=player.r;
  }

  if(blinking<0){blinking++;}

  if(!keys[controls.blink]){
    blinked=false;
  }

  if(!blinked && blinking === 0 && keys[controls.blink]){
    blinking = player.blink;
    blinked=true;
  }

  if(blinking>0){
    blinking--;
    if(blinking === 0){
      blinking=-player.blinkCooldown;
    }

    if(keys[controls.up]){
      player.y-=player.blinkV*v;
    }
    if(keys[controls.down]){
      player.y+=player.blinkV*v;
    }
    if(keys[controls.left]){
      player.x-=player.blinkV*v;
    }
    if(keys[controls.right]){
      player.x+=player.blinkV*v;
    }
  }
  else{
    player.x+=player.vx;
    player.y+=player.vy;
  }

  let x=(player.x>>0);
  let y=(player.y>>0);
  for(let i=-1;i<4;i++){
    for(let j=-1;j<4;j++){
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
          player.vx*=1+0.01*spin;
          player.vy*=1+0.01*spin;
          spinning=false;
          spin=0;
        }
      }
    }
  }

}

function run(){
    if(!finish){
      if(targetFPS<50){
        stepPlayer();
        stepPlayer();
      }
      if(targetFPS<70){
        stepPlayer();
      }
      stepPlayer();
    }
    else{
      spin=0;
      blinking=0;
      blinkTimer=false;
      blinked=false;
    }
}
function drawPlayer(){
  while(trail.length<player.trailLength){
    trail.push(null);
  }
  while(trail.length>player.trailLength){
    trail.shift();
  }

  fill(30+spin*2,130-spin,200-spin*1.5);
  push();
    translate(player.x*tileSize,player.y*tileSize,tileSize*ZMAG*(player.z+player.d/4-0.99));
    rotateZ(-finishTransition*(-atan2(player.vy,player.vx)+HALF_PI));
    rotateX(-finishTransition*QUARTER_PI);
    //ellipse(0,0,tileSize*player.d,tileSize*player.d);
    sphere(tileSize*player.d/2);

    if(blinking<0&&(blinkTimer||(!blinked&&keys[controls.blink]))){
      blinked=true;
      blinkTimer=true;
      translate(0,-tileSize*player.d,tileSize*ZMAG*(6-player.z));
      ortho();
      fill(200);
      arc(0,0,
        player.d*0.6*tileSize,
        player.d*0.6*tileSize,
        -HALF_PI,
        -TWO_PI*(player.blinkCooldown-blinking-1)/player.blinkCooldown-HALF_PI,PIE,30);
      let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
      perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
    }
    else{
      blinkTimer=false;
    }
  pop();
  //*
  for(var i=trail.length-1;i>=0;i--){
    if(trail[i]){
      randomSeed(trail[i][3]*10000>>0);
      let tx=sin((i/2+random()*3)/10)/4;
      let ty=sin((i/2+random()*3)/10)/4;
      let tz=sin((i/2+random()*3)/10)/4;
      let a=i/(player.trailLength*2);
      let b=(1-a)*(90+(trail[i][2])*10);
      fill(80,180,250);
      push();
        translate(trail[i][0]*tileSize,trail[i][1]*tileSize,tileSize*ZMAG*(trail[i][2]+player.d/2-0.99)-0.1);
        rotateZ(-finishTransition*(-atan2(player.vy,player.vx)+HALF_PI));
        rotateX(-finishTransition*QUARTER_PI);
        for(var j=0;j<2;j++){
          push();
          translate(
            (random()-0.5+tx)*(random()-0.5+tx)*tileSize,
            (random()-0.5+ty)*(random()-0.5+ty)*tileSize,
            (random()-0.5+tz)*(random()-0.5+tz)*tileSize);
          ellipse(0,0,tileSize*player.d*0.6*i/player.trailLength,tileSize*player.d*0.6*i/player.trailLength);
          pop();
        }
      pop();
    }
  }
  //*/
}

let fps=[];
let minFPS=1000;
function performanceMode(val){
  if(val){
    noSmooth();
    player.trailLength=0;
    targetFPS=30;
    frameRate(30);
  }
  else{
    smooth();
    player.trailLength=128;
    targetFPS=60;
    frameRate(60);
    minFPS=1000;
    fps=[];
  }
}

function drawMap(){
  run();
  tileSize=min(width/16,height/16);

  if(finish){
    camera.z+=(player.z-camera.z-3)*0.1;
    finishTransition+=(1-finishTransition)*0.1;
  }
  else if(!startedTime && camera.z>1){
    camera.z-=0.3-0.3/camera.z;
    camera.x+=(player.x-camera.x)*0.03;
    camera.y+=(player.y-camera.y)*0.03;
  }
  else{
    camera.z*=0.95;
    camera.x+=(player.x-camera.x)*0.3;
    camera.y+=(player.y-camera.y)*0.3;
  }

  camera.z+=Math.sqrt((player.vx*player.vx+player.vy*player.vy)*10)*0.005*tileSize;
  let t=HALF_PI/4;

  push();
    scale(startingHeight/height);
    translate(-camera.x*tileSize,-camera.y*tileSize);
    if(finish){
      translate(0,0,(-player.z*tileSize*ZMAG)*finishTransition);
      translate(camera.x*tileSize,camera.y*tileSize,(player.z-2+4*finishTransition)*tileSize*ZMAG);
      rotateX(finishTransition*QUARTER_PI);
      rotateZ(finishTransition*(-atan2(player.vy,player.vx)+HALF_PI));
      translate(-camera.x*tileSize,-camera.y*tileSize,-(player.z-1)*tileSize*ZMAG);
    }
    translate(0,0,-(camera.z-2)*tileSize*ZMAG*(1-finishTransition));

    noStroke();

  for(let i=0;i<currentMap.grid.length;i++){
    for(let j=0;j<currentMap.grid[i].length;j++){
      switch(currentMap.grid[i][j]){
        case("l"):
          triangleBox(j,i,1,1);
        break;
        case("r"):
          triangleBox(j,i,1,3);
        break;
        case(","):
          triangleBox(j,i,1,7);
        break;
        case("."):
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
      }
    }
  }

  for(let i=0;i<div.floor.length;i++){
    push();
    tileShadow(div.floor[i].x,div.floor[i].y,div.floor[i].w,div.floor[i].h,0,color(90));
    plane(div.floor[i].w*tileSize,div.floor[i].h*tileSize);
    pop();
  }
  for(let i=0;i<div.goal.length;i++){
    push();
    tileShadow(div.goal[i].x,div.goal[i].y,div.goal[i].w,div.goal[i].h,0,color(80,250,80));
    plane(div.goal[i].w*tileSize,div.goal[i].h*tileSize);
    pop();
  }
  for(let i=0;i<div.rail.length;i++){
    drawBox(div.rail[i].x,div.rail[i].y,div.rail[i].w,div.rail[i].h,1);
  }
  for(let i=0;i<div.wall.length;i++){
    drawBox(div.wall[i].x,div.wall[i].y,div.wall[i].w,div.wall[i].h,5,60,65,70);
  }

  drawPlayer();

  pop();

  ortho();
  resetMatrix();


  if(mouseIn){
    fps.push(frameRate());
  }

  if(fps.length>30){
    fps.shift();
  }

  let c=0;
  for(let i=0;i<fps.length;i++){
    c+=fps[i];
  }
  c/=fps.length;

  if(fps.length>=30&&mouseIn&&c>0&&c<minFPS){
    minFPS=(c*100>>0)/100;
  }

  fill(0,100);
  rect(-width/2,-height/2,width,120);

  fill(250);
  textSize(30);
  textAlign(LEFT,TOP);
  text((c>>0)+" FPS\nMIN "+minFPS,-width/2,-height/2);
  textSize(40);
  textAlign(CENTER,TOP);
  text((1+onLevel)+"-"+currentMap.title+"\n"+(timer/120/60>>0)+":"+(""+(timer/120>>0)%60).padStart(2,'0')+"."+(''+(1000*(timer%120)/120>>0)).padStart(3,'0'),0,2-height/2);
  if(save.mapTimes[currentMap.title]){
    textSize(20);
    text((save.mapTimes[currentMap.title]/120/60>>0)+":"+(""+(save.mapTimes[currentMap.title]/120>>0)%60).padStart(2,'0')+"."+(''+(1000*(save.mapTimes[currentMap.title]%120)/120>>0)).padStart(3,'0'),0,95-height/2);
  }

  let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

function draw() {
  if(can){
    document.getElementById('defaultCanvas0').addEventListener('mouseover',mOver);
    document.getElementById('defaultCanvas0').addEventListener('mouseout',mOut);
    can=null;
  }
  background(0);
  drawMap();
}

function keyPressed(){

  if(!startedTime && (keyCode == controls.up || keyCode == controls.down || keyCode == controls.left || keyCode == controls.right)){
    startedTime=true;
  }

  if(keyCode == controls.restart){
    setupLevel(onLevel);
    return;
  }

  if(keyCode == controls.skipLevel ||((keyCode == controls.nextLevel ||keyCode == controls.nextLevel2) && finish)){
    onLevel=(onLevel+1)%gameMaps.length;
    currentMap=gameMaps[onLevel];
    setupLevel(onLevel);
    return;
  }
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
