const ZMAG=1.5;
var currentMap;
const gameMaps=[
  {
    title:"Jump",
    grid:[
      "G",
      "+",
      "+",
      "+",
      "+",
      "+",
      "+",
      " ",
      " ",
      " ",
      " ",
      " ",
      "+",
      "+",
      "+",
      " ",
      " ",
      " ",
      " ",
      " ",
      "+",
      "+",
      "S",
      "+"],
    stars:[180,120,96,84]
  },
  {
    title:"Thing",
    grid:[
      " ,##################.           ",
      " ##{++++++++++++++}##           ",
      " #{++++++++++++++++}#           ",
      " #++++++++++++++++++#           ",
      " #++++++++++++++++++#           ",
      " #+++++++++###++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++#w#++++++#           ",
      " #+++++++++###++++++#wwwwwwwwwww",
      " #++++++++++++++++++#       l##w",
      " #++++++++++++++++++#        l#w",
      " #[+++++++]###++++++#wwww     lw",
      "w##[+++++]##w#++++++#w         w",
      "ww###+++###ww#++++++#w     ++++w",
      "w##{+++++}##w#++++++#w     ++++w",
      "w#{+++++++}#w#++++++#w     ++++w",
      "w#+++++++++#w#++++++#w     ++++w",
      "w#+++++++++#w#++++++#w         w",
      "w#+++++++++#w#++++++#w         w",
      "w#+++++++++#w#++++++#w++++     w",
      "w#+++++++++#w#++++++#w++++     w",
      "w#+++++++++#w#++++++#w++++     w",
      "w#+++++++++#w#++++++#w++++     w",
      "w#+++++++++#w#++++++#w         w",
      "w#[+++++++]#w#++++++#w         w",
      "w##[+++++]##w#++++++#w     ++++w",
      "ww###+++###ww#++++++#w     ++++w",
      "w##{+++++}##w#++++++#w     ++++w",
      "w#{+++++++}#w#++++++#w     ++++w",
      "w#+++++++++#w#++++++###########w",
      "w#+++++++++#w#+++++++GGGGGG####w",
      "w#+++++++++#w#+++++++GGGGGG####w",
      "w#+++++++++#w#+++++++GGGGGG####w",
      "w#++++S++++#w#+++++++GGGGGG####w",
      "w#[+++++++]#w#+++++++GGGGGG####w",
      "w##[+++++]##w#[++++++GGGGGG####w",
      "wl#########rwl##############wwww",
      "wwwwwwwwwwwww"],
    stars:[420,360,264,228]
  },
  {
    title:"Horrible",
    grid:[
  "                     w+ +    ",
  "                     w       ",
  "          w    w  +       +  ",
  "             w    w  w+      ",
  "      + w      +     w       ",
  "       w         w   w     + ",
  "   +    +  +         w       ",
  "                     w       ",
  "      +   w +   w    w       ",
  "   +   w             w    +  ",
  "w   w     +   +      w       ",
  "                   w w       ",
  "   +   +       w w   w       ",
  "  w  +     +  w+     w       ",
  "                     w     + ",
  "   w w  w + w    w   w +     ",
  " w            +      w       ",
  "     ++    ++      + w       ",
  "      + w    ++  w   w      +",
  "       +  +    +   + w       ",
  "  +  +      ++ w     w       ",
  " w  w ww  w  +       w +     ",
  "         +  w  w     w       ",
  "               +     w       ",
  "    +   +    w       w       ",
  "     w    +          w       ",
  "     +     wwww      w      +",
  "             S       w       ",
  "         +           w  G    ",
],
    stars:[7000,1000,120,60]
  },
  {
    title:"Mandelbrot",
    grid:[
      "               # ++   ++ #     ",
      "            + wwwww[ ]wwwww +  ",
      "           +#w#####w+w#####w#+ ",
      "            w###############w  ",
      "          +w#################w+",
      "          +w#################w+",
      "     [  +  w#################w  +  ]",
      "       +ww+w#################w+ww+  ",
      "     + w##ww#################ww##w +",
      "        ww+w#################w+ww   ",
      "           w#################w  ",
      "           w#################w  ",
      "           +w###############w+  ",
      "           +w###############w+  ",
      "          +##w#############w##+ ",
      "          +  +w###########w+  + ",
      "             + wwwwwGwwwww +    ",
      "                 +##w##+ ",
      "                  #www#  ",
      "                +]w###w[+",
      "                +w#####w+",
      "                #w#####w#",
      "                +w#####w+",
      "                ]#w###w#[",
      "                 +#www#+ ",
      "                  +}w{+  ",
      "                   +#+",
      "                    # ",
      "                    # ",
      "                    # ",
      "                    + ",
      "                    + ",
      "                   l#r",
      "                    + ",
      "                    + ",
      "                    S ",
      "                    + "],
    stars:[1920,1440,960,600]
  },
  {
    title:"Test map",
    grid:[
      " ,##################.",
      " #{++++++++++++++++}#",
      " #++++++++++++++++++#",
      " #++++++++++++++++++#",
      " #++++++++++++++++++#",
      " #+++++++++]#[++++++#",
      " #+++++++++###++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++#w#++++++#",
      " #+++++++++###++++++#",
      " #++++++++++++++++++#",
      " #++++++++++++++++++#",
      " #[+++++++]###++++++#",
      "ww###+++###ww#++++++#",
      "w#{+++++++}#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#[+++++++]#w#++++++#",
      "ww###+++###ww#++++++#",
      "w#{+++++++}#w#++++++#",
      "w#+++++++++#w#++++++#",
      "w#+++++++++#w#++++++########",
      "w#+++++++++#w#+++++++GGGGGG#",
      "w#+++++++++#w#+++++++GGGGGG#",
      "w#+++++++++#w#+++++++GGGGGG#",
      "w#++++S++++#w#+++++++GGGGGG#",
      "w#+++++++++#w#+++++++GGGGGG#",
      "w#[+++++++]#w#[++++++GGGGGG#",
      "wl#########rwl##############",
      "wwwwwwwwwwwww"],
    stars:[420,360,264,228]
  },
  {
    title: "Bemazed",
    grid: [
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
        "wwwwwwwwwwwwwwwwwwwwwwwww            "],
    stars:[960,720,420,312]
  },
  {
    title: "Square Off",
    grid: [
        "wwwwww+wwwwwwwwwwwwwwwww",
        "w++++++##       ##   ++w",
        "w++++++##       ##   ++w",
        "w++wwwwww            ++w",
        "w++     w            ++w",
        "w++     wwwww  www   ++w",
        "wwwwww  w      w     ++w",
        "w++     w      w     ++w",
        "w[+     w##wwwww  www++w",
        "ww[     ###w         ++w",
        "www.    ###w         ++w",
        "wwww.   wwww   wwwwww++w",
        "wwwww.  w   +++w     ++w",
        "wwwww{  w   +++w     ++w",
        "wwww{+  w   +++w     ++w",
        "www{++ ww  wwwww     ++w",
        "ww{++]www  #GGG#     ++w",
        "w{++]www   #GGG#     ++w",
        "#++]www    #GGG#     ++w",
        "#S]www     #GGG#     ++w",
        "#]www      #GGG#     ++w",
        "#www+++++++++++++++++++w",
        "www++++++++++++++++++++w",
        "wwwwwwwwwwwwwwwwwwwwwwww"],
    stars:[1200,900,720,600]
  }
];

let save={
  version:0.3,
  mapTimes:{},
  replays:{},
  controls:{},
  controlsSettings:[],
  name:""
};
for(let m in gameMaps){
  save.mapTimes[gameMaps[m].title]=0;
  save.replays[gameMaps[m].title]=0;
}

function setCookie() {
  save.controls=controls;
  save.controlsSettings=controlsSettings;
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
      save.name=data.name;
      settingsObjects[0].name="Change name - "+save.name;
      for(let m in data.mapTimes){
        save.mapTimes[m]=data.mapTimes[m];
        save.replays[m]=data.replays[m];
      }
      controls=data.controls;
      controlsSettings=data.controlsSettings;
      while(levelSelected<gameMaps.length-1 && save.mapTimes[gameMaps[levelSelected].title]>0){
        levelSelected++;
      }
    }
    catch(e){console.log("Save data invalid");}
  }
}

const div={
  floor:[],
  rail:[],
  wall:[],
  goal:[],
};

let keys = [];

let lastInputChangeFrame = 0;
let frame = 0;
let replay = {
  levelTitle: "",
  controlState:[]
};
let playback = false;
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
  pause:8
};

const controlsSettings=[
  ['up','Up','Arrow Up'],
  ['down','Down','Arrow Down'],
  ['left','Left','Arrow Left'],
  ['right','Right','Arrow Right'],
  ['jump','Jump','Space'],
  ['spin','Charged Boost','Z'],
  ['blink','Cooldown Boost','X'],
  ['restart','Restart Level','R'],
  ['nextLevel','UI Select / Next Level','Enter'],
  ['pause','Pause','Backspace'],
];
const controlTypes = Object.keys(controls);
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
let showFPS=false;

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

function setupLevel(lvl,restarting){
  keys[controls.up]=false;
  keys[controls.down]=false;
  keys[controls.left]=false;
  keys[controls.right]=false;

  lastInputChangeFrame = 0;
  frame=0;
  if (!playback) {
    replay = {
      levelTitle: gameMaps[lvl].title,
      controlState: []
    };
  }

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

  if(!restarting){
    camera.x=currentMap.grid[0].length/2;
    camera.y=currentMap.grid.length/2;
    camera.z=Math.max(camera.x,camera.y)*2;
  }
  else{
    camera.x=player.x;
    camera.y=player.y;
    camera.z=0;
  }

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
  // i is X, j is Y for the currentMap.grid
  if(i<0||j<0){return;}
  let t=currentMap.grid.length>j?(currentMap.grid[j].length>i?currentMap.grid[j][i]:false):false;
  if(t===false){return;}
  let temp;
  switch(t){
    // normal ground
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
    // ledge
    case('#'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],1,player.x,player.y,player.z,player.d/2);
    break;
    //wall
    case('w'):
      return shapeIntersect([
        {x:i-0.5001,y:j-0.5},
        {x:i+0.5001,y:j-0.5},
        {x:i+0.5,y:j+0.5},
        {x:i-0.5,y:j+0.5},
      ],5,player.x,player.y,player.z,player.d/2);
    break;
    // triangles
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
  let X=Math.floor(x+0.5);
  let Y=Math.floor(y+0.5);
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

        console.log(JSON.stringify(replay))
      }
      return 0;
    default:
      return 0;
  }
}

function stepPlayer() {

  if (finish) { return; }

  //Either we're watching a replay, or we're making one
  if (playback) {
    if (frame === 0 || replay.controlState[frame]) {
      lastInputChangeFrame = frame;

      //Read the keys
      let controlState = replay.controlState[frame];
      [...controlState.keys()].forEach(index => keys[controls[controlTypes[index]]] = controlState[index]);
    }
    else {
      //Otherwise keep the keys as they are
    }
  }
  else {
    let controlState = controlTypes.map(controlType => controls[controlType]).map(controlKey => keys[controlKey]);
    //If we just started the game, then track the first frame of input
    if (frame === 0) {
      lastInputChangeFrame = frame;
      replay.controlState[lastInputChangeFrame] = controlState;
    }
    else {
      let lastControlState = replay.controlState[lastInputChangeFrame];
      let inputChanged = !([...Array(controlTypes.length).keys()].every(index => controlState[index] === lastControlState[index]));
      if (inputChanged) {
        lastInputChangeFrame = frame;
        replay.controlState[lastInputChangeFrame] = controlState;
      }
    }
  }
  frame++;
  if (!startedTime && (keys[controls.up] || keys[controls.down] || keys[controls.left] || keys[controls.right])) {
    startedTime = true;
  }

  if(startedTime){
    timer++;
  }
  if(player.z<-20){
    setupLevel(onLevel,true);
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
  if (keys[controls.jump] && !jump) {
    if (player.z === ground) {
      jump = true;
      player.vz += player.az;
    }
    else if (player.z > ground && !doubleJump) {
      doubleJump = true;
      player.vz *= -0.25;
      player.vz += player.az;
    }
    else {
      jump = true;
    }
  } else if (jump && !keys[controls.jump]) {
    jump = false;
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


function drawStar(x,y,s,time,stars){
  fill(30);
  if(time===0){}
  else if(time===-1){
    fill(230, 115, 215,100);
  }
  else if(time===-2){
    fill(230, 115, 215);
  }
  else if(time<=stars[3]){
    fill(200, 50, 180);
  }
  else if(time<=stars[2]){
    fill(255, 215, 0);
  }
  else if(time<=stars[1]){
    fill(192);
  }
  else if(time<=stars[0]){
    fill(170, 70, 30);
  }

  beginShape();
  for(let i=0;i<TWO_PI;i+=TWO_PI/5){
    vertex(x+s/2*sin(i),y+s/2*cos(i));
    vertex(x+s*sin(i+TWO_PI/10),y+s*cos(i+TWO_PI/10));
  }
  endShape();
  if(time && time<=stars[3]){
      drawStar(x,y,s*1.3,-1,[-10,-10,-10,-10]);
      drawStar(x,y,s*0.8,-2,[-10,-10,-10,-10]);
  }
  else if(time && time<=stars[2]){
    fill(255,255,150);
    beginShape();
    vertex(x,y-s);
    vertex(x+s/2*sin(-TWO_PI/5*2),y+s/2*cos(-TWO_PI/5*2));
    vertex(x+s*sin(-TWO_PI/10*3),y+s*cos(-TWO_PI/10*3));
    vertex(x,y);
    endShape();

    beginShape();
    vertex(x+s*sin(-TWO_PI/10),y+s*cos(-TWO_PI/10));
    vertex(x+s/2*sin(-TWO_PI/5),y+s/2*cos(-TWO_PI/5));
    vertex(x,y);
    endShape();

    beginShape();
    vertex(x+s*sin(TWO_PI/10*3),y+s*cos(-TWO_PI/10*3));
    vertex(x+s/2*sin(TWO_PI/5*2),y+s/2*cos(-TWO_PI/5*2));
    vertex(x,y);
    endShape();

    beginShape();
    vertex(x+s*sin(TWO_PI/10),y+s*cos(-TWO_PI/10));
    vertex(x+s/2*sin(TWO_PI/5),y+s/2*cos(-TWO_PI/5));
    vertex(x,y);
    endShape();
  }
}

function run(){
    if(!finish){
      if(targetFPS<50){
        stepPlayer();
        stepPlayer();
      }
      stepPlayer();
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

function drawMap(paused){
  if(!paused){
    run();
  }
  tileSize=min(width/16,height/16);

  for(let i=targetFPS<50?2:1;i>0;i--){
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
  }
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


  if(showFPS){
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

    fill(255);
    textSize(30);
    textAlign(LEFT,TOP);
    text((c>>0)+" FPS\nMIN "+minFPS,-width/2,-height/2);
  }
  fill(255);
  textSize(40);
  textAlign(CENTER,TOP);
  text((1+onLevel)+"-"+currentMap.title+"\n"+(timer/120/60>>0)+":"+(""+(timer/120>>0)%60).padStart(2,'0')+"."+(''+(1000*(timer%120)/120>>0)).padStart(3,'0'),0,2-height/2);
  if(save.mapTimes[currentMap.title]){
    textSize(20);
    text((save.mapTimes[currentMap.title]/120/60>>0)+":"+(""+(save.mapTimes[currentMap.title]/120>>0)%60).padStart(2,'0')+"."+(''+(1000*(save.mapTimes[currentMap.title]%120)/120>>0)).padStart(3,'0'),0,95-height/2);
  }

  if(finish){
    drawStar(-width/4,0,width/6,timer,currentMap.stars);
  }

  let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

let menuSelected=false;
let menuStates=['level select','controls','settings'];
let menuState=0;

let uiScroll=0;
let levelSelected=0;
let controlSelected=0;
let settingSelected=0;
function menuBar(){
  fill(20);
  rect(-width/2,-height/2,width,width/15);
  fill(40);
  if(menuSelected){
    let uiSelectors=[levelSelected,controlSelected,settingSelected];
    if(keys[controls.right]){
      keys[controls.right]=false;
      menuState++;
      if(menuState<0){menuState=2;}
      if(menuState>2){menuState=0;}
      uiScroll=menuState?uiSelectors[menuState]:uiSelectors[menuState]/4>>0;
      if(uiSelectors[menuState]>=0){
        menuSelected=false;
      }
      else{uiScroll=0;}
    }
    if(keys[controls.left]){
      keys[controls.left]=false;
      menuState--;
      if(menuState<0){menuState=2;}
      if(menuState>2){menuState=0;}
      uiScroll=menuState?uiSelectors[menuState]:uiSelectors[menuState]/4>>0;
      if(uiSelectors[menuState]>=0){
        menuSelected=false;
      }
      else{uiScroll=0;}
    }
    if(keys[controls.down]){
      keys[controls.down]=false;
      menuSelected=false;
    }
    state=menuStates[menuState];
    fill(60);
  }
  rect(-width/2+width/3*menuState,-height/2,width/3,width/15);
  fill(255);
  textSize(width/25);
  textAlign(CENTER,CENTER);
  text("Levels",-width/2+width/6,-height/2+width/40);
  text("Controls",-width/2+width/2,-height/2+width/40);
  text("Settings",width/2-width/6,-height/2+width/40);
}

let state="level select";

let settingControl=false;
function controlsBox(control,x,y,w,h){
  fill(10);
  if(control===controlSelected){
    fill(30);
  }
  rect(x+2,y+2,w-4,h-4);
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(h/3);
  text(controlsSettings[control][1],x,y,w/3,h);
  text(controlsSettings[control][2],x+w*2/3,y,w/3,h);
}

function setControls(){
  if(!menuSelected){
    if(controlSelected<0){controlSelected=0;}
    if(keys[controls.left] || keys[controls.right]){
      menuSelected=true;
    }
    if(keys[controls.down]){
      keys[controls.down]=false;
      controlSelected++;
    }
    if(keys[controls.up]){
      keys[controls.up]=false;
      controlSelected--;
    }
    if(controlSelected<0){menuSelected=true;}
    if(controlSelected>=controlsSettings.length){controlSelected=controlsSettings.length-1;}
    if((keys[controls.nextLevel] || keys[controls.nextLevel2]) && controlSelected>=0 ){
      keys[controls.nextLevel]=false;
      keys[controls.nextLevel2]=false;
      settingControl=controlSelected;
    }
  }

  for(let i=targetFPS<50?2:1;i>0;i--){
    if(controlSelected>=0){
      uiScroll+=(controlSelected-uiScroll)*0.05;
    }
    else{
      uiScroll+=-uiScroll*0.05;
    }
  }
  ortho();
  resetMatrix();
  push();
  translate(0,height/2-uiScroll*width/20-width/20+width/30);
  for(let i=0;i<controlsSettings.length;i++){
    controlsBox(i,-width/2+width/4,
      i*width/20-height/2,
      width/2,
      width/20,i);
  }
  pop();
  menuBar();
  if(settingControl!==false){
    fill(50);
    rect(-width/3,-width/6,width*2/3,width/3);
    fill(255);
    textSize(width/20);
    textAlign(CENTER,CENTER);
    text("Press a key to set for\n"+controlsSettings[settingControl][1],-width/3,-width/6,width*2/3,width/3-width/20);
  }
  let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

let settingsObjects=[
  {
    name:"Change name - N/A",
    type:"action",
    run:function(){
      save.name="";
      while(save.name===""){
        save.name=prompt("What would you like to be called?\n(This is what will show on leaderboards)");
        if(save.name==false||save.name===null){
          alert("Name can't be blank");
          save.name='';
        }
        else if(save.name.length>12){
          alert('Name must be 12 characters or less.');
          save.name='';
        }
      }
      settingsObjects[0].name="Change name - "+save.name;
    }
  },
  {
    name:"Fullscreen",
    type:"toggle",
    value:false,
    run:function(fs){fullscreen(fs);}
  },
  {
    name:"Show FPS",
    type:"toggle",
    value:false,
    run:function(fs){showFPS=fs;}
  },
  {
    name:"Target Framerate",
    type:"choice",
    value:1,
    choices:[
      {
        name:"30",
        run:function(){targetFPS=30;frameRate(30);}
      },
      {
        name:"60",
        run:function(){targetFPS=60;frameRate(60);}
      }
    ]
  },
  {
    name:"Anit-aliasing",
    type:"toggle",
    value:true,
    run:function(selected){if(selected){smooth();}else{noSmooth();}}
  },
  {
    name:"Trail Length",
    type:"choice",
    value:2,
    choices:[
      {
        name:"0",
        run:function(){player.trailLength=0;}
      },
      {
        name:"64",
        run:function(){player.trailLength=64;}
      },
      {
        name:"128",
        run:function(){player.trailLength=128;}
      }
    ]
  },
];

function settingsBox(id,x,y,w,h){
  let setting=settingsObjects[id];
  fill(id===settingSelected?30:10);
  rect(x+2,y+2,w-4,h-4);
  fill(255);
  textSize(h/3);
  textAlign(CENTER,CENTER);
  switch(setting.type){
    case("action"):
      text(setting.name,x,y,w,h-h/12);
    break;
    case("toggle"):
      text(setting.name,x,y,w/2,h-h/12);
      rect(x+w*2/3,y+h/6,h*2/3,h*2/3);
      fill(id===settingSelected?30:10);
      rect(x+w*2/3+2,y+h/6+2,h*2/3-4,h*2/3-4);
      if(setting.value){
        fill(255);
        rect(x+w*2/3+4,y+h/6+4,h*2/3-8,h*2/3-8);
      }
    break;
    case("choice"):
      text(setting.name,x,y,w/3,h-h/12);
      for(let i=0;i<setting.choices.length;i++){
        if(setting.value===i){
          fill(60);
          rect(x+w/3+i*w*2/3/setting.choices.length,y,w*2/3/setting.choices.length,h);
          fill(255);
        }
        text(setting.choices[i].name,x+w/3+i*w*2/3/setting.choices.length,y,w*2/3/setting.choices.length,h-h/12);
      }
    break;
  }
}

function settings(){
  if(!menuSelected){
    if(settingSelected<0){settingSelected=0;}
    if(keys[controls.left] || keys[controls.right]){
      menuSelected=true;
    }
    if(keys[controls.down]){
      keys[controls.down]=false;
      settingSelected++;
    }
    if(keys[controls.up]){
      keys[controls.up]=false;
      settingSelected--;
    }
    if(settingSelected<0){menuSelected=true;}
    if(settingSelected>=settingsObjects.length){settingSelected=settingsObjects.length-1;}
    if((keys[controls.nextLevel] || keys[controls.nextLevel2]) && settingSelected>=0 ){
      console.log(settingSelected);
      keys[controls.nextLevel]=false;
      keys[controls.nextLevel2]=false;
      switch(settingsObjects[settingSelected].type){
        case("toggle"):
          settingsObjects[settingSelected].value=!settingsObjects[settingSelected].value;
            settingsObjects[settingSelected].run(settingsObjects[settingSelected].value);
          break;
        case("action"):
          settingsObjects[settingSelected].run();
        break;
        case("choice"):
          settingsObjects[settingSelected].value=(settingsObjects[settingSelected].value+1)%settingsObjects[settingSelected].choices.length;
          settingsObjects[settingSelected].choices[settingsObjects[settingSelected].value].run();
        break;
      }
    }
  }

  for(let i=targetFPS<50?2:1;i>0;i--){
    if(settingSelected>=0){
      uiScroll+=(settingSelected-uiScroll)*0.05;
    }
    else{
      uiScroll+=-uiScroll*0.05;
    }
  }
  ortho();
  resetMatrix();
  push();
  translate(0,height/2-uiScroll*width/20-width/20+width/30);
  for(let i=0;i<settingsObjects.length;i++){
    settingsBox(i,-width/2+width/4,
      i*width/20-height/2,
      width/2,
      width/20,i);
  }
  pop();
  menuBar();
  let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

function levelBox(lvl,x,y,w,h,n){
  fill(50);
  if(n===levelSelected){
    fill(80);
  }
  rect(x,y,w,h);
  fill(255);
  textSize(h/4);
  text(lvl.title,x+w*1/3,y+h*1/6,w*2/3,h/2);
  fill(0);
  ellipse(x+w/6,y+h/2,h*2/3,h*2/3);

  if(save.mapTimes[lvl.title]){
    fill(255);
    textSize(h/5);
    text((save.mapTimes[lvl.title]/120/60>>0)+":"+(""+(save.mapTimes[lvl.title]/120>>0)%60).padStart(2,'0')+"."+(''+(1000*(save.mapTimes[lvl.title]%120)/120>>0)).padStart(3,'0'),x+w*1/3,y+h*3/5,w*2/3,h*1/3);
  }
  else{
    fill(255);
    textSize(h/5);
    text("N/A",x+w*1/3,y+h*3/5,w*2/3,h*1/3);
  }

  drawStar(x+w/6,y+h/2,h/3,save.mapTimes[lvl.title],lvl.stars);

  if(n>0 && (save.mapTimes[gameMaps[n-1].title] === 0 || save.mapTimes[gameMaps[n-1].title]>gameMaps[n-1].stars[0] ) ){
    fill(0,100);
    rect(x,y,w,h);
  }
}

function levelSelect(){
  if(!menuSelected){
    if(levelSelected<0){levelSelected=0;}
    if((keys[controls.nextLevel] || keys[controls.nextLevel2]) && (levelSelected===0 || (save.mapTimes[gameMaps[levelSelected-1].title] && save.mapTimes[gameMaps[levelSelected-1].title]<=gameMaps[levelSelected-1].stars[0]))){
      keys[controls.nextLevel]=false;
      keys[controls.nextLevel2]=false;
      setupLevel(levelSelected);
      state="game";
    }
    if(keys[controls.right]){
      if(!((1+levelSelected)%4) || levelSelected === gameMaps.length-1){
        menuSelected=true;
      }
      else{
        levelSelected++;
        keys[controls.right]=false;
      }
    }
    if(keys[controls.left]){
      if(!(levelSelected%4)){
        menuSelected=true;
      }
      else{
        levelSelected--;
        keys[controls.left]=false;
      }
    }
    if(keys[controls.down]){
      keys[controls.down]=false;
      levelSelected+=4;
    }
    if(keys[controls.up]){
      keys[controls.up]=false;
      levelSelected-=4;
    }
    if(levelSelected<0){levelSelected=-1;menuSelected=true;}
    if(levelSelected>=gameMaps.length){levelSelected=gameMaps.length-1;}
  }
  if(save.name===""){
    while(save.name===""){
      save.name=prompt("What would you like to be called?\n(This is what will show on leaderboards)");
      if(save.name==false||save.name===null){
        alert("Name can't be blank");
        save.name='';
      }
      else if(save.name.length>12){
        alert('Name must be 12 characters or less.');
        save.name='';
      }
    }
    settingsObjects[0].name="Change name - "+save.name;
  }
  ortho();
  resetMatrix();
  push();

  for(let i=targetFPS<50?2:1;i>0;i--){
    uiScroll+=((levelSelected/4>>0)-uiScroll)*0.05;
  }
  translate(0,height/2-uiScroll*width/10-width/20+width/30);
  textAlign(LEFT,CENTER);
  for(let i=0;i<gameMaps.length;i++){
    levelBox(gameMaps[i],i%4*width/4-width/2+2,
      (i/4>>0)*width/10-height/2+2,
      width/4-4,
      width/10-4,i);
  }
  pop();
  menuBar();
  let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

let menuOption=0;
function pausedGame(){
  drawMap(true);

  ortho();
  resetMatrix();
  fill(255,200);
  rect(-width/6,-width/16,width/3,width/8);

  fill(230);
  if(menuOption){
    rect(-width/6,width/64,width/6,width/64*3);
  }
  else{
    rect(0,width/64,width/6,width/64*3);
  }
  noStroke();

  fill(0);
  textAlign(CENTER,CENTER);
  textSize(width/40);
  text("Quit to\nlevel select?",0,-width/32);
  text("YES",-width/12,width/28);
  text("NO",width/12,width/28);

  let eyeZ=(600/2.0) / tan(PI*60.0/360.0);
  perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
}

checkCookie();
function draw() {
  noStroke();
  if(can){
    document.getElementById('defaultCanvas0').addEventListener('mouseover',mOver);
    document.getElementById('defaultCanvas0').addEventListener('mouseout',mOut);
    can=null;
  }
  background(0);
  switch(state){
    case('game'):drawMap();break;
    case('level select'):levelSelect();break;
    case('controls'):setControls();break;
    case('settings'):settings();break;
    case('paused'):pausedGame();break;
  }
}

function keyPressed() {
  switch(state){
    case('paused'):
      if(keyCode == controls.left || keyCode == controls.right){
        menuOption=!menuOption;
        return;
      }
      if(keyCode == controls.nextLevel || keyCode == controls.nextLevel2){
        if(menuOption){
          state='level select';
          levelSelected=onLevel;
        }
        else{
          state='game';
        }
        return;
      }
    break;
    case('game'):
      if(keyCode == controls.restart){
        setupLevel(onLevel,true);
        return;
      }
      if(keyCode == controls.pause){
        state='paused';
        menuOption=0;
        return;
      }
      //For now, we don't let the player do anything during playback
      if (playback) {
        return;
      }
      if( (keyCode == controls.nextLevel || keyCode == controls.nextLevel2) && finish ){
        if(timer>currentMap.stars[0]){
          setupLevel(onLevel,true);
        }
        else{
          onLevel=(onLevel+1);
          if(onLevel>=gameMaps.length){
            onLevel--;
            state="level select";
          }
          currentMap=gameMaps[onLevel];
          setupLevel(onLevel);
        }
        return;
      }
    break;
    case('controls'):
      if(settingControl!==false){
        for(let i in controls){
          if(controls[i] === keyCode){
            settingControl=false;
            alert("'"+(key.length>1?key.replace(/[\w]([A-Z])/g, function(s) {return s[0]+" "+s[1];}):key===' '?'Space':key.toUpperCase())+"' is already mapped to '"+controlsSettings[controlsSettings.map(function(a){return a[0];}).indexOf(i)][1]+"'");
            return;
          }
        }
        controls[controlsSettings[settingControl][0]]=keyCode;
        controlsSettings[settingControl][2]=key.length>1?key.replace(/[\w]([A-Z])/g, function(s) {return s[0]+" "+s[1];}):key===' '?'Space':key.toUpperCase();
        settingControl=false;
        return;
      }
    break;
  }
  keys[keyCode]=true;
}
function keyReleased() {
  //For now, we don't let the player do anything during playback
  if (playback) {
    return;
  }
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
