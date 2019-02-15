import {checkAuthState, registerUser, gmailLogIn, signOut, loginUserWithEmail, facebookLogIn, twitterLogIn} from '../js/auth.js';
import {savePost, readPost, readPostUser, object, objectComplete, findObjectByKey, saveEditPost} from '../js/data.js';
window.onload = () =>{     
     checkAuthState((user) => {
        if(user){
            document.getElementById('loginRegister').style.display ="none";
            document.getElementById('app').style.display = "block";
            document.getElementById('principalImage').innerHTML = `<img class="img-profile" src=${firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./assets/user11.png"} alt="Imagen perfil usuario Logueado">`;
            document.getElementById('btnLogout').style.display = "block"; 
            savePostFromDatabase();
            document.getElementById('showPerfilTotal').style.display = "none";
            document.getElementById('search').style.display ="none";
         }else{
            document.getElementById('loginRegister').style.display ="block";
            document.getElementById('app').style.display = "none";
            document.getElementById('btnLogout').style.display = "none";
            document.getElementById('showPerfilTotal').style.display = "none";
            document.getElementById('search').style.display ="none";
        }   
    });
}
//Registrar usuario (email y contraseña)
const registerWithEmailAndPassword = () => {
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
   //console.log("Ud cerr  o sesión")
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
//Recuperacion de contraseña
document.getElementById("resetPassword").addEventListener("click", () => {
   let emailUser = document.getElementById("textEmail").value;
   firebase.auth().sendPasswordResetEmail(emailUser)
      .then(function () {
         document.getElementById('warning').innerHTML = "Revisa tu email para cambiar tu contraseña"
      }).catch(error => {
         document.getElementById('warning').innerHTML = "Ingrese su email"
      });
});

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
    post.length == 0 ? false(alert('Debes ingresar Texto :) para enviar un mensaje')) : true;
    const photo = firebase.auth().currentUser.photoURL;
    savePost(userName, post, photo, datePost);
  //  savePostUser(userName, post, photo, datePost);
};
document.getElementById('public').addEventListener('click', ()=>{
    savePostIntoDatabase();
   
});
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
})();
const savePostFromDatabase = () => {
   document.getElementById('postPublished').innerHTML = " ";
     readPost((post)=>{
    document.getElementById('postPublished').innerHTML = 
    `<div class="row space">
   <div class="col-12">
      <div class="col-2 box-img">
         <div id="${createId('nameUser')}"><p>${post.val().user ? post.val().user : "Anonimo"}</p><p>${post.val().createdDate}</p></div>
         <div id="${createId('imageUser')}"><img class="img-profile" src=${post.val().userphoto ? post.val().userphoto : "./assets/user11.png"} alt="imagen usuario"></div>
       </div>
      <div class="col-9 question-published clearfix">
         <div class="row">
            <div class="col-12 post">
               <p id="nuevotexto" class="text-post">${post.val().pospublic}
               </p>
            </div>
         </div>
         <div class="row icon-group">            
               <div class="col-2"><button id="${createId('likePost')}" class="post-icon hide"><div id="${createId('like')}" class="like"></div></button></div>
               <div class="col-2"><button id="${createId('savePost')}" class="post-icon hide"><i class="far fa-bookmark"></button></i></div>
               <div class="col-2"><button id="${createId('commentPost')}" class="post-icon hide"><i class="far fa-comment-dots"></i></button></div>
               <div class="col-6"><button id="mostrar" class="postReport post-icon float-right"><i class="fas fa-exclamation"></i></button></div>
               <span class="hidden"id="${createId('key')}">${post.val().key}</span>  
               <dialog id="dialogo"><h5>¿Esta publicación es inapropiada y quieres denunciarla?</h5>
               <p>Envíanos un correo copiando el numero de publicación <b>${post.val().key}</b> y lo revisaremos</p><button id="closeDialog">Cancelar</button>
               <button id="closeDialog"><a href="mailto:scarlettBurboa@gmail.com?Subject=Denunciar%20publicación%20n°%20">Enviar Correo</a></button></dialog>
         </div>          
      </div>
      <div class="col-9 float-right" style="display:none;">
            <button id="${createId('ReportPost')}" class="col-12 btnAnswer">Ver respuesta</button>
            <div class="hide section-Answer" id ="especialistAnswer">
            <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
            <p class="answer-especialist" id="answerEspecialist">LGBT es una sigla para abreviar algunas categorías de la Diversidad Sexual por las diferentes orientaciones sexuales e identidades de género: L de Lesbiana, G de Gay, B de Bisexual y T de Trans.<p>
            </div>
      </div>
   </div>
</div>` + document.getElementById('postPublished').innerHTML;

let postReport = document.getElementsByClassName('postReport');
//reportar comentario
for (let i=0; i < postReport.length; i++){ 
   postReport[i].addEventListener('click', reportPostFuncion)
}
document.getElementById('publishedPerfil').innerHTML = " ";
   });
};
//Función reportar
const reportPostFuncion = () =>{
    let dialogo = document.getElementById('dialogo');
   dialogo.showModal();
   savePostFromDatabaseUser(); 
   document.getElementById('closeDialog').addEventListener('click', function(){
   dialogo.close();
   savePostFromDatabaseUser(); 
      })
};

 /**PERFIL ACTION*/
 document.getElementById('perfilUserButton').addEventListener('click', ()=>{
     document.getElementById('showPerfilTotal').style.display = "block";
     perfilNameShow();
     savePostFromDatabaseUser();     
     document.getElementById('app').style.display = "none";
     document.getElementById('btnLogout').style.display = "none";
 });
document.getElementById('backToApp').addEventListener('click', () =>{
   document.getElementById('showPerfilTotal').style.display = "none";
   document.getElementById('app').style.display = "block";
   document.getElementById('btnLogout').style.display = "block";
   document.getElementById('postPublished').innerHTML = "";
   savePostFromDatabase();
});
const perfilNameShow = () => {
   document.getElementById('perfilName').innerHTML = `<div class="col-7"><p class="perfil-name">${firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "Anonimo"}</p></div>
       <div class="col-5"><img class="perfil-image" src=${firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./assets/user11.png"} alt="imagen usuario"></div>`
};
document.getElementById('myPost').addEventListener('click', () => {
   document.getElementById('publishedPerfil').style.display = "block";
   savePostFromDatabaseUser();

});
const savePostFromDatabaseUser =() =>{
   document.getElementById('publishedPerfil').innerHTML = " "; //Limpiando la pagina para que no se repitan los post en perfil de usuario
   readPostUser((postUser) => {
      document.getElementById('publishedPerfil').innerHTML =
         `<div class="row">
        <div class="col-12 space">
           <div class="col-2 box-img">
              <div id=""><p>${postUser.val().user ? postUser.val().user : "Anonimo"}</p><p>${postUser.val().createdDate}</p></div>              
               <div id=""><img class="img-profile" src=${postUser.val().userphoto ? postUser.val().userphoto : "./assets/user11.png"} alt="imagen usuario"></div>
            </div>
            <div class="col-9 question-published clearfix">
              <div class="row">
              <div class="col-12 post" id="boxEdit${postUser.key}">
                    <p id="textoPost${postUser.key}" class="caja-texto text-post">${postUser.val().pospublic}</p>
                 </div>
              </div>
              <div class="row icon-group">            
                    <div class="col-6"><button class="edit-button editPost post-icon" id="editId${postUser.key}">EDITAR</button></div>
                    <div class="col-6"><button class="delete-button delete-post" id="postId${postUser.key}">BORRAR</button></div>
              </div>          
           </div>
           <div class="col-9 float-right" style="display:none;">
                 <button id="" class="col-12 btnAnswer">Ver respuesta</button>
                 <div class="hide section-Answer" id ="especialistAnswer">
                 <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
                 <p class="answer-especialist" id="answerEspecialist">LGBT es una sigla para abreviar algunas categorías de la Diversidad Sexual por las diferentes orientaciones sexuales e identidades de género: L de Lesbiana, G de Gay, B de Bisexual y T de Trans.<p>
                 </div>
           </div>
        </div>
     </div>` + document.getElementById('publishedPerfil').innerHTML;

      let deletePost = document.getElementsByClassName('delete-button');
      let editPost = document.getElementsByClassName('editPost');
       for (let i = 0; i < deletePost.length; i++) {
         deletePost[i].addEventListener('click', deleteComment);
         editPost[i].addEventListener('click', editPostFunction);
      }

   });   
};

//Funcion editar post
const editPostFunction = (post)=> { 
 const idPost = post.currentTarget.getAttribute('id').slice(6)  //Target identifica el objeto dsde donde se realizo el evento/ Se usa slice para extraer la posición del elemento que necesito (id) 
 let boxEdit = document.getElementById('boxEdit' + idPost);
 let textoPostId = document.getElementById('textoPost' + idPost)
 let textArea = document.createElement('textarea');
 let btnSave = document.createElement('input');
 btnSave.setAttribute("type", "button");
 btnSave.setAttribute("value", "Guardar")
 btnSave.setAttribute("class", "btnEdit1 btnEdit");
 let btnCancel = document.createElement('input');
 btnCancel.setAttribute("type", "button");
 btnCancel.setAttribute("value", "Cancelar");
 btnCancel.setAttribute("class", "btnEdit2 btnEdit float-right");
 textArea.setAttribute("class","text-area-edit");
 textArea.value = textoPostId.textContent;
 boxEdit.removeChild(textoPostId);
 boxEdit.appendChild(textArea);
 boxEdit.appendChild(btnSave);
 boxEdit.appendChild(btnCancel);
 document.querySelector('.icon-group').style.display = 'none';
 
 btnSave.addEventListener("click", () => {
   let newText = textArea.value; //nuevo texto corresponderá al texto editado en el textarea
   document.getElementById('nuevotexto').innerHTML = newText; // el nuevo texto lo imprimimos en la etiqueta <p>
   saveEditPost(idPost, newText);
   savePostFromDatabaseUser();
 });
  
 btnCancel.addEventListener("click", () =>{
   boxEdit.removeChild(textArea);
   boxEdit.removeChild(btnSave);
   boxEdit.removeChild(btnCancel);
   boxEdit.appendChild(textoPostId);
   document.querySelector('.icon-group').style.display = 'block';
 }); 
 savePostFromDatabase();
};
/*----------------------------------------------------------------------------------------------------------------------*/
const deleteComment = (post) => {
   //Variable para recuperar el id del post desde el boton
   const userId = firebase.auth().currentUser.uid;
   const idPost = post.currentTarget.getAttribute('id').slice(6)  //Target identifica el objeto dsde donde se realizo el evento/ Se usa slice para extraer la posición del elemento que necesito (id)
     firebase.database().ref('post/'+idPost).remove(); 
     firebase.database().ref('postUser/'+userId+'/'+idPost).remove(); 
     savePostFromDatabaseUser();   
 };
 //Función para que al hacer click en inicio realice Scroll Top
let offset = 0;
let call;
function scroll() {
    if ((offset - document.documentElement.scrollTop) > 0) {
        document.documentElement.scrollTop += 10
    }
    else if ((offset - document.documentElement.scrollTop) < 0) {
        document.documentElement.scrollTop -= 10
    }
    else {
        clearInterval(call)
    }
};
document.getElementById('buttonScrollTop').addEventListener('click', scroll_click);
//CallBack Función
function scroll_click(e) {
    e.preventDefault();
    call = setInterval(scroll, 10);
}
document.getElementById('buttonSearch').addEventListener('click', () =>{
     document.getElementById('search').style.display ="block";     
     document.getElementById('buttonSearchElement').addEventListener('click', () =>{
      document.getElementById('result-search').innerHTML = "";
      object();
      const searchInput = document.getElementById('search-value').value;
      let objectResult = findObjectByKey(objectComplete, 'pospublic', `${searchInput}`);
      for(let i = 0; i < objectResult.length; i++){
            document.getElementById('result-search').innerHTML += 
            `<div class="row space">
            <div class="col-12">
               <div class="col-2 box-img">
                  <div id="${createId('nameUser')}"><p>${objectResult[i].user}</p><p>${objectResult[i].createdDate}</p></div>
                  <div id="${createId('imageUser')}"><img class="img-profile" src=${objectResult[i].userphoto} alt="imagen usuario"></div>
                </div>
               <div class="col-9 question-published clearfix">
                  <div class="row">
                  <div class="col-12 post">
                        <p class="text-post">${objectResult[i].pospublic}
                        </p>
                     </div>
                  </div>
                  <div class="row icon-group" style="display:none;">            
                        <div class="col-2"><button id="${createId('likePost')}" class="post-icon"><div id="${createId('like')}" class="like"></div></button></div>
                        <div class="col-2"><button id="${createId('savePost')}" class="post-icon"><i class="far fa-bookmark"></button></i></div>
                        <div class="col-2"><button id="${createId('commentPost')}" class="post-icon"><i class="far fa-comment-dots"></i></button></div>
                        <div class="col-6"><button id="${createId('ReportPost')}" class="post-icon float-right"><i class="fas fa-exclamation"></i></button></div>
                  </div>          
               </div>
               <div class="col-9 float-right" style="display:none;">
                     <button id="${createId('ReportPost')}" class="col-12 btnAnswer">Ver respuesta</button>
                     <div class="hide section-Answer" id ="especialistAnswer">
                     <p class="name-especialist" id="nameEspecialist">Doctora Javiera Carreño</p>
                     <p class="answer-especialist" id="answerEspecialist">LGBT es una sigla para abreviar algunas categorías de la Diversidad Sexual por las diferentes orientaciones sexuales e identidades de género: L de Lesbiana, G de Gay, B de Bisexual y T de Trans.<p>
                     </div>
               </div>
            </div>
         </div>`
      };
     });
     document.getElementById('app').style.display = "none";
     document.getElementById('btnLogout').style.display = "none";      
});
document.getElementById('backToAppTwo').addEventListener('click', () =>{
   document.getElementById('search').style.display ="none";
   document.getElementById('app').style.display = "block";
   document.getElementById('btnLogout').style.display = "block";

});

