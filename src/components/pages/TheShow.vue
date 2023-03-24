<template>
  <div v-if="log">
    <h1>{{ log.date }}</h1>
    <p>{{ log.time }}</p>
    <img :src="log.image" width="500" /><br />
    <router-link :to="`/edit/${log._id}`">Edit Log</router-link><br/>
    <button @click="deleteLog">Delete</button>
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
  },
  methods: {
  deleteLog() {
    const id = this.$route.params.id;
    if (confirm("Are you sure you want to delete this entry?")) {
      fetch(`https://ecopathbackend.onrender.com/log/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          this.$router.push('/log');
        } else {
          throw new Error('Error deleting log data.');
        }
      })
      .catch(error => {
        console.error('Error deleting log data:', error);
      });
    }
  }
}};
</script>