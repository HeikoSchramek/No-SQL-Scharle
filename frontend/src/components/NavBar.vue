<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/create">Anlegen</router-link>
        </li>
        <li>
          <router-link to="/search">Suchen</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/user-profile">Mein Profil</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link to="/allUser">Alle User</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/myBlogs">Meine Beiträge</router-link>
        </li>
      </ul>
      
      <button class="login-btn" @click="handleAuthAction">
        {{ isLoggedIn ? 'Logout' : 'Login' }}
      </button>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn, logout, isAdmin } from '../components/auth.js'; // Pfad zu auth.js anpassen, wenn nötig

const router = useRouter();

const handleAuthAction = () => {
  if (isLoggedIn.value) {
    logout(); // Nutzt nun die logout Funktion aus auth.js
    router.push('/login');
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>
header {
  background-color: #c1bdbc;
  padding: 10px 30px;
}

nav {
  display: flex;
  justify-content: space-between;
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
