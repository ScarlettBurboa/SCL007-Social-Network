import {checkAuthState, registerUser,gmailLogIn, signOut} from '../js/auth.js';

window.onload = () =>{
//  btnLogout.style.display = "none";
     checkAuthState((user) => {
        if (user){
            loginRegister.style.display ="none";
            app.style.display = "block";
        }else{
           loginRegister.style.display ="block";
           app.style.display = "none";
        }
    });
}
//Registrar usuario (email y contraseña)
const registerWithEmailAndPassword =()=>{

    const emailUser = textEmail.value;
    const passwordUser = password.value;
    registerUser(emailUser, passwordUser); 
};
btnSignUp.addEventListener('click', registerWithEmailAndPassword);
//Iniciar sesión con Google
const logInGoogle =()=>{
  //alert("hola")
  gmailLogIn()
}
btnGmail.addEventListener('click', logInGoogle);
//Cerrar sesión
const logOut =() =>{
 //console.log("Ud cerro sesión")
  signOut()
}
btnLogout.addEventListener('click', logOut);
