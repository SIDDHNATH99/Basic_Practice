// lets create delete and read directory using nodejs 
const fs = require('fs');

// 1 create directory 
const mkdir = fs.mkdirSync('directory1');

console.log(mkdir);

// create file inside the directory
const createfile = fs.writeFileSync('./directory1/data2.txt', 'Hello guys')

console.log(createfile);

// read directory 
const readdirectory = fs.readdirSync('directory1');

console.log(readdirectory);

// remove directory 
const rmdir = fs.rmdirSync('directory1');

console.log(rmdir);

