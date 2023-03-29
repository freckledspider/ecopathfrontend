<template>
<div class="main">
  <div v-if="log">
    <h1>{{ log.date }}</h1>
    <table>
      <tr>
        <td>
    <h2>{{ log.location }}</h2>
    <h3>{{ log.time }}</h3>
    <h3>{{ log.length }} Miles</h3>
    <hr/><br/>
    <h3>Notes/Observations:</h3><br/>
      {{ log.observations }}
        </td>
        <td>
    <img :src="log.image" width="400" />
        </td>
      </tr>
    </table>
    <center>
    <router-link :to="`/edit/${log._id}`"><button>Edit Log</button></router-link>
    <button @click="deleteLog">Delete</button>
    </center>
  </div>
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