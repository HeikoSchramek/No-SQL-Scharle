<template>
  <div class="container">
    <h1 class="title">Benutzerliste</h1>
    <div class="content-container">
      <div class="user-grid">
        <div class="user-card" v-for="user in users" :key="user._id">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Adresse:</strong> {{ user.address }}</p>
          <div class="button-group">
            <button @click="deleteUser(user._id)">Löschen</button>
            <button @click="editUser(user._id)">Bearbeiten</button>
          </div>
        </div>
      </div>
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
        this.fetchUsers(); 
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
.container {
max-width: 800px;
margin: auto;
padding: 20px;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.title {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.content-container {
  margin-top: 20px;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.button-group button {
  padding: 8px 15px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #5c5d5e;
}

.button-group button:hover {
  opacity: 0.9;
}
</style>

