/* función para guardar datos (post) en la base de datos Firebase */
export const savePost = (userName, post, photo, datePost) => {
    /* const userID = firebase.auth().currentUser.uid; */
    //Crear la referencia a la base de datos
    const keyPost = firebase.database().ref('post/').child('post').push().key;    
    firebase.database().ref(`post/${keyPost}/`).set({
        user : userName, 
        pospublic : post, 
        userphoto : photo,
        createdDate: datePost
    });
    };
export const readPost = (postChange) =>{
    /* const userID = firebase.auth().currentUser.uid; */
    const postReference = firebase.database().ref('post/');
    postReference.on('child_added', (post) =>{
        postChange(post);
    });
};
