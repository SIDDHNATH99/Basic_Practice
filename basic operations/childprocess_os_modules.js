var cp = require('child_process');
var os = require('os');


// // commands which can be used with child process module
// cp.execSync('start chrome');

// cp.execSync('calc');

// cp.execSync('start chrome https://www.youtube.com/');


// commands to use with os module 

console.log(os.arch());
console.log(os.platform());
console.log(os.networkInterfaces());
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem());
