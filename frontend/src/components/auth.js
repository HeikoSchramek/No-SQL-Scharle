import { ref, computed } from 'vue';


export const isLoggedIn = ref(sessionStorage.getItem('isLoggedIn') === 'true');
export const userRole = ref(sessionStorage.getItem('userRole') || '');


export function setUser(data) {
  isLoggedIn.value = true;
  userRole.value = data.role;
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('userRole', data.role);
  sessionStorage.setItem('userId', data.userId);
  sessionStorage.setItem('name', data.name);
  sessionStorage.setItem('username', data.username); 
}


export function logout() {
  isLoggedIn.value = false;
  userRole.value = '';
  sessionStorage.clear(); 
}


export const isAdmin = computed(() => userRole.value === 'Admin');


export function setLoginStatus(status) {
  isLoggedIn.value = status;
  sessionStorage.setItem('isLoggedIn', status.toString());
}
