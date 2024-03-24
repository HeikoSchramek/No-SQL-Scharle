<template>
    <div class="blog-posts">
      <div v-for="post in posts" :key="post._id" class="post-card" @click="viewPost(post._id)">
        <h2>{{ post.title }}</h2>
        <p>{{ formatDate(post.date) }}</p>
      </div>
    </div>
</template>

  
  <script>
  
  export default {
    data() {
      return {
        posts: [],
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:3000/blogposts');
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Fehler beim Laden der Blogbeiträge:', error);
      }
    },
    methods: {
  viewPost(id) {
    this.$router.push(`/blogposts/${id}`);
  },
  formatDate(date) {
    return new Date(date).toLocaleDateString();
  },
}
  };
  </script>
  
  <style scoped>
.blog-posts {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.post-card {
  cursor: pointer;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.post-title, .post-date {
  color: #333;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.post-date {
  font-size: 0.9rem;
  color: #666;
}
</style>
