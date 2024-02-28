<template>
    <div>
      <h1>Registriere einen neuen Benutzer</h1>
      <form @submit.prevent="submitUser">
        <div>
          <label for="username">Benutzername:</label>
          <input id="username" v-model="user.username" type="text" required>
        </div>
        <div>
          <label for="email">E-Mail:</label>
          <input id="email" v-model="user.email" type="email" required>
        </div>
        <div>
          <label for="password">Passwort:</label>
          <input id="password" v-model="user.password" type="password" required>
        </div>
        <div>
          <label for="name">Name:</label>
          <input id="name" v-model="user.name" type="text" required>
        </div>
        <div>
          <label for="address">Adresse:</label>
          <input id="address" v-model="user.address" type="text" required>
        </div>
        <button type="submit">Benutzer anlegen</button>
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
          name: '', // Hinzugefügtes Feld
          address: '' // Hinzugefügtes Feld
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
          await response.json(); // Wenn das Backend eine Antwort sendet
          alert('Der Benutzer wurde erfolgreich angelegt!');
          this.resetForm();
        } catch (error) {
          console.error('Es gab einen Fehler beim Anlegen des Benutzers:', error);
          alert('Fehler beim Anlegen des Benutzers.');
        }
      },
      resetForm() {
        this.user.username = '';
        this.user.email = '';
        this.user.password = '';
        this.user.name = ''; // Zurücksetzen des hinzugefügten Feldes
        this.user.address = ''; // Zurücksetzen des hinzugefügten Feldes
      }
    }
  }
  </script>
  
  <style scoped>
div {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
}

h1 {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  font-size: 14px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,.25);
}

button {
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
}
</style>

  