let timeZero = 0;
let time = new Date;

let result = new Array;
let testInProgress = false;
let block;
let lightUp;

function beginTest() {
    if (testInProgress) { return; }
    block = document.getElementById('clickable-block');
    testInProgress = true;
    lightUp = false;

    document.getElementById("test-explaining").style.display = "none";
    setTimeout(() => {
        block.style.backgroundColor = "#af5059";
        lightUp = true;
        stopWatch(true);
    }, (Math.random() * 3000) + 1000);
}

let cheated = false;
function blockClicked() {
    if (!lightUp) {
        cheated = true;
        return;
    }
    if (cheated) {
        result.push(-1);
    } else {
        result.push(stopWatch());
    } 
    
    block.style.background = "#000";
    lightUp = false;
    cheated = false;
    
    if (result.length < 2) {
        setTimeout(() => {cheated = false}, 700)
        setTimeout(() => {
            block.style.backgroundColor = "#af5059";
            lightUp = true;
            stopWatch(true);
        }, Math.floor(Math.random() * 4000) + 2000);
    } else {
        console.log(result);
        result = String(result);
        console.log(resultInput);
        
        resultInput.value = result;
        // document.getElementById("submit").click();
    }
}

function stopWatch(_set) {
    time = new Date;
    if (_set) {
        timeZero = time.getTime();
        return;
    }
    return Math.abs(timeZero - time.getTime());
}