

<script setup>
import ShowBlogCard from './showBlogCard.vue';
</script>

<template>
  <section class="home-section">
    <h1 class="home-title">Willkommen auf unserem Blog!</h1>
    <p class="home-intro">Entdecke die neuesten Beiträge und Insights unserer Experten. Tauche ein und lass dich inspirieren.</p>
    <ShowBlogCard></ShowBlogCard>
  </section>
</template>

<style scoped>
.home-section {
  
max-width: 800px;
margin: auto;
padding: 20px;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

}

.home-title {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.home-intro {
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
}
</style>
