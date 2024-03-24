<template>
  <div class="container">
    <h1 class="title">Meine Blogbeiträge</h1>
    <!-- Hinweis, falls keine Beiträge vorhanden sind -->
    <p v-if="blogPosts.length === 0" class="no-posts">Keine Blogbeiträge gefunden. Beginne damit, deinen ersten Beitrag zu erstellen.</p>
    <div v-for="post in blogPosts" :key="post._id" class="section card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <div class="button-group">
        <router-link :to="{ path: `/editBlog/${post._id}` }" class="btn">Bearbeiten</router-link>
        <button @click="deletePost(post._id)" class="btn-remove">Löschen</button>
      </div>
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

.no-posts {
  color: #666;
  text-align: center;
  margin-top: 20px;
}

/* Angepasster Stil für den Blog-Beitragscontainer */
.section.card {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

h3, p {
  margin: 10px 0; /* Gibt Abstand zwischen Elementen */
}

/* Stil für die Labels, ähnlich wie .profile-label im Benutzerprofil */
h3 {
  font-weight: bold;
  color: #333;
}

p {
  color: #666;
}

.button-group {
  display: flex;
  justify-content: flex-end; /* Buttons am rechten Rand ausrichten */
  margin-top: 10px;
}

.btn, .btn-remove {
  cursor: pointer;
  padding: 8px 15px;
  font-size: 14px;
  color: #f8f9fa;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  margin-left: 10px; /* Abstand zwischen den Buttons */
  text-decoration: none;
}

.btn {
  background-color: #5c5d5e;
}

.btn:hover {
  background-color: #515152;
}

.btn-remove {
  background-color: #5c5d5e;
}

.btn-remove:hover {
  background-color: #515152;
}

.router-link {
  display: inline-block;
  background-color: #5c5d5e;
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 4px;
  margin-top: 10px;
}

.router-link:hover {
  background-color: #515152;
}
</style>
