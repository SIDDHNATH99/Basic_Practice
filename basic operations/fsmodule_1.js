// const fs = require('fs');

// // use fs module for different operations

// // write file 
// const writefile = fs.writeFileSync('file1.txt', 'New data has beed written ');

// console.log("writefile", writefile);

// //append data into file
// const appendfile = fs.appendFileSync('file1.txt', '& New data written with append method')

// console.log("appendfile", appendfile)

// // read file 
// const readiledata = fs.readFileSync('file1.txt');

// console.log("readiledata " + readiledata);

// // deletefile
// // const deletefile = fs.unlinkSync('file2.txt');

// // console.log("deletefile" , deletefile)


// https://github.com/SIDDHNATH99


function fetchUser() {
    return new Promise(resolve => setTimeout(() => resolve("User Data"), 2000));
}

function fetchPosts() {
    return new Promise(resolve => setTimeout(() => resolve("Posts Data"), 1000));
}

function fetchComments() {
    return new Promise(resolve => setTimeout(() => resolve("Comments Data"), 1500));
}



Promise.race([fetchUser(), fetchComments(), fetchPosts()])
    .then((response) => {
        console.log("user", response);
        // console.log("comments", comments);
        // console.log("posts", posts);
    }).catch((err) => {
        console.log(err);
    })