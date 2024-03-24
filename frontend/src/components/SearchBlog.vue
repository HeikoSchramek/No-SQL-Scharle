<template>
  <div class="search-container">
    <div class="search-bar">
      <input type="text" v-model="searchTerm" @input="debounceSearch" placeholder="Suche nach Titel oder Autor..." class="search-input">
      <button @click="fetchBlogposts" class="search-button">Suchen</button>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <div class="blogposts-container">
      <div v-for="post in blogposts" :key="post._id" class="blogpost-card">
        <h3>{{ post.title }}</h3>
        <p>Verfasst von {{ post.author }} am {{ new Date(post.date).toLocaleDateString() }}</p>
        <!-- Weitere Details des Blogposts hier anzeigen -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      blogposts: [],
      errorMessage: '',
      debounceTimer: null,
    };
  },
  methods: {
    debounceSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fetchBlogposts();
      }, 500); // Verzögert die Suchanfrage um 500 ms
    },
    async fetchBlogposts() {
      console.log(`Suche nach: ${this.searchTerm}`);
      if (this.searchTerm.trim() === '') {
        this.blogposts = [];
        this.errorMessage = '';
        return;
      }
      const url = `http://localhost:3000/blogposts/search?term=${encodeURIComponent(this.searchTerm)}`;
      console.log(`Anforderung an: ${url}`);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Fehler beim Abrufen der Blogposts: ${response.statusText}`);
        }
        const data = await response.json();
        this.blogposts = data;
        this.errorMessage = '';
      } catch (error) {
        console.error('Fehler beim Abrufen der Blogposts:', error);
        this.errorMessage = 'Fehler beim Abrufen der Blogposts. Bitte versuche es später erneut.';
      }
    },
  }
}
</script>


  
  <style>
  .search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px; /* Anpassen nach Bedarf */
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s, transform 0.2s;
}

.search-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.search-button:focus {
  outline: none;
}

  </style>
  