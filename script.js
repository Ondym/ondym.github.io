let pendulumn;
let g = 0.5;

let buffer;
let bx = 0;
let by = 0;
let started = false;
let range = Math.PI/180;
let hueID = 0;
let smallerDimension;

function setup() {
    if (!started) {
        started = true;
        createCanvas(windowWidth, windowHeight);
    }

    smallerDimension = min(windowWidth, windowHeight);

    reset();
}

function reset() {
    pendulumn = new doublePendulumn(0);
    bx = pendulumn.pos2.x;
    by = pendulumn.pos2.y;
    console.log(bx, by);

    colorMode(HSB, 1, 100, 100);

    buffer = createGraphics(width, height);
    buffer.background(0);
    buffer.translate(width / 2, height *0.3);
    buffer.colorMode(HSB, 1000, 100, 100);
}

function draw() {
    background(0);
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);
    buffer.stroke(hueID, 100, 100);
    hueID += 0.5;
    hueID %= 1000;
    
    bx = pendulumn.pos2.x;
    by = pendulumn.pos2.y;
    
    translate(width / 2, height * 0.3);
    pendulumn.update();
    pendulumn.render();

    if (frameCount > 1) {
        buffer.line(bx, by, pendulumn.pos2.x, pendulumn.pos2.y);
    }
}

//391.03225514223175 126.56899169948649
