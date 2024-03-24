import { ref, computed } from 'vue';

// Initialisiert den Anmeldestatus und die Rolle des Benutzers basierend auf den Werten im sessionStorage
export const isLoggedIn = ref(sessionStorage.getItem('isLoggedIn') === 'true');
export const userRole = ref(sessionStorage.getItem('userRole') || '');

// Funktion zum Setzen des Benutzerstatus, einschließlich Anmeldestatus, Rolle, und weiteren Benutzerdaten im sessionStorage
export function setUser(data) {
  isLoggedIn.value = true;
  userRole.value = data.role;
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('userRole', data.role);
  sessionStorage.setItem('userId', data.userId);
  sessionStorage.setItem('name', data.name);
  sessionStorage.setItem('username', data.username); // Hier können Sie weitere Benutzerinformationen speichern, falls benötigt
}

// Funktion zum Löschen der Benutzerdaten aus dem sessionStorage, effektiv "ausloggen" des Benutzers
export function logout() {
  isLoggedIn.value = false;
  userRole.value = '';
  sessionStorage.clear(); // Entfernt alle gespeicherten Daten im sessionStorage
}

// Hilfsfunktionen/Computed Properties für die Benutzeroberfläche, um leicht den Anmelde- und Adminstatus abzufragen
export const isAdmin = computed(() => userRole.value === 'Admin');

// Diese Funktion kann verwendet werden, um den Login-Status programmatisch zu setzen (z.B. für Tests oder Initialisierung)
export function setLoginStatus(status) {
  isLoggedIn.value = status;
  sessionStorage.setItem('isLoggedIn', status.toString());
}
