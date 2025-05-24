const path = require('path');

// use extname method to extract the extension of the file from filepath
const ext = path.extname('D:\\Technical\\NodeJS\\module 3\\childprocess_os_modules.js');

console.log("ext" , ext);

// get the actual name of the file from filepath 
const basename = path.basename('D:\\Technical\\NodeJS\\module 3\\childprocess_os_modules.js')

console.log("basename" , basename);

console.log("filename" , __filename);

console.log("dirname" , __dirname);
