<template>
  <div class="container">
    <div class="content-container">
      <div class="blog-post" v-if="post">
        <h1 class="title">{{ post.title }}</h1>
        <p class="date-author">{{ formatDate(post.date) }}, von {{ post.author }}</p>
        <div v-for="(section, index) in post.sections" :key="index" class="section">
          <h3 v-if="section.type === 'subheading'">{{ section.text }}</h3>
          <p v-if="section.type === 'text'">{{ section.text }}</p>
        </div>
        <div class="likes-comments">
          <div class="likes-container">
            <span>Likes: {{ post.likes }}</span>
            <button @click="likePost" v-if="isLoggedIn && !hasLiked" class="btn">Like</button>
          </div>
          <div class="comments">
            <h3>Kommentare:</h3>
            <textarea v-model="newCommentText" placeholder="Schreibe einen Kommentar..." v-if="isLoggedIn" class="form-input"></textarea>
            <button @click="addComment" v-if="isLoggedIn" class="btn">Kommentieren</button>
            <div v-for="(comment, index) in post.comments" :key="index" class="comment">
              <p><strong>{{ comment.authorUsername }}:</strong> {{ comment.text }} ({{ formatDate(comment.date) }})</p>
            </div>
          </div>
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
    const authorUsername = ref(''); 

    
    async function fetchUserData(userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Benutzerdaten');
        }
        const userData = await response.json();
        authorUsername.value = userData.username; 
      } catch (error) {
        console.error('Fehler beim Laden der Benutzerdaten:', error);
      }
    }

    onMounted(async () => {
      const postId = route.params.id;
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        fetchUserData(userId); 
      }
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

    async function likePost() {
  if (!post.value._id) return;
  try {
    const response = await fetch(`http://localhost:3000/blogposts/${post.value._id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Fehler beim Liken des Blogposts');
    const updatedPost = await response.json();
    post.value.likes = updatedPost.likes; // Aktualisiere die Anzahl der Likes im Vue-Reactive-Post-Objekt
    hasLiked.value = true; // Setze hasLiked auf true, um zu signalisieren, dass der Benutzer diesen Post geliked hat
  } catch (error) {
    console.error('Fehler beim Liken des Blogposts:', error);
  }
}


    async function addComment() {
      if (!authorUsername.value) {
        alert('Sie müssen angemeldet sein, um Kommentare zu hinterlassen.');
        return;
      }
      const commentData = { text: newCommentText.value, authorUsername: authorUsername.value };

      try {
        const response = await fetch(`http://localhost:3000/blogposts/${post.value._id}/comment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentData),
        });

        if (!response.ok) throw new Error('Fehler beim Hinzufügen des Kommentars');
        const updatedPost = await response.json();
        post.value = updatedPost;
        newCommentText.value = ''; 
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Kommentars:', error);
      }
    }

    return { post, newCommentText, likePost, addComment, isLoggedIn, hasLiked, authorUsername };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('de-DE');
    },
  }
};


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

.date-author, .likes span, .comment p {
  color: #666;
  font-size: 14px;
}

.content-container {
  margin-top: 20px;
}

.section, .likes-comments {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.btn {
  padding: 8px 15px;
  font-size: 16px;
  background-color: #5c5d5e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #515152;
}

.form-input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comments {
  margin-top: 20px;
}

.comment {
  margin-top: 10px;
}

.likes-container {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
