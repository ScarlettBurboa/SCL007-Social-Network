import {checkAuthState, registerUser} from '../auth/auth.js';

window.onload = () => {
  checkAuthState((user)=>{
    if(user){
      loginOrRegister.style.display = "none";
      app.style.display = "block";
    }else{
      loginOrRegister.style.display = "block";
      app.style.display = "none";
    }
  });
};

const registerWithEmailAndPassword = () => {
  const emailFromUser = emailTextfield.value;
  const passwordFromUser = passwordTextfield.value;
  registerUser(emailFromUser, passwordFromUser);
};

registerButton.addEventListener('click', registerWithEmailAndPassword);
