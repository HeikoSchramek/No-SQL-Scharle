<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/create">Anlegen</router-link>
        </li>
        <li>
          <router-link to="/search">Suchen</router-link>
        </li>
        
      </ul>
      <!-- Login-Button auf der rechten Seite -->
      <button class="login-btn" @click="navigateToLogin">Login</button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Router-Instanz verwenden
const router = useRouter();

// Funktion, um zur Login-Seite zu navigieren
const navigateToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
header {
  background-color: #c1bdbc;
  padding: 10px 30px; /* Zusammengefasste padding-Anweisung */
}

nav {
  display: flex;
  justify-content: space-between; /* Zentriert die Elemente und gibt ihnen Raum dazwischen */
  align-items: center;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav ul li {
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 20px;
}

nav ul li a:hover, .login-btn:hover {
  color: #4e4e4e;
}

.login-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.login-btn:hover {
  color: #4e4e4e;
}
</style>
