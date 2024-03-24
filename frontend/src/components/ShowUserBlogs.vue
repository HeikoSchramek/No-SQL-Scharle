<template>
    <div class="user-blogposts">
      <div v-for="post in blogPosts" :key="post._id" class="blog-post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <!-- Button zum Bearbeiten -->
        <router-link :to="{ path: `/editBlog/${post._id}` }">Bearbeiten</router-link>
        <!-- Button zum Löschen -->
        <button @click="deletePost(post._id)">Löschen</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        blogPosts: [],
      };
    },
    async created() {
      await this.fetchUserBlogPosts();
    },
    methods: {
      async fetchUserBlogPosts() {
        try {
          const userId = sessionStorage.getItem('userId'); // Holen Sie die Benutzer-ID des angemeldeten Benutzers
          const response = await fetch(`http://localhost:3000/blogposts/user/${userId}`);
          if (!response.ok) throw new Error('Fehler beim Abrufen der Blogbeiträge');
          this.blogPosts = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async deletePost(postId) {
        if (!confirm('Sind Sie sicher, dass Sie diesen Beitrag löschen möchten?')) return;
        try {
          await fetch(`http://localhost:3000/blogposts/${postId}`, { method: 'DELETE' });
          this.fetchUserBlogPosts(); // Aktualisieren Sie die Liste der Blogbeiträge
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  </script>
  
  <style>
  .user-blogposts {
    max-width: 800px;
    margin: auto;
  }
  
  .blog-post {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  
  .blog-post h3 {
    color: #333;
  }
  
  .blog-post p {
    color: #666;
  }
  
  button {
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  .router-link {
    text-decoration: none;
    color: #2196F3;
  }
  
  .router-link:hover {
    text-decoration: underline;
  }
  </style>
  