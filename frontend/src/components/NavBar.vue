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
import { isLoggedIn, logout, isAdmin } from '../components/auth.js'; 

const router = useRouter();

const handleAuthAction = () => {
  if (isLoggedIn.value) {
    logout(); 
    router.push('/login');
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>
header {
  background-color: #c1bdbc; /* Helliger machen für einen freundlicheren Look */
  padding: 20px 40px; /* Etwas mehr Abstand */
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
  align-items: center; /* Zentrierung der Listenelemente */
}

nav ul li {
  margin-right: 20px; /* Erhöht den Abstand zwischen den Links für bessere Lesbarkeit */
}

nav ul li:last-child {
  margin-right: 0; /* Entfernt den Abstand am rechten Rand des letzten Listenelements */
}

nav ul li a {
  text-decoration: none;
  color: #555; /* Dunkelgrau für bessere Lesbarkeit */
  font-weight: 500; /* Weniger bold für eine sauberere Erscheinung */
  font-size: 18px; /* Kleinere Schrift für mehr Übersichtlichkeit */
  transition: color 0.3s ease; /* Weicher Übergang für Hover-Effekt */
}

nav ul li a:hover, .login-btn:hover {
  color: #ffffff; /* Hinzufügen einer kräftigeren Farbe für Hover-Effekt */
}

.login-btn {
  background-color: #5c5d5e; /* Kontrastreiche Farbe für den Button */
  color: white; /* Weiße Schrift für Lesbarkeit */
  padding: 8px 15px; /* Padding hinzufügen für besseren Klickbereich */
  border-radius: 5px; /* Abgerundete Ecken für modernes Aussehen */
  border: 2px solid #5c5d5e; /* Rand im selben Farbton */
  font-size: 18px; /* Anpassung an Link-Schriftgröße */
  font-weight: 500; /* Konsistente Schriftstärke */
  transition: background-color 0.3s ease, color 0.3s ease; /* Weicher Übergang für Hover-Effekt */
}

.login-btn:hover {
  background-color: #515152; /* Umkehrung der Farben für den Hover-Effekt */
 
}
</style>

