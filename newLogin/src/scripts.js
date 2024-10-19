// scripts.js

function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    console.log('Password:', password);
    window.location.href = '../../index.html';

}

function handleForgotPassword(event) {

}
function signup(){
    window.location.href = 'register.html';

}
function handleSignUp(event) {
    
}

function handlePasswordRecovery(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    console.log('Correo para recuperación:', email);
    alert('Enlace de recuperación enviado a tu correo.');
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Registro:', { name, email, password });
    alert('Usuario registrado con éxito');
}
