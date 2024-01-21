<template>
  <div>
    <h1>My Page</h1>
    <ul>
      <li v-for="item in apiResults" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async fetch() {
    // Make a REST API query using fetch (or Axios)
    const response = await fetch("http://localhost:4000/movies?search=boats");
    const data = await response.json();
    console.log(data);

    // Set the data to be used in the template
    this.apiResults = data;
  },
  data() {
    return {
      apiResults: [],
    };
  },
};
</script>
