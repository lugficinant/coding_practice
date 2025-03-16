// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.
app.use(express.static("public"));
// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(result);
    const data = { secret: result.data.secret, user: result.data.username };
    res.render("index.ejs", data);
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});
//
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
