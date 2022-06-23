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

class User {
    constructor(username) {
        this.userName = username;
    }
    getUsername() {
        return this.userName
    }
    setUsername(username) {
        this.userName = username;
    }
}

class ChatUser extends User {
    constructor(username) {
        super(username)
        this.warnings = 0
    }
    giveWarning() {
        this.warnings++
    }
    getWarningCount(){
        return this.warnings
    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const initialUsername = readLine().trim();
    const chatUserObj = new ChatUser(initialUsername);
    
    let numberOfOperations = parseInt(readLine().trim());
    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const operation = inputs[0];
        const username = inputs[1];

        switch(operation) {
            case 'GiveWarning':
                chatUserObj.giveWarning();
                break;
            case 'SetName':
                chatUserObj.setUsername(username);
                break;
            default:
                break;
        }
    }
    ws.write(`User ${chatUserObj.getUsername()} has a warning count of ${chatUserObj.getWarningCount()}\n`);
    ws.write(`ChatUser extends User: ${(chatUserObj instanceof User).toString()}`);
    ws.end();
}