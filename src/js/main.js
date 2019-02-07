import {checkAuthState, registerUser, gmailLogIn, signOut, loginUserWithEmail, facebookLogIn, twitterLogIn} from '../js/auth.js';
import {savePost, readPost} from '../js/data.js';
window.onload = () =>{     
     checkAuthState((user) => {
        if(user){
            document.getElementById('loginRegister').style.display ="none";
            document.getElementById('app').style.display = "block";
            document.getElementById('btnLogout').style.display = "block"; 
            savePostFromDatabase();
         }else{
            document.getElementById('loginRegister').style.display ="block";
            document.getElementById('app').style.display = "none";
            document.getElementById('btnLogout').style.display = "none";
        }
   
    });
}
//Registrar usuario (email y contraseña)
const registerWithEmailAndPassword =()=>{
    const emailUser = textEmail.value;
    const passwordUser = password.value;
    registerUser(emailUser, passwordUser); 
};
document.getElementById('btnSignUp').addEventListener('click', registerWithEmailAndPassword);

//Iniciar Sesión correo y contraseña
const signInWithEmailAndPassword = ()=>{
    const emailUser = textEmail.value;
    const passwordUser = password.value;
    loginUserWithEmail(emailUser, passwordUser);  
};
document.getElementById('btnLogin').addEventListener('click', signInWithEmailAndPassword);

//Iniciar sesión con Google
const logInGoogle =()=>{
  //alert("hola")
  gmailLogIn()
}
document.getElementById('btnGmail').addEventListener('click', logInGoogle);
//Cerrar sesión
const logOut =() =>{
 //console.log("Ud cerro sesión")
  signOut()
}
document.getElementById('btnLogout').addEventListener('click', logOut);

//Iniciar sesión con Facebook
const logInFacebook = () => {    
    facebookLogIn()
}
document.getElementById('btnFacebook').addEventListener('click', logInFacebook); 

//Iniciar sesión con Twitter
const logInTwitter = () => {
    twitterLogIn()
}
document.getElementById('btnTwitter').addEventListener('click', logInTwitter); 

 /*-------------------------------------------------------------*/
 const savePostIntoDatabase = () => {
    const userName = firebase.auth().currentUser.displayName;
    const post = document.getElementById('postContent').value;
    const photo = firebase.auth().currentUser.photoURL;
    savePost(userName, post, photo);
}
 const savePostFromDatabase = () => {
     readPost((post)=>{
     document.getElementById('postPublished').innerHTML = 
     `<div class="row">
    <div class="col-12 space">
       <div class="col-2 box-img">
          <div id="namePerfil"><p>${post.val().user ? post.val().user : "Anonimo"}</p></div>
           <div id="imagenPerfil"><img class="img-profile" src=${post.val().userphoto ? post.val().userphoto : "./assets/user11.png"} alt="imagen usuario"></div>
        </div>
       <div class="col-9 question-published clearfix">
          <div class="row">
             <div class="col-12">
                <p class="caja-texto">${post.val().pospublic}
                </p>
             </div>
          </div>
          <div class="row icon-group">            
                <div class="col-2"><button class="post-icon"><i class="far fa-heart"></i></button></div>
                <div class="col-2"><button class="post-icon"><i class="far fa-bookmark"></button></i></div>
                <div class="col-2"><button class="post-icon"><i class="far fa-comment-dots"></i></button></div>
                <div class="col-6"><button class="post-icon float-right"><i class="fas fa-exclamation"></i></button></div>
          </div>          
       </div>
       <div class="col-9 float-right">
             <button id="actionAnswer" class="col-12 btnAnswer">Ver respuesta</button>
             <div class="hide section-Answer" id ="especialistAnswer">
             <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
             <p class="answer-especialist" id="answerEspecialist">LGBT es una sigla para abreviar algunas categorías de la Diversidad Sexual por las diferentes orientaciones sexuales e identidades de género: L de Lesbiana, G de Gay, B de Bisexual y T de Trans.<p>
             </div>
       </div>
    </div>
 </div>` + document.getElementById('postPublished').innerHTML;

            document.getElementById('actionAnswer').addEventListener('click', ()  =>{
                document.getElementById('especialistAnswer').classList.toggle('show');
            });     
     });
     
 }
 document.getElementById('public').addEventListener('click', savePostIntoDatabase);
 

//Recuperacion de contraseña
document.getElementById("resetPassword").addEventListener("click",() => {
    let emailUser = document.getElementById("textEmail").value;
     firebase.auth().sendPasswordResetEmail(emailUser)
 .then(function() {
     document.getElementById('warning').innerHTML = "Revisa tu email para cambiar tu contraseña"
 }).catch(error => {
     document.getElementById('warning').innerHTML = "Ingrese su email"
 });
 })
