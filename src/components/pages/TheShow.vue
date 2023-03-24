<template>
  <div v-if="log">
    <h1>{{ log.date }}</h1>
    <p>{{ log.time }}</p>
    <img :src="log.image" width="500" /><br />
    <router-link :to="`/edit/${log._id}`">Edit Log</router-link>
  </div>
</template>

<script>
export default {
  name: 'logShow',
  data() {
    return {
      log: null
    };
  },
  created() {
    const id = this.$route.params.id;

    fetch(`https://ecopathbackend.onrender.com/log/${id}`)
      .then(response => response.json())
      .then(data => {
        this.log = data;
      })
      .catch(error => {
        console.error('Error fetching log data:', error);
      });
  }
};
</script>