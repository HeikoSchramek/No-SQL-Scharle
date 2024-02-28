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
  }
  
  .post-card {
    cursor: pointer;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
  }
  
  .post-card:hover {
    transform: translateY(-5px);
  }
  
  h2, p {
    margin: 0;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  </style>
  