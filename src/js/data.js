/* función para guardar datos (post) en la base de datos Firebase */
export const savePost = (userName, post, photo) => {
 const keyPost = firebase.database().ref('post/').child('post').push().key;    
    firebase.database().ref(`post/${keyPost}/`).set({
        user: userName,
        pospublic: post,
        userphoto: photo
    });
    };
export const readPost = (postChange) =>{
    const postReference = firebase.database().ref('post/');
    postReference.on('child_added', (post) => {
        postChange(post);
    });   
};
export const savePostUser = (userName, post, photo) => {
    const userId = firebase.auth().currentUser.uid;
    const keyPost = firebase.database().ref('postUser/').child('postUser').push().key;    
       firebase.database().ref(`postUser/${userId}/${keyPost}/`).set({
           user : userName, 
           pospublic : post, 
           userphoto : photo
       });
       };
export const readPostUser = (postChange) =>{
    const userId = firebase.auth().currentUser.uid;
    const postReferenceread = firebase.database().ref(`postUser/${userId}/`);
       postReferenceread.on('child_added', (postUser) =>{
           postChange(postUser);
       });
   };