document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:3000';

  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const profileDiv = document.getElementById('profile');
  const profileName = document.getElementById('profile-name');
  const logoutButton = document.getElementById('logout-button');

  // Login Form Submit
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = usernameInput.value;
      const password = passwordInput.value;

      const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Important for session handling
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          const data = await response.json();
          loginForm.classList.add('hidden');
          profileDiv.classList.remove('hidden');
          profileName.textContent = data.user;
      } else {
          alert('Invalid credentials');
      }
  });

  // Logout
  logoutButton.addEventListener('click', async () => {
      const response = await fetch(`${API_URL}/logout`, {
          method: 'POST',
          credentials: 'include'
      });

      if (response.ok) {
          profileDiv.classList.add('hidden');
          loginForm.classList.remove('hidden');
          usernameInput.value = '';
          passwordInput.value = '';
      }
  });

  // Check if user is already logged in
  const checkSession = async () => {
      const response = await fetch(`${API_URL}/profile`, {
          method: 'GET',
          credentials: 'include'
      });

      if (response.ok) {
          const data = await response.json();
          loginForm.classList.add('hidden');
          profileDiv.classList.remove('hidden');
          profileName.textContent = data.user.username;
      }
  };

  checkSession();
});
