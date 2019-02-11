/* función para guardar datos (post) en la base de datos Firebase */
import{savePostFromDatabase} from '../js/main.js'

export const savePost = (userName, post, photo) => {
    /* const userID = firebase.auth().currentUser.uid; */
    const keyPost = firebase.database().ref('post/').child('post').push().key;
    firebase.database().ref(`post/${keyPost}/`).set({
        user: userName,
        pospublic: post,
        userphoto: photo
    });
};
export const readPost = (postChange) => {
    /* const userID = firebase.auth().currentUser.uid; */
    const postReference = firebase.database().ref('post/');
    postReference.on('child_added', (post) => {
        postChange(post);
    });
   
};
export const deleteComment = (post)=> {
   //Variable para recuperar el id del post desde el boton
    const idPost = post.currentTarget.getAttribute('id').slice(6)  //Target identifica el objeto dsde donde se realizo el evento/ Se usa slice para extraer la posición del elemento que necesito (id)
   //console.log(post.target)
    firebase.database().ref('post/'+idPost).remove(); 
    savePostFromDatabase();
};


