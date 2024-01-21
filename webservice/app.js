const express = require("express");
const fs = require("fs");

const app = express();
const port = 4000;
const MOVIE_LIMIT = 10;

// Extract the TMDB key from properties.txt
const filePath = "../properties.txt";
const fileContent = fs.readFileSync(filePath, "utf8");
const KEY = fileContent.split("=")[1].trim();

app.get("/movies", (req, res) => {
  console.log(req.url);

  const { search } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${KEY}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then(function (json) {
      const output = [];
      for (let i = 0; i < MOVIE_LIMIT; i++) {
        let movie = {};
        movie.movie_id = json["results"][i].id;
        movie.title = json["results"][i].original_title;
        movie.poster_image_url = `https://image.tmdb.org/t/p/w500${json["results"][i].poster_path}`;
        movie.popularity_summary = `${json["results"][i].vote_average} average for ${json["results"][i].vote_count} votes`;
        output.push(movie);
      }
      res.send(output);
    })
    .catch((err) => console.error("error:" + err));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
