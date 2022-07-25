/* eslint-disable default-case */
import { logIn, observer } from '../firebase/auth.js';

const loginEmail = {
  template: () => {
    const loginEmail = ` 
    <section class="first-view email">
    <div class="container-index">
      <img src="./img/cubiertos.png" alt="Cubiertos">
      <h1> HELP TASTER </h1>
      <h2> Inicia sesión en tú cuenta </h2>
      <span>Disfruta de la mejor comida creada para las personas amantes de codígo!</span>
      <form class="form-email">
        <input name="email" type="email" class="input-register" placeholder="E-mail">
        <p class= "condicion loginError" id="error-usuario"></p>
        <input name="password" type="password" class ="input-register" placeholder="Contraseña">
        <p class= "condicion loginError" id="error-contraseña"></p>
        <button type="submit" class="btn-log-email"> Iniciar sesión </button>
      </form>
      <a href="#newPassword"> Recupera tu contraseña </a>
      <div class="newRegister"> 
        <span>¿No tienes una cuenta ?</span>
        <a href="#/register">Registrate aqui</a>
      </div>
    </div>
    <div class="modal-container">
    <div class="modal no-verified-email">
      <img src="./img/verificacion.webp"></img> 
      <span> No se verifico, revisa su correo</span>
      <button class="btn-modal"> Aceptar </button>
    </div>
  </div>
    </section>`;

    const divLoginEmail = document.createElement('div');
    divLoginEmail.classList.add('loginEmail');
    divLoginEmail.innerHTML = loginEmail;
    return divLoginEmail;
  },
  init: () => {
    const buttonLogIn = document.querySelector('.form-email');
    const modal = document.querySelector('.modal-container');
    const errorUser = document.querySelector('#error-usuario');
    const errorPassword = document.querySelector('#error-contraseña');

    buttonLogIn.addEventListener('submit', (event) => {
      event.preventDefault();
      errorUser.innerHTML = '';
      errorPassword.innerHTML = '';
      // eslint-disable-next-line max-len
      const formEmail = new FormData(event.target); /* el event.target se refiere elemento clickado  */
      logIn(formEmail.get('email'), formEmail.get('password'))
      /*  Get - devuelve el primer valor asociado con una clave dada en un objeto  */
        .then((user) => {
          if (!user.emailVerified) {
            modal.classList.add('show-modal'); // ¿?
          }
        })
        .catch(({ code }) => {
          // eslint-disable-next-line default-case
          switch (code) {
            case 'auth/user-not-found':
              errorUser.innerHTML = 'El correo electronico que ingresaste no esta conectado a una cuenta';
              break;
            case 'auth/wrong-password':
              errorPassword.innerHTML = 'Contraseña incorrecta';
              break;
          }
          console.log(message);
        });
    });
    const closeModal = document.querySelector('.btn-modal');
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show-modal');
    });
  },
};

export default loginEmail;
