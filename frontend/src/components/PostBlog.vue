<template>
  <div class="container">
    <h1>Erstelle einen Blogbeitrag</h1>
    <div class="content-container">
      <form @submit.prevent="submitPost" class="blog-form">
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
      </form>
      <div class="buttons">
        <button type="button" @click="addSubheading">Unterüberschrift hinzufügen</button>
        <button type="button" @click="addTextField">Textfeld hinzufügen</button>
        <button type="submit" @click="submitPost">Beitrag erstellen</button>
      </div>
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
    }
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
    async submitPost() {
      try {
        const response = await fetch('http://localhost:3000/blogposts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.post)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        await response.json(); // Wenn das Backend eine Antwort sendet
        alert('Der Blogbeitrag wurde erfolgreich erstellt!');
        this.resetForm();
      } catch (error) {
        console.error('Es gab einen Fehler beim Erstellen des Blogbeitrags:', error);
        alert('Fehler beim Erstellen des Blogbeitrags.');
      }
    },
    resetForm() {
      this.post.title = '';
      this.post.sections = [];
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.content-container {
  display: flex;
  justify-content: space-between;
}

.blog-form {
  flex-grow: 1;
  margin-right: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

button {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.section {
  margin-bottom: 20px;
}
</style>
