const express = require("express");
const cors = require("cors");
const app = express();
const {
  getCompliment,
  getFortune,
  getGratitudes,
  postGratitudes,
  updateGratitude,
  deleteGratitude
} = require("./controller");

app.use(cors());
app.use(express.json());

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/gratitude", getGratitudes);
app.post("/api/gratitude", postGratitudes);
app.put("/api/gratitude", updateGratitude);
app.delete("/api/gratitude", deleteGratitude);

app.listen(4000, () => console.log("Server running on 4000"));
