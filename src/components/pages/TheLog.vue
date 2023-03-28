<template>
<div class="main">
  <h1>Path Log</h1>
  <router-link to="/new">New Entry</router-link>

  <div class="loading" v-if="isLoading">
    Loading log entries...
  </div>

  <div class="logCard" v-else-if="logs.length">
    <ul>
      <li v-for="log in logs" :key="log.id">
        <router-link :to="`/log/${log.id}`">{{ log.date }}</router-link>
        <p>{{ log.time }}</p>
        <p>{{ log.location }}</p>
        <p>{{ log.length }} Miles</p>
        <p><img :src="log.image" width="300"/></p>
        <p>{{ log.observations }}</p>
      </li>
    </ul>
  </div>

  <div class="loading" v-else>
    No data available.
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
      isLoading: false
    }
  },
  mounted() {
    this.isLoading = true;
    fetch('https://ecopathbackend.onrender.com/log')
      .then(response => response.json())
      .then(data => {
        this.logs = data.map(log => ({
          id: log._id,
          date: log.date,
          time: log.time,
          location: log.location,
          length: log.length,
          image: log.image,
          observations: log.observations
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>