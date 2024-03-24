<template>
  <div class="user-grid">
    <h1>Benutzerliste</h1>
    <div class="user-card" v-for="user in users" :key="user._id">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Adresse:</strong> {{ user.address }}</p>
      <button @click="deleteUser(user._id)">Löschen</button>
      <button @click="editUser(user._id)">Bearbeiten</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok.');
        }
        this.users = await response.json();
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
      }
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Fehler beim Löschen des Benutzers.');
        }
        this.fetchUsers(); // Aktualisiere die Benutzerliste nach dem Löschen
      } catch (error) {
        console.error('Fehler beim Löschen des Benutzers:', error);
      }
    },
    editUser(userId) {
  this.$router.push(`/edit-user/${userId}`);
},
  },
  async mounted() {
    if (sessionStorage.getItem('userRole') === 'Admin') {
      this.fetchUsers();
    } else {
      this.$router.push('/');
    }
  },
}
</script>

<style scoped>
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
