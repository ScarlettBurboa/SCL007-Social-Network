/* función para guardar datos (post) en la base de datos Firebase */
export const savePost = (userName, post, photo) => {
 const keyPost = firebase.database().ref('post/').child('post').push().key;    
    firebase.database().ref(`post/${keyPost}`).set({
        user : userName, 
        pospublic : post, 
        userphoto : photo
    });
    };
export const readPost = (postChange) =>{
    const postReference = firebase.database().ref('post/');
    postReference.on('child_added', (post) =>{
        postChange(post);
    });
};
/* export const likeAction = (sum) =>{
    let addLike = 0;
    refmessageLike = firebase.database().ref().child("mensaje").child(sum);
    refmessageLike.on("value",function(snap){
        addLike = snap.val().Like;
    });
    refmessageLike.update({
    Like:addLike+1
    });
} */
