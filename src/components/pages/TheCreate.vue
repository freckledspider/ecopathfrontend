<template>
    <div>
      <h1>Create New Item</h1>
      <form @submit.prevent="createItem">
          <label for="date">Date:</label>
          <input type="text" name="date" v-model="itemDate"><br/>
          <label for="time">Time:</label>
          <input type="text" name="time" v-model="itemTime"><br/>
          <label for="location">Location:</label>
          <input type="text" name="location" v-model="itemLocation"><br/>
          <label for="length">Length:</label>
          <input type="text" name="length" v-model="itemLength"><br/>
          <label for="image">Image URL:</label>
          <input type="text" name="image" v-model="itemImage"><br/>
          <label for="observations">Observations:</label>
          <input type="text" name="observations" v-model="itemObservations"><br/>
        <button type="submit">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        itemDate: '',
        itemTime: '',
        itemLocation: '',
        itemLength: '',
        itemImage: '',
        itemObservations: ''
      }
    },
    methods: {
        createItem() {
  fetch('https://ecopathbackend.onrender.com/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: this.itemDate,
      time: this.itemTime,
      location: this.itemLocation,
      length: this.itemLength,
      image: this.itemImage,
      observations: this.itemObservations,
    })
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);

    // Clear the form fields
    this.itemDate = '';
    this.itemTime = '';
    this.itemLocation = '';
    this.itemLength = '';
    this.itemImage = '';
    this.itemObservations = '';

    // Update the items list with the new item
    this.items.push(data);
  })
  .catch(error => {
    console.error('Error creating new item:', error);
  });
}
    }
  }
  </script>