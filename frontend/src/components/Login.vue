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
      <!-- Noch nicht registriert Link -->
      <p class="register-link">
        Noch nicht registriert? <router-link to="/register">Registrieren</router-link>
      </p>
    </div>
  </template>
  
  <script>
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
    console.log(data.message); // "Erfolgreich eingeloggt"

    // Speichern des Authentifizierungsstatus und der Rolle im sessionStorage
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', data.role);

    this.processUserRole(data.role);
  } catch (error) {
    console.error(error);
  }
},

processUserRole(role) {
  switch (role) {
    case 'Admin':
      // Weiterleitung für Admin
      this.$router.push('/admin-dashboard');
      break;
    case 'User':
      // Weiterleitung für normale Nutzer
      this.$router.push('/user-dashboard');
      break;
    // Weitere Rollen hier verarbeiten
    default:
      // Standardaktion oder Fehlerbehandlung
      console.log('Unbekannte Rolle');
  }
}
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
  