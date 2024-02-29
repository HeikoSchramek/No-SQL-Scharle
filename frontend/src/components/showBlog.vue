<template>
    <div class="blog-post" v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ formatDate(post.date) }}, {{post.author}}</p>
      <div v-for="(section, index) in post.sections" :key="index">
        <h3 v-if="section.type === 'subheading'">{{ section.text }}</h3>
        <p v-if="section.type === 'text'">{{ section.text }}</p>
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const post = ref(null);
    const route = useRoute();

    onMounted(async () => {
      const postId = route.params.id;
      if (postId) {
        try {
          const response = await fetch(`http://localhost:3000/blogposts/${postId}`);
          if (!response.ok) throw new Error('Fehler beim Laden des Blogbeitrags');
          post.value = await response.json();
        } catch (error) {
          console.error('Fehler beim Laden des Blogbeitrags:', error);
        }
      }
    });

    return { post };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  }
};
</script>
  
  <style scoped>
  .blog-post {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h1, h3 {
    margin-bottom: 10px;
  }
  
  p {
    margin-bottom: 20px;
  }
  </style>
  