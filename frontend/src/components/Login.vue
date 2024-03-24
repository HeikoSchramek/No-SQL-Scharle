<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">E-Mail:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">Passwort:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Einloggen</button>
    </form>
    <p class="register-link">
      Noch nicht registriert? <router-link to="/register">Registrieren</router-link>
    </p>
  </div>
</template>

<script>
import { setUser } from './auth.js'; // Stellen Sie sicher, dass der Pfad zu auth.js korrekt ist

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Login fehlgeschlagen');
        }

        const data = await response.json();

        // Setzt den Benutzerstatus mit den erhaltenen Daten
        setUser(data);

        // Dynamische Weiterleitung basierend auf der Nutzerrolle
        let redirectTo = '/'; // Standard-Redirect
        if (data.role === 'Admin') {
          redirectTo = '/allUser'; // oder eine spezifische Admin-Seite
        }
        // Keine spezielle Weiterleitung für Entwickler oder normale Benutzer in diesem Beispiel
        this.$router.push(redirectTo);
      } catch (error) {
        console.error(error);
        alert('Login fehlgeschlagen: Überprüfen Sie Ihre Anmeldeinformationen.');
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}

button {
  padding: 10px;
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.register-link {
  margin-top: 15px;
  text-align: center;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
