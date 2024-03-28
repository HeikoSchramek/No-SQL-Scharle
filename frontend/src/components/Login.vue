<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">E-Mail:</label>
        <input type="email" id="email" v-model="email" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Passwort:</label>
        <input type="password" id="password" v-model="password" class="form-control">
      </div>
      <button type="submit" class="btn-login">Einloggen</button>
    </form>
    <p class="register-link">
      Noch nicht registriert? <router-link to="/register" class="register-link-a">Registrieren</router-link>
    </p>
  </div>
</template>

<script>
import { setUser } from './auth.js'; 

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

       
        setUser(data);

        
        let redirectTo = '/'; 
        if (data.role === 'Admin') {
          redirectTo = '/allUser'; 
        }
       
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background: #fff;
}

.login-title {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin: 10px 0 20px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; 
}

.btn-login {
  padding: 10px;
  width: 100%;
  background-color: #515152;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-login:hover {
  background-color: #515152;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link-a {
  color: #515152;
  text-decoration: none;
}

.register-link-a:hover {
  text-decoration: underline;
}
</style>
