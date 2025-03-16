import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
app.use(bodyParser.urlencoded({ extended: true }));

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "7693789f-00a6-4d27-a683-5010ad7a5382";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};
let currId = undefined;

//dont know how to do, may be later on.
// function displayById(curResult){
//   const curId = curResult.data.id;

//   const resultId = await axios.get(API_URL + "/secrets/" + currId, config);
//   res.render("index.ejs", { content: JSON.stringify(resultId.data) });

// }

//home page
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

//id
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//secret
// TODO 2: Use axios to POST the data from req.body to the secrets api servers.
app.post("/post-secret", async (req, res) => {
  console.log(req.body);
  const postInfo = {
    secret: req.body.secret,
    score: req.body.score,
  };

  try {
    //the result is a js object
    const result = await axios.post(API_URL + "/secrets", postInfo, config);
    //this result contains a ton of info to tell you, how the post goes.
    console.log(result); //cant convert it to json🤣🤣🤣
    // console.log(JSON.stringify(result));
    res.render("index.ejs", { content: JSON.stringify(result.data) });

    // //we need to display this post by searching ID 🤣🤣
    // currId = result.data.id;
    // const resultId = await axios.get(API_URL + "/secrets/" + currId, config);
    // res.render("index.ejs", { content: JSON.stringify(resultId.data) });
    // //
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//                       PUT
//
// TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
app.post("/put-secret", async (req, res) => {
  console.log("put infor~~~~~~~~~~~\n");
  const searchId = req.body.id;
  // const newInfo = { secret: req.body.secret, score: req.body.score };
  const newInfo = req.body;
  try {
    //the result is a js object
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      newInfo,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//                         PATCH
//
//TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  console.log("PATCH infor~~~~~~~~~~~\n");
  const newInfo = req.body;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      newInfo,
      config
    );
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//                   DELETE
//TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  console.log("DELETE infor~~~~~~~~~~~\n");
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
