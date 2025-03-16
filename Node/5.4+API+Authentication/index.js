import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "lupo";
const yourPassword = "hehe";
const yourAPIKey = "e5137a95-c177-41f2-a6cb-5a669308cac6";
const yourBearerToken = "7693789f-00a6-4d27-a683-5010ad7a5382";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    const result = response.data;
    console.log("home page");
    console.log(result);
    // res.render("index.ejs", { content: result });
    //we need to change js object to json....
    //     Primitive Types (string, number, etc.): Render directly without issues.
    // Objects and Arrays: Access specific properties or serialize them to avoid [object Object].
    // Embedding in Scripts: Use JSON.stringify with <%- %> to correctly embed JavaScript objects.
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/all?page=1", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    console.log("basic auth");
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send(error.message);
    // console.error("Failed to make request:", error.message);
    // res.render("index.ejs", {
    //   error: error.message,
    // });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      API_URL + "/filter?score=5" + "&apiKey=" + yourAPIKey
    );
    const result = response.data;
    console.log("API KEY");
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send(error.message);
  }

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});
//😘😘😘😘😘😘😘😘😘😘here last one!!
const config = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`,
  },
};
app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/secrets/42", config);
    const result = response.data;
    console.log("token one");
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.log(error);
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
