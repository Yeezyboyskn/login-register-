document.addEventListener('DOMContentLoaded', () => {
    // Validación dinámica del formulario de registro
    const registerForm = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
  
        if (password !== confirmPassword) {
          alert('Las contraseñas no coinciden.');
          return;
        }
  
        // Simulación de envío y respuesta
        try {
          const response = await fetch(registerForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
          });
  
          if (response.ok) {
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            registerForm.reset();
          } else {
            throw new Error();
          }
        } catch {
          successMessage.classList.add('hidden');
          errorMessage.classList.remove('hidden');
        }
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const confirmPassword = document.getElementById('confirmPassword');
  
    registerForm.addEventListener('submit', (event) => {
      const password = document.getElementById('password').value;
  
      if (password !== confirmPassword.value) {
        alert('Las contraseñas no coinciden.');
        event.preventDefault();
      }
    });
  });
  