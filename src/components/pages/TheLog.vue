<template>
    <h1>Path Log</h1>
    <router-link to="/new">New Entry</router-link>
    <div v-if="logs.length">
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
</template>

<script>
export default {
  data() {
    return {
      logs: []
    }
  },
  mounted() {
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
        })
        );
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
</script>