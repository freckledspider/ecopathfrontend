<template>
    <div class="main">
      <h1>Create New Hiking Entry</h1>
      <form @submit.prevent="createLog">
          <label for="date">Date:</label>
          <input type="date" name="date" v-model="logDate"><br/>
          <label for="time">Time:</label>
          <input type="time" name="time" v-model="logTime"><br/>
          <label for="location">Location:</label>
          <input type="text" name="location" v-model="logLocation"><br/>
          <label for="length">Length (Miles):</label>
          <input id="length-input" type="number" step="0.01" name="length" v-model="logLength"><br/>
          <label for="image">Image URL:</label>
          <input type="text" name="image" v-model="logImage"><br/>
          <label for="observations">Observations:</label>
          <textarea type="text" name="observations" v-model="logObservations"></textarea><br/>
        <button type="submit">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      logDate: '',
      logTime: '',
      logLocation: '',
      logLength: '',
      logImage: '',
      logObservations: '',
      lengthInput: null,
      logs: []
    }
  },
  methods: {
    createLog() {
      fetch('https://ecopathbackend.onrender.com/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: this.logDate,
          time: this.logTime,
          location: this.logLocation,
          length: this.logLength,
          image: this.logImage,
          observations: this.logObservations,
        })
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);

        // Clear the form fields
        this.logDate = '';
        this.logTime = '';
        this.logLocation = '';
        this.logLength = '';
        this.logImage = '';
        this.logObservations = '';
        
        this.logs.push(data);

        // redirect to log
        this.$router.push('/log');
      })
      .then((response) => {
          if (response.ok) {
            // Redirect to the log show page if the update is successful
            this.$router.push(`/log/`);
          } else {
            throw new Error("Error creating log.");
          }
        })
      .catch(error => {
        console.error('Error creating new entry:', error);
      });
    }
  }
}
  </script>