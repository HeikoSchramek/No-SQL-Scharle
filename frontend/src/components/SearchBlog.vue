<template>
  <div class="container">
    <h1 class="title">Blogposts durchsuchen</h1>
    <div class="content-container">
      <form @submit.prevent="fetchBlogposts" class="blog-form">
        <div class="input-group">
          <input type="text" v-model="searchTerm" placeholder="Suche nach Titel oder Autor..." class="form-input">
          <button type="submit" class="btn">Suchen</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="blogposts-container">
        <div v-for="post in blogposts" :key="post._id" class="section card" @click="redirectToPost(post._id)">
          <h3>{{ post.title }}</h3>
          <p>Verfasst von {{ post.author }} am {{ new Date(post.date).toLocaleDateString() }}</p>
        </div>
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
    };
  },
  methods: {
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
          if (response.status === 404) {
            this.blogposts = [];
            this.errorMessage = 'Keine Blogposts gefunden.';
            return;
          }
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
    redirectToPost(postId) {
      this.$router.push(`/blogposts/${postId}`);
    },
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
  margin-top: 20px;
}

.blog-form {
  margin-bottom: 20px;
}

.input-group {
  display: flex;
}

.form-input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.btn {
  padding: 8px 15px;
  font-size: 16px;
  background-color: #5c5d5e;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.btn:hover {
  background-color: #515152;
}

.error-message {
  color: #ff0000;
  margin-top: 10px;
}

.blogposts-container {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 20px;
}

.section {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.section:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.blogpost-description {
  font-style: italic;
}
</style>