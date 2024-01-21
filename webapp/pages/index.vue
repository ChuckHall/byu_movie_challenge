<template>
  <div>
    <div class="search-bar">
      <input v-model="searchTerm" type="text" placeholder="Search" />
      <button @click="search">Submit</button>
    </div>

    <div class="image-container">
      <h3>Search Results</h3>
      <div v-for="movie in movies" :key="movie.movie_id" class="movie-item">
        <img :src="movie.poster_img_url" alt="Movie Poster" />
        <p>{{ movie.title }}</p>
        <p>{{ movie.popularity_summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchTerm = ref("");
const movies = ref([]);

async function search() {
  try {
    // const url = `http://localhost:4000/movies?search=${searchTerm}`;
    const url = `http://localhost:4000/movies?search=boats`;
    const response = await $fetch(url);

    if (response.ok) {
      movies.value = response.data;
      const fs = require("fs");
      fs.writeFileSync("output.txt", response.data, "utf-8");
    } else {
      console.error("Error fetching data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  margin: 10px;
  text-align: center;
}

.movie-item img {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 8px;
}

.movie-item p {
  margin-top: 5px;
}
</style>
