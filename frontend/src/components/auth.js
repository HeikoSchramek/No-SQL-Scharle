import { ref } from 'vue';

export const isLoggedIn = ref(sessionStorage.getItem('isLoggedIn') === 'true');

export function setLoginStatus(status) {
  isLoggedIn.value = status;
  sessionStorage.setItem('isLoggedIn', status.toString());
}
