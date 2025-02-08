
// Función log in
const loginForm = document.getElementById('login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // contenido actual de usuarios para depuracion (proceso de practica)
    console.log('Usuarios registrados:', users);

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Correo electrónico o contraseña incorrectos.');
    } else {
        alert('Bienvenido, ' + email);
        window.location.href = 'userindex.html';
    }

    loginEmail.value = '';
    loginPassword.value = '';
});

