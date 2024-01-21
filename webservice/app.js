const express = require("express");
const app = express();
const port = 3000;

app.get("/movies", (req, res) => {
  const { search } = req.query;
  res.send(`Search: ${search}`);
});

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
