<template>
  <div class="blog-post" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ formatDate(post.date) }}, von {{ post.author }}</p>
    <div v-for="(section, index) in post.sections" :key="index">
      <h3 v-if="section.type === 'subheading'">{{ section.text }}</h3>
      <p v-if="section.type === 'text'">{{ section.text }}</p>
    </div>
    <div class="likes-comments">
      <div class="likes">
        <span>Likes: {{ post.likes }}</span>
        <button @click="likePost" v-if="isLoggedIn && !hasLiked">Like</button>
      </div>
      <div class="comments">
        <h3>Kommentare:</h3>
        <textarea v-model="newCommentText" placeholder="Schreibe einen Kommentar..." v-if="isLoggedIn"></textarea>
        <button @click="addComment" v-if="isLoggedIn">Kommentieren</button>
        <div v-for="(comment, index) in post.comments" :key="index" class="comment">
  <p><strong>{{ comment.authorUsername }}:</strong> {{ comment.text }} ({{ formatDate(comment.date) }})</p>
</div>

      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


export default {
  setup() {
    const post = ref(null);
    const newCommentText = ref('');
    const route = useRoute();
    const isLoggedIn = ref(sessionStorage.getItem('userId') !== null);
    const hasLiked = ref(false);

    onMounted(async () => {
      const postId = route.params.id;
      if (postId) {
        try {
          const response = await fetch(`http://localhost:3000/blogposts/${postId}`);
          if (!response.ok) throw new Error('Fehler beim Laden des Blogbeitrags');
          post.value = await response.json();
          // Überprüfen, ob der Benutzer diesen Beitrag bereits geliked hat
          // Diese Logik muss entsprechend Ihrer Backend-Implementierung angepasst werden,
          // z.B. durch Prüfen, ob die Benutzer-ID in einer Liste von Likes des Beitrags enthalten ist.
        } catch (error) {
          console.error('Fehler beim Laden des Blogbeitrags:', error);
        }
      }
    });

    async function likePost() {
      if (hasLiked.value) {
        alert('Sie haben diesen Beitrag bereits geliked.');
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/blogposts/${post.value._id}/like`, { method: 'POST' });
        if (!response.ok) throw new Error('Fehler beim Liken des Blogbeitrags');
        post.value.likes += 1; // Optimistisch die Anzahl der Likes erhöhen
        hasLiked.value = true; // Verhindern, dass der Benutzer mehrmals liked
      } catch (error) {
        console.error('Fehler beim Liken des Blogbeitrags:', error);
      }
    }

    async function addComment() {
      const authorUsername = sessionStorage.getItem('username');
      if (!authorUsername) {
        alert('Sie müssen angemeldet sein, um Kommentare zu hinterlassen.');
        return;
      }
      const commentData = { text: newCommentText.value, authorUsername };

      try {
        const response = await fetch(`http://localhost:3000/blogposts/${post.value._id}/comment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentData),
        });

        if (!response.ok) throw new Error('Fehler beim Hinzufügen des Kommentars');
        const updatedPost = await response.json();
        post.value = updatedPost;
        newCommentText.value = ''; // Textfeld leeren
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Kommentars:', error);
      }
    }

    return { post, newCommentText, likePost, addComment, isLoggedIn, hasLiked };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('de-DE');
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

.likes-comments {
  margin-top: 20px;
}

.comments {
  margin-top: 20px;
}

.comment {
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
