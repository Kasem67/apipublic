import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/";
const yourAPIKey= "e2f89889993c49b35935fa909c43c5b9";
app.use(express.static("public"));
const lat = 33.8959203;
const lon = 35.47843;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
  try {
    const result = await axios.get(API_URL + "/data/2.5/weather?", {
      params: {
        lat : lat,
        lon : lon ,
        appid: yourAPIKey
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
  });
app.get("/loc", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/geo/1.0/direct?", {
      params: {
        q :  "Beirut",
        limit : 5 ,
        appid: yourAPIKey
      },
    });
    res.render("loc.ejs", { details: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/get", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/data/2.5/weather?", req.body);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });