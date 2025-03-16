//import express
import express from "express";
//using express to create an app
const app = express();
const port = 2500;

//star a server
// 1st is port, where the location our server is going to listen
// 2nd is callback, will be triggered when our server is set up.
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
