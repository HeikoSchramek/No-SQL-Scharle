<template>
  <div class="container">
    <h1 class="title">Blogbeitrag bearbeiten</h1>
    <div class="content-container">
      <form @submit.prevent="submitUpdate" class="blog-form">
        <div class="input-group">
          <label for="title" class="form-label">Titel:</label>
          <input id="title" v-model="post.title" type="text" class="form-input" required>
        </div>
        <div v-for="(section, index) in post.sections" :key="index" class="section card">
          <div v-if="section.type === 'subheading'" class="input-group">
            <label class="form-label">Unterüberschrift:</label>
            <input v-model="section.text" type="text" class="form-input" required>
          </div>
          <div v-if="section.type === 'text'" class="input-group">
            <label class="form-label">Text:</label>
            <textarea v-model="section.text" class="form-textarea" required></textarea>
          </div>
          <button type="button" @click="removeSection(index)" class="btn-remove">Abschnitt entfernen</button>
        </div>
        <div class="buttons">
          <button type="button" @click="addSubheading" class="btn">Unterüberschrift hinzufügen</button>
          <button type="button" @click="addTextField" class="btn">Textfeld hinzufügen</button>
          <button type="submit" @click="submitPost" class="btn btn-submit">Anlegen</button>
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
    // Den Namen und die ID des Autors aus dem sessionStorage holen
    const authorName = sessionStorage.getItem('name');
    const authorId = sessionStorage.getItem('userId'); // Korrekt abrufen der Benutzer-ID
    const requestBody = { ...this.post, author: authorName, authorId: authorId }; // Benutzer-ID zum Anfragekörper hinzufügen


    const response = await fetch('http://localhost:3000/blogposts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
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
}

,
    resetForm() {
      this.post.title = '';
      this.post.sections = [];
    }
  }
}
</script>

<style scoped>.container {
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

.content-container, .blog-form, .input-group {
  display: flex;
  flex-direction: column;
}

.input-group:not(:last-child) {
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input, .form-textarea {
  padding: 8px;
  border: 2px solid #515152;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;
}

.form-input:focus, .form-textarea:focus {
  border-color: #515152;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  cursor: pointer;
  padding: 8px 15px;
  font-size: 14px;
  color: white;
  background-color: #5c5d5e;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #515152;
}

.btn-remove {
  padding: 5px 10px;
  font-size: 12px;
  margin-top: 10px;
  align-self: flex-end;
  background-color: #da6873;
  border-radius: 4px;
}

.card {
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section:not(:last-child) {
  margin-bottom: 20px;
}

</style>
