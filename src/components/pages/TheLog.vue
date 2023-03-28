<template>
  <div class="main">
    <h1>Path Log</h1>
    <router-link to="/new"><button>New Entry</button></router-link>
    <div class="container">

      <div class="loading" v-if="isLoading">
        Loading log entries...
      </div>

      <div v-else-if="logs.length">
        <div v-for="log in logs" :key="log.id">
          <div class="logCard" :style="{ backgroundImage: `url(${log.image})` }">
            <div class="logText">
            <router-link class="logDate" :to="`/log/${log.id}`">{{ log.date }}</router-link><br/>
            {{ log.time }}<br/>
            {{ log.location }}<br/>
            {{ log.length }} Miles
            </div>
          </div>
        </div>
      </div>

      <div class="loading" v-else>
        No data available.
      </div>
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