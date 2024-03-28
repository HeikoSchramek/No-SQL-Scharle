<template>
  <div class="container">
    <h1 class="title">Benutzerprofil</h1>
    <div class="content-container">
      <div class="profile-section card">
        <p><span class="profile-label">E-Mail:</span> {{ userProfile.email }}</p>
        <p><span class="profile-label">Name:</span> {{ userProfile.name }}</p>
        <p><span class="profile-label">Username:</span> {{ userProfile.username }}</p>
        <p><span class="profile-label">Adresse:</span> {{ userProfile.address }}</p>
        
      </div>
    </div>
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
  if (userId) { 
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

<style scoped>
.container {
max-width: 800px;
margin: auto;
padding: 20px;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.title {
margin-bottom: 20px;
text-align: center;
color: #333;
}

.content-container {
display: flex;
flex-direction: column;
}

.profile-section {
background-color: #f8f9fa;
border: 1px solid #ddd;
border-radius: 4px;
padding: 15px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-label {
font-weight: bold;
}
</style>
