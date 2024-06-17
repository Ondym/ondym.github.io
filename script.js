let nodes;
let nodeSize;
let totalBlobs;
let lastBlobNodes;
let n;
let colorify = false;
let HUEstep;

Object.defineProperty(Array.prototype, 'includesVector', {
    value: function(_v) { 
        for (let i = 0; i < this.length; i++) {
            if (this[i].x == _v.x && this[i].y == _v.y) {
                return true;
            }
        }

        return false;
     }
});

function setup() {
    createCanvas(700, 700);

    nodes = new Array;
    let size = 100;
    n = 0;
    for (let i = 0; i < size; i++) {
        nodes.push(new Array);
        for (let j = 0; j < size; j++) {
            nodes[i].push(genValue(0.5));
            if (nodes[i][j]) n++;
        }
    }

    nodeSize = width / nodes.length;
    totalBlobs = separateBlobs();
    HUEstep = 255 / totalBlobs.length;

    lastBlobNodes = new Array;

    let avgNodesPerBlob = floor(n / totalBlobs.length * 10**4) / 10**4;

    let info = document.getElementById("tit");
    info.innerText = "Počet (černých) bodů: " + n + "\nPočet blobů: " + totalBlobs.length + "\nAVG # bodů v blobu: " + avgNodesPerBlob;
}

function draw() {
    noStroke();
    background(255);
    fill(0);

    if (colorify) {
        colorMode(HSB);
        for (let i = 0; i < totalBlobs.length; i++) {
            for (let j = 0; j < totalBlobs[i].length; j++) {
                fill(i * HUEstep, 90, 90);
                rect(totalBlobs[i][j].x * nodeSize, totalBlobs[i][j].y * nodeSize, nodeSize, nodeSize);
            }
        }
        colorMode(RGB);
    } else {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[0].length; j++) {
                if (nodes[i][j]) {
                    rect(i*nodeSize, j*nodeSize, nodeSize, nodeSize);
                }
            }
        }
    }

    if (colorify) fill(10);
    else          fill(215, 120, 18);

    for (let i = 0; i < lastBlobNodes.length; i++) {
        rect((lastBlobNodes[i].x + .25) * nodeSize, (lastBlobNodes[i].y + .25) * nodeSize, nodeSize/2, nodeSize/2);
    }
}

function mouseClicked() {
    lastBlobNodes = getBlob(floor(mouseX/nodeSize), floor(mouseY/nodeSize));
}

function keyPressed() {
    if (keyCode == ENTER) {
        colorify = !colorify;
    }
}

function genValue(_p) {
    // _p is the probability of getting 1
    return random() < _p ? 1 : 0
}

function getBlob(_x, _y) {
    if (!nodes[_x][_y]) return new Array;
    let opened = [simpleVector(_x, _y)];
    let blobNodes = [].concat(opened);

    let m = 0;
    while (opened.length > 0 && m < 100) {
        m++; // insurance
        let newOpened = new Array;

        for (let i = 0; i < opened.length; i++) {
            for (let X = -1; X < 2; X++) {
                for (let Y = -1; Y < 2; Y++) {
                    if (abs(X) + abs(Y) == 1) {
                        let nextVector = simpleVector(
                            (opened[i].x + X + nodes.length) % nodes.length, // adding nodes.length to wrap -1 to the other side
                            (opened[i].y + Y + nodes.length) % nodes.length
                        );
                        if (!blobNodes.includesVector(nextVector) && nodes[nextVector.x][nextVector.y]) {
                            newOpened.push(nextVector);
                            blobNodes.push(nextVector);
                        }
                    }
                }
            }
        }

        opened = newOpened;
        // console.log(m, opened);
    }

    return blobNodes;
}

function simpleVector(_x, _y) {
    return {x: _x, y: _y};
}

function separateBlobs() {
    let nodesRegistered = [ ];
    let blobs = new Array;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (!nodesRegistered.includesVector(simpleVector(i, j))) {
                let blob = getBlob(i, j);
                if (blob.length > 0) {
                    nodesRegistered = nodesRegistered.concat(blob);
                    blobs.push(blob);
                }
            }
        }
    }

    return blobs;
}