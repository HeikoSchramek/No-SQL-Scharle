<template>
    <div class="user-profile">
      <h2>Benutzerprofil</h2>
      <p>Email: {{ userProfile.email }}</p>
      <p>Name: {{ userProfile.name }}</p>
      <p>Adresse: {{ userProfile.address }}</p>
      <!-- Fügen Sie hier weitere Benutzerinformationen hinzu -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userProfile: {}
      };
    },
    async mounted() {
      const userId = sessionStorage.getItem('userId');
      if (userId) { // Stellen Sie sicher, dass eine userId vorhanden ist
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`);
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
          }
          const data = await response.json();
          this.userProfile = data;
        } catch (error) {
          console.error('Fehler beim Abrufen der Benutzerdaten:', error);
        }
      } else {
        console.error('Keine Benutzer-ID gefunden.');
      }
    }
  }
  </script>
  
  
  <style>
  /* Stilisierung nach Bedarf */
  .user-profile {
    margin: 20px;
  }
  </style>
  