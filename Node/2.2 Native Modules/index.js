const fs = require("fs");

//https://www.geeksforgeeks.org/node-js-fs-writefile-method/
// 1 file  2 content into the file  3 callback when error
fs.writeFile("message.txt", "hello form node js", (err) => {
  if (err) console.log(err);
  console.log("the file has been saved");
});

//read
//https://www.geeksforgeeks.org/node-js-fs-readfile-method/
fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
