'use strict';
 
const fs = require('fs');
 
process.stdin.resume();
process.stdin.setEncoding('utf-8');
 
let inputString = '';
let currentLine = 0;
 
process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});
 
process.stdin.on('end', function() {
    inputString = inputString.split('\n');
 
    main();
});
 
function readLine() {
    return inputString[currentLine++];
}
 
 
 
/*
 * Complete the 'findMaxNum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER x
 *  2. INTEGER y
 *  3. INTEGER z
 */
 
function findMaxNum(x, y, z) {
    // Write your code here
    let ret = 0;
    if (z < Math.abs(x-y)) {
        return -1;
    }
    if ( x >= y ){
        ret = Math.floor(x + (z - (x - y)) / 2);        
    }
    if ( x <= y){
        ret = Math.floor(y + (z - (y - x)) / 2);
    } 
    return ret
}
 
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
    const x = parseInt(readLine().trim(), 10);
 
    const y = parseInt(readLine().trim(), 10);
 
    const z = parseInt(readLine().trim(), 10);
 
    const result = findMaxNum(x, y, z);
 
    ws.write(result + '\n');
 
    ws.end();
}
