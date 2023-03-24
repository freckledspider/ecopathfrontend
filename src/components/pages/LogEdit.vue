<template>
    <div>
      <h1>Edit Log Entry</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="log.date">
        </div>
        <div>
          <label for="time">Time:</label>
          <input type="time" id="time" v-model="log.time">
        </div>
        <div>
            <label for="location">Location:</label>
            <input type="text" id="location" v-model="log.location">
          </div>
          <div>
            <label for="length">Length:</label>
            <input type="text" id="length" v-model="log.length">
          </div>
        <div>
          <label for="image">Image URL:</label>
          <input type="text" id="image" v-model="log.image">
        </div>
        <div>
            <label for="observations">Observations:</label>
            <input type="text" id="observations" v-model="log.observations">
          </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LogEdit',
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
        submitForm() {
  const id = this.$route.params.id;
  const formData = {
    date: this.log.date,
    time: this.log.time,
    location: this.log.location,
    length: this.log.length,
    image: this.log.image,
    observations: this.log.observations,
  };
  fetch(`https://ecopathbackend.onrender.com/log/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
      if (response.ok) {
        // Redirect to the log show page if the update is successful
        this.$router.push(`/log/${id}`);
      } else {
        throw new Error('Error updating log data.');
      }
    })
    .catch(error => {
      console.error('Error updating log data:', error);
    });
}
    }
  };
  </script>