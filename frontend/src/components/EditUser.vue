<template>
    <div class="edit-user-container">
      <h2>Benutzer bearbeiten</h2>
      <form @submit.prevent="submitEdit">
        <div>
          <label for="name">Name:</label>
          <input id="name" v-model="user.name" type="text">
        </div>
        <div>
          <label for="email">E-Mail:</label>
          <input id="email" v-model="user.email" type="email">
        </div>
        <!-- Weitere Felder hier -->
        <button type="submit">Speichern</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          // Weitere Felder hier
        }
      };
    },
    async mounted() {
      const userId = this.$route.params.id;
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await response.json();
      this.user = userData;
    },
    methods: {
      async submitEdit() {
        const userId = this.$route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.user)
          });
  
          if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Benutzers');
          }
  
          alert('Benutzer erfolgreich aktualisiert');
          this.$router.push('/allUser');
        } catch (error) {
          console.error(error);
          alert('Fehler beim Aktualisieren des Benutzers');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  