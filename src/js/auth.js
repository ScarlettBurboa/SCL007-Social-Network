export const checkAuthState = (callback) => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log("Ingreso un usuario >" + JSON.stringify(firebaseUser));
            callback(firebaseUser)
        } else {
            console.log('No está logueado')
            callback(null)
        }
    })
};
export const registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};
export const loginUserWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => document.getElementById('error-m').innerHTML = `${error.message}`)
};
export const signOut = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
};
//Ingresar con cuenta google (Documentación de Firebase)
export const gmailLogIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider(); //Se crea una instancia del objeto del proveedor de Google
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API. (acceso a google)
        let token = result.credential.accessToken;
        // The signed-in user info. (informacion del usuario que inicia sesión)
        let user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here. (manejar errores)
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used. (email de la cuenta de usuario utilizado)
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used. (tipo de identificador usado por firebase)
        let credential = error.credential;
        // ...
    });

};

    export const facebookLogIn = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API. (acceso a google)
        let token = result.credential.accessToken;
        // The signed-in user info. (informacion del usuario que inicia sesión)
        let user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here. (manejar errores)
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used. (email de la cuenta de usuario utilizado)
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used. (tipo de identificador usado por firebase)
        let credential = error.credential;
        // ...
    });
}; 

export function deletePost(){
 
    firebase.database().ref('posts/'+ this.id).set({
      null:null
    })
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid+ '/post/'+ this.id).set({
      null:null
    })
  
  };