<template>
  <div class="container">
    <h1>Blogbeitrag bearbeiten</h1>
    <div class="content-container">
      <form @submit.prevent="submitUpdate" class="blog-form">
        <div>
          <label for="title">Titel:</label>
          <input id="title" v-model="post.title" type="text" required>
        </div>
        <div v-for="(section, index) in post.sections" :key="index" class="section">
          <div v-if="section.type === 'subheading'">
            <label>Unterüberschrift:</label>
            <input v-model="section.text" type="text" required>
          </div>
          <div v-if="section.type === 'text'">
            <label>Text:</label>
            <textarea v-model="section.text" required></textarea>
          </div>
          <button type="button" @click="removeSection(index)">Abschnitt entfernen</button>
        </div>
        <div class="buttons">
          <button type="button" @click="addSubheading">Unterüberschrift hinzufügen</button>
          <button type="button" @click="addTextField">Textfeld hinzufügen</button>
          <button type="submit">Änderungen speichern</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        sections: []
      }
    };
  },
  async created() {
    await this.loadPost();
  },
  methods: {
    addSubheading() {
      this.post.sections.push({ type: 'subheading', text: '' });
    },
    addTextField() {
      this.post.sections.push({ type: 'text', text: '' });
    },
    removeSection(index) {
      this.post.sections.splice(index, 1);
    },
    async loadPost() {
      try {
        const response = await fetch(`http://localhost:3000/blogposts/${this.$route.params.id}`);
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        this.post = await response.json();
      } catch (error) {
        console.error('Es gab einen Fehler beim Laden des Blogbeitrags:', error);
      }
    },
    async submitUpdate() {
      try {
        const response = await fetch(`http://localhost:3000/blogposts/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.post)
        });

        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        await response.json();
        alert('Der Blogbeitrag wurde erfolgreich aktualisiert!');
        this.$router.push('/');
      } catch (error) {
        console.error('Es gab einen Fehler beim Aktualisieren des Blogbeitrags:', error);
        alert('Fehler beim Aktualisieren des Blogbeitrags.');
      }
    }
  }
};
</script>

<style>

</style>