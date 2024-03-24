<template>
  <div class="registration-container">
    <h1>Registriere einen neuen Benutzer</h1>
    <form @submit.prevent="submitUser" class="registration-form">
      <div class="form-field">
        <label for="username">Benutzername:</label>
        <input id="username" v-model="user.username" type="text" required>
      </div>
      <div class="form-field">
        <label for="email">E-Mail:</label>
        <input id="email" v-model="user.email" type="email" required>
      </div>
      <div class="form-field">
        <label for="password">Passwort:</label>
        <input id="password" v-model="user.password" type="password" required>
      </div>
      <div class="form-field">
        <label for="name">Name:</label>
        <input id="name" v-model="user.name" type="text" required>
      </div>
      <div class="form-field">
        <label for="address">Adresse:</label>
        <input id="address" v-model="user.address" type="text" required>
      </div>
      <button type="submit" class="submit-btn">Benutzer anlegen</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        name: '',
        address: ''
      }
    }
  },
  methods: {
    async submitUser() {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        await response.json();
        alert('Der Benutzer wurde erfolgreich angelegt!');
        this.resetForm();
      } catch (error) {
        console.error('Es gab einen Fehler beim Anlegen des Benutzers:', error);
        alert('Fehler beim Anlegen des Benutzers.');
      }
    },
    resetForm() {
      this.user = {
        username: '',
        email: '',
        password: '',
        name: '',
        address: ''
      };
    }
  }
}
</script>

<style scoped>
.registration-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #515152;
  text-align: center;
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #515152;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #515152;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #515152;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #393939;
}
</style>
