<template>
    <footer class="site-footer">
      <div class="footer-content">
        <router-link to="/" class="footer-link">Home</router-link>
        <router-link to="/search" class="footer-link">Suchen</router-link>
        <router-link to="" class="footer-link">Datenschutz</router-link>
        <router-link to="" class="footer-link">Nutzungsbedingungen</router-link>
      </div>
      <p class="footer-text">© 2024 DeinWebseiteName. Alle Rechte vorbehalten.</p>
    </footer>
  </template>

<script>
</script>

<style scoped>
.site-footer {
  background-color: #c1bdbc; /* Dunkelgrau für eine elegante Erscheinung */
  color: #555;
  text-align: center;
  padding: 20px 0;
}

.footer-content {
  margin-bottom: 20px;
}

.footer-link {
  margin: 0 10px;
  color: #555;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #a8a8a8; /* Helles Grau für Hover-Effekt */
}

.footer-text {
  font-size: 14px;
  margin: 0;
}
</style>
