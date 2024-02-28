<template>
    <div>
      <h1>Erstelle einen Blogbeitrag</h1>
      <form @submit.prevent="submitPost">
        <div>
          <label for="title">Titel:</label>
          <input id="title" v-model="post.title" type="text" required>
        </div>
        <div>
          <label for="content">Inhalt:</label>
          <textarea id="content" v-model="post.content" required></textarea>
        </div>
        <div>
          <label for="author">Autor:</label>
          <input id="author" v-model="post.author" type="text" required>
        </div>
        <button type="submit">Beitrag erstellen</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        post: {
          title: '',
          content: '',
          author: ''
        }
      }
    },
    methods: {
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
        this.post.content = '';
        this.post.author = '';
      }
    }
  }
  </script>
  <style scoped>
  div {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  textarea {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="text"] {
    height: 40px;
  }
  
  textarea {
    resize: vertical;
    min-height: 150px;
  }
  
  button {
    cursor: pointer;
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  </style>
  