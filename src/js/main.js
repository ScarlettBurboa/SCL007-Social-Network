import {checkAuthState, registerUser, gmailLogIn, signOut, loginUserWithEmail, facebookLogIn} from '../js/auth.js';
import { savePost, readPost } from '../js/data.js';
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
const savePostIntoDatabase = () => {
    const userName = firebase.auth().currentUser.displayName;
    const post = document.getElementById('postContent').value;
    const photo = firebase.auth().currentUser.photoURL;
    savePost(userName, post, photo);
}
 const savePostFromDatabase = () => {
     readPost((post)=>{
   const userName = firebase.auth().currentUser.displayName;
   const photo = firebase.auth().currentUser.photoURL;
     document.getElementById('postPublished').innerHTML = 
    `<div class="row">
    <div class="col-12 space">
       <div class="col-2 box-img">
         <div id="nameAnonimo" class="hide"><p>Anónimo</p></div>
          <div id="namePerfil" class="hide"><p>${post.val().user}</p></div>
           <div id="imagenPerfil" class="hide"><img class="img-profile" src="${post.val().userphoto}" alt="imagen usuario"></div>
          <div id="imagenAnonimo" class="hide"><img class="img-profile" src="./assets/user1.png" alt="imagen usuario"></div>
       </div>
       <div class="col-9 question-published clearfix">
          <div class="row">
             <div class="col-12">
                <p class="caja-texto">${post.val().pospublic}
                </p>
             </div>
          </div>

          <div class="row icon-group">            
                <div class="col-3"><i class="far fa-heart"></i> Me gusta</div>
                <div class="col-3"><i class="far fa-bookmark"></i> Guardar</div>
                <div class="col-5"><i class="far fa-comment-dots"></i> Comentarios</div>
                <div class="col-1"><i class="fas fa-exclamation"></i></div>            
          </div>
          
       </div>
       <div class="col-9 float-right">
             <button id="actionAnswer" class="col-12 btnAnswer">Ver respuesta</button>
             <div class="hide section-Answer" id ="especialistAnswer">
             <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
             <p class="answer-especialist" id="answerEspecialist">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eligendi, 
             sint ex quas et accusamus amet, praesentium similique perspiciatis nemo esse voluptatum minus placeat 
             exercitationem consectetur? Ad culpa veniam explicabo.<p>
             </div>
       </div>
    </div>
 </div>` + document.getElementById('postPublished').innerHTML;
       if(userName === null){
                console.log('No Tiene nombre de usuario se ingresará una por defecto');
                document.getElementById('nameAnonimo').classList.add('show'); 
            }else{ 
                console.log('Tiene nombre de usuario'); 
                document.getElementById('namePerfil').classList.add('show');
            }; 
            if(photo === null){
                console.log('No Tiene imagen de usuario se ingresará una por defecto');
                document.getElementById('imagenAnonimo').classList.add('show');
            }else{
                console.log('Tiene imagen de usuario'); 
                document.getElementById('imagenPerfil').classList.add('show'); 
            };   
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

