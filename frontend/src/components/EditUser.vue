<template>
  <div class="container">
    <h2 class="title">Benutzer bearbeiten</h2>
    <form @submit.prevent="submitEdit" class="edit-user-form">
      <div class="profile-section card">
        <div class="form-group">
          <label for="name" class="profile-label">Name:</label>
          <input id="name" v-model="user.name" type="text" class="form-input" placeholder="Name eingeben">
        </div>
        <div class="form-group">
          <label for="email" class="profile-label">E-Mail:</label>
          <input id="email" v-model="user.email" type="email" class="form-input" placeholder="E-Mail eingeben">
        </div>
        <div class="form-group">
          <label for="usermail" class="profile-label">Username:</label>
          <input id="usermail" v-model="user.username" type="text" class="form-input" placeholder="Username angeben">
        </div>
        <div class="form-group">
          <label for="adress" class="profile-label">Straße:</label>
          <input id="adress" v-model="user.address" type="text" class="form-input" placeholder="Adresse eingeben">
        </div>
        <div class="form-group">
          <label for="role" class="profile-label">Rolle:</label>
          <select id="role" v-model="user.role" class="form-input">
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <button type="submit" class="btn-save">Speichern</button>
      </div>
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
        username: '',
        address: '',
        role: ''
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

.profile-section {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #515152;
}

.btn-save {
  background-color: #515152;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #5c5d5e;
}
</style>
