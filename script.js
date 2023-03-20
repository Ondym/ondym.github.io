let timeZero = 0;
let time = new Date;

let result = new Array;

function stopWatch(_set) {
    time = new Date;
    if (_set) {
        timeZero = time.getTime();
        return; 
    }
    return Math.abs(timeZero - time.getTime());
}