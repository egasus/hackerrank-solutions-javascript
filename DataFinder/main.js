'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}


function dataFinder(data) {
    // Write your code here
    const err = new Error("Invalid range")
    
    function find(minRange,maxRange,val){
        if (minRange >=0 & maxRange<data.length) {
            const index = data.indexOf(val)
            if (index >= minRange && index <=maxRange) {
                return true
            } else{
                return false
            }
        } else {
            return err
        }
    }
    return find
}

function dataFinder2(data) {
    // Write your code here
    const err = new Error("Invalid range")
    
    function find(minRange,maxRange,val){
        if (minRange >=0 & maxRange<data.length) {
            //return data.slice(minRange,maxRange+1).indexOf(val) < 0 ? false:true
            return data.slice(minRange,maxRange+1).includes(val)

        } else {
            return err
        }
    }
    return find
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const data = readLine().trim().split(' ');
    const finalData = data.map(val => parseInt(val));
    const join = dataFinder(finalData);
    try {
        const inputs = readLine().trim().split(' ');
        const result = join(parseInt(inputs[0]), parseInt(inputs[1]), parseInt(inputs[2]));
        ws.write(result.toString());
    } catch(e) {
        ws.write(`${e}`);
    }
    ws.end();
}