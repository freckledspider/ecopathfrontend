<template>
  <div class="main">
    <h1>Edit Log Entry for {{ log.date }} at {{ log.time }}</h1>
    <form @submit.prevent="submitForm">
      <label for="date">Date:</label><br/>
      <input type="date" id="date" v-model="log.date" /><br/><br/>
      <label for="time">Time:</label><br/>
      <input type="time" id="time" v-model="log.time"/><br/><br/>
      <label for="location">Location:</label><br/>
      <input type="text" id="location" v-model="log.location" /><br/><br/>
      <label for="length">Length (Miles):</label><br/>
      <input id="length-input" type="number" step="0.01" name="length" v-model="log.length" /><br/><br/>
      <label for="image">Image URL:</label><br/>
      <input type="text" id="image" v-model="log.image" /><br/><br/>
      <label for="observations">Notes/Observations:</label><br/>
      <textarea type="text" id="observations" v-model="log.observations" /><br/><br/>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LogEdit",
  data() {
    return {
      log: null,
      lengthInput: null
    };
  },
  created() {
    const id = this.$route.params.id;
    fetch(`https://ecopathbackend.onrender.com/log/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.log = data;
      })
      .catch((error) => {
        console.error("Error fetching log data:", error);
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to the log show page if the update is successful
            this.$router.push(`/log/${id}`);
          } else {
            throw new Error("Error updating log data.");
          }
        })
        .catch((error) => {
          console.error("Error updating log data:", error);
        });
    },
  },
};
</script>
