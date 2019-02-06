/* función para guardar datos (post) en la base de datos Firebase */
export const savePost = (userName, post, photo) => {
    const userID = firebase.auth().currentUser.uid;
    const keyPost = firebase.database().ref('post/').child('post').push().key;    
    firebase.database().ref(`post/${userID}/${keyPost}`).set({
        user : userName, 
        pospublic : post, 
        userphoto : photo
    });
    };
export const readPost = (postChange) =>{
    const userID = firebase.auth().currentUser.uid;
    const postReference = firebase.database().ref(`post/${userID}`);
    postReference.on('child_added', (post) =>{
        postChange(post);
    });
};
