/* función para guardar datos (post) en la base de datos Firebase */
export const savePost = (userName, post, photo) => {
    const keyPost = firebase.database().ref('post/').child('post').push().key;
    firebase.database().ref(`post/${keyPost}`).set({
        user : userName, 
        pospublic : post, 
        userphoto : photo
    });
    };
export const readPost = (onPostChange) =>{
    const postReference = firebase.database().ref('post');
    postReference.on('child_added', (post) =>{
        onPostChange(post);
    });
};