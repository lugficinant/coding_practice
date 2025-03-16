import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "lupo";
const yourPassword = "hehe";
const yourAPIKey = "e5137a95-c177-41f2-a6cb-5a669308cac6";
const yourBearerToken = "7693789f-00a6-4d27-a683-5010ad7a5382";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=1", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    console.log("basic auth");
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
    // try {
    //   const response = await axios.get(API_URL + "/all?page=1", {
    //     auth: {
    //       username: yourUsername,
    //       password: yourPassword,
    //     },
    //   });
    //   const result = response.data;
    //   console.log("basic auth");
    //   console.log(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
