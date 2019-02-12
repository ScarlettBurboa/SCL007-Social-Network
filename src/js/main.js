import {checkAuthState, registerUser, gmailLogIn, signOut, loginUserWithEmail, facebookLogIn, twitterLogIn} from '../js/auth.js';
import {savePost, readPost, savePostUser, readPostUser} from '../js/data.js';
window.onload = () =>{     
     checkAuthState((user) => {
        if(user){
            document.getElementById('loginRegister').style.display ="none";
            document.getElementById('app').style.display = "block";
            document.getElementById('principalImage').innerHTML = `<img class="img-profile" src=${firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./assets/user11.png"} alt="Imagen perfil usuario Logueado">`;
            document.getElementById('btnLogout').style.display = "block"; 
              savePostFromDatabase();
              document.getElementById('showPerfil').style.display = "none";
         }else{
            document.getElementById('loginRegister').style.display ="block";
            document.getElementById('app').style.display = "none";
            document.getElementById('btnLogout').style.display = "none";
            document.getElementById('showPerfil').style.display = "none";
        }   
    });
}
//Registrar usuario (email y contraseña)
const registerWithEmailAndPassword =()=>{
    const emailUser = document.getElementById('textEmail').value;
    const passwordUser = document.getElementById('password').value;
    registerUser(emailUser, passwordUser); 
};
document.getElementById('btnSignUp').addEventListener('click', registerWithEmailAndPassword);
//Iniciar Sesión correo y contraseña
const signInWithEmailAndPassword = () => {
	const emailUser = textEmail.value;
	const passwordUser = password.value;
	loginUserWithEmail(emailUser, passwordUser);
};
document.getElementById('btnLogin').addEventListener('click', signInWithEmailAndPassword);

//Iniciar sesión con Google
const logInGoogle = () => {
	//alert("hola")
	gmailLogIn()
}
document.getElementById('btnGmail').addEventListener('click', logInGoogle);
//Cerrar sesión
const logOut = () => {
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
const deleteComment = (post)=> {
    //Variable para recuperar el id del post desde el boton
     const idPost = post.currentTarget.getAttribute('id').slice(6)  //Target identifica el objeto dsde donde se realizo el evento/ Se usa slice para extraer la posición del elemento que necesito (id)
    //console.log(post.target)
     firebase.database().ref('post/'+idPost).remove(); 
     savePostFromDatabase();
 };
/*-------------------------------------------------------------*/
//Crear fecha actual
let miFechaActual = new Date();
   let year = miFechaActual.getFullYear();
   let month = parseInt(miFechaActual.getMonth()) + 1;
   let day = miFechaActual.getDate();
   let datePost = `${day}/${month}/${year}`;
const savePostIntoDatabase = () => {
    const userName = firebase.auth().currentUser.displayName;
    const post = document.getElementById('postContent').value;
    const photo = firebase.auth().currentUser.photoURL;
    savePost(userName, post, photo, datePost);
    savePostUser(userName, post, photo, datePost);
};
document.getElementById('public').addEventListener('click', savePostIntoDatabase);
// Crea una iD única
let createId = (function() {
    let map = {};
    return function(prefix) {
        prefix = prefix || 'autoSocial';
        map[prefix] = map[prefix] || 0;        
        let id = prefix + '-' + map[prefix]++; 
        // Valida :) que no exista un elemento con el mismo id :) 
        if(document.getElementById(id)) {
            return createId(prefix);
        }
        return id;
    }
})()
const savePostFromDatabase = () => {
    readPost((post)=>{
    document.getElementById('postPublished').innerHTML = 
    `<div class="row">
   <div class="col-12 space">
      <div class="col-2 box-img">
         <div id="${createId('nameUser')}"><p>${post.val().user ? post.val().user : "Anonimo"}</p><p>${post.val().createdDate}</p></div>
         <div id="${createId('imageUser')}"><img class="img-profile" src=${post.val().userphoto ? post.val().userphoto : "./assets/user11.png"} alt="imagen usuario"></div>
       </div>
      <div class="col-9 question-published clearfix">
         <div class="row">
            <div class="col-12">
               <p class="caja-texto">${post.val().pospublic}
               </p>
            </div>
         </div>
         <div class="row icon-group">            
               <div class="col-2"><button id="${createId('likePost')}" class="post-icon"><div id="${createId('like')}" class="like"></div></button></div>
               <div class="col-2"><button id="${createId('savePost')}" class="post-icon"><i class="far fa-bookmark"></button></i></div>
               <div class="col-2"><button id="${createId('commentPost')}" class="post-icon"><i class="far fa-comment-dots"></i></button></div>
               <div class="col-6"><button id="${createId('ReportPost')}" class="post-icon float-right"><i class="fas fa-exclamation"></i></button></div>
         </div>          
      </div>
      <div class="col-9 float-right">
            <button id="${createId('ReportPost')}" class="col-12 btnAnswer">Ver respuesta</button>
            <div class="hide section-Answer" id ="especialistAnswer">
            <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
            <p class="answer-especialist" id="answerEspecialist">LGBT es una sigla para abreviar algunas categorías de la Diversidad Sexual por las diferentes orientaciones sexuales e identidades de género: L de Lesbiana, G de Gay, B de Bisexual y T de Trans.<p>
            </div>
      </div>
   </div>
</div>` + document.getElementById('postPublished').innerHTML;        
    });
};
//Recuperacion de contraseña
document.getElementById("resetPassword").addEventListener("click", () => {
    let emailUser = document.getElementById("textEmail").value;
     firebase.auth().sendPasswordResetEmail(emailUser)
 .then(function() {
     document.getElementById('warning').innerHTML = "Revisa tu email para cambiar tu contraseña"
 }).catch(error => {
     document.getElementById('warning').innerHTML = "Ingrese su email"
 });
 });
 /**PERFIL ACTION*/
 document.getElementById('perfilUser').addEventListener('click', ()=>{
     document.getElementById('showPerfil').style.display = "block";
     perfilNameShow();
     document.getElementById('app').style.display = "none";
     document.getElementById('btnLogout').style.display = "none";
     document.getElementById('savedPerfil').style.display ="none";
 });

 document.getElementById('backToApp').addEventListener('click', () =>{
    document.getElementById('showPerfil').style.display = "none";
    document.getElementById('app').style.display = "block";
    document.getElementById('btnLogout').style.display = "block";
 });
 const perfilNameShow = () => {
        document.getElementById('perfilName').innerHTML = `<div class="col-7"><p class="perfil-name">${firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "Anonimo"}</p></div>
        <div class="col-5"><img class="perfil-image" src=${firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./assets/user11.png"} alt="imagen usuario"></div>`
};
document.getElementById('myPost').addEventListener('click', () =>{
    document.getElementById('publishedPerfil').style.display ="block";
    savePostFromDatabaseUser();
    document.getElementById('savedPerfil').style.display ="none";
 });
 document.getElementById('mySaved').addEventListener('click', () =>{
    document.getElementById('publishedPerfil').style.display ="none";
    document.getElementById('savedPerfil').style.display ="block";
}); 
/* const savePostFromDatabaseUser =() =>{
    readPostUser((postUser)=>{ 
        document.getElementById('publishedPerfil').innerHTML = 
        `<div class="row">
        <div class="col-12 space">
           <div class="col-2 box-img">
              <div id=""><p>${postUser.val().user ? postUser.val().user : "Anonimo"}</p><p>${post.val().createdDate}</p></div>              
               <div id=""><img class="img-profile" src=${postUser.val().userphoto ? postUser.val().userphoto : "./assets/user11.png"} alt="imagen usuario"></div>
            </div>
           <div class="col-9 question-published clearfix">
              <div class="row">
                 <div class="col-12">
                    <p class="caja-texto">${postUser.val().pospublic}</p>
                 </div>
              </div>
              <div class="row icon-group">            
                    <div class="col-6"><button id="" class="post-icon">EDITAR</button></div>
                    <div class="col-6"><button id="" class="post-icon">BORRAR</button></div>
              </div>          
           </div>
           <div class="col-9 float-right">
                 <button id="" class="col-12 btnAnswer">Ver respuesta</button>
                 <div class="hide section-Answer" id ="especialistAnswer">
                 <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
                 <p class="answer-especialist" id="answerEspecialist">LGBT es una sigla para abreviar algunas categorías de la Diversidad Sexual por las diferentes orientaciones sexuales e identidades de género: L de Lesbiana, G de Gay, B de Bisexual y T de Trans.<p>
                 </div>
           </div>
        </div>
     </div>` + document.getElementById('publishedPerfil').innerHTML;        
        });
}; */

