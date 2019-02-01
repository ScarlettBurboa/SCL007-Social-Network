const miFuncionTesteable = () => {
  console.log("Holo, soy una función");
  return true;
};

const miOtraFunctionTesteable = () => {
  return false;
};


// Importante agregar la función que se conectará con el dom desde javascript
// O no funcionará
if( document.getElementById('miBoton') ) {
  document.getElementById('miBoton').addEventListener('click', miFuncionTesteable);
}

export const miFuncionTesteableExp = miFuncionTesteable;
export const miOtraFunctionTesteableExp = miOtraFunctionTesteable;

/* Authenticación*/

export const checkAuthState = (callback) => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log("Hay un usuario > "+JSON.stringify(user));
      callback(user);
    }else{
      console.log("No está logueado");
      callback(null);
    }
  })
};

export const registerUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log("Usuario registrado > "+JSON.stringify(user));
    })
    .catch((error) => {
      console.error("Error > "+error.message);
    });
}