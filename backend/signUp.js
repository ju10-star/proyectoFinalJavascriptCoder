// Función registrar usuario (sign up)
const signupForm = document.getElementById('signup');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = signupEmail.value;
    const password = signupPassword.value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
        alert('El correo electrónico ya está registrado.');
    } else {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    }

    signupEmail.value = '';
    signupPassword.value = '';
});
