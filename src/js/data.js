
/* función para guardar datos (post) en la base de datos Firebase */
export const savePost = (userName, post, photo, datePost) => {
    const userId = firebase.auth().currentUser.uid;
 const keyPost = firebase.database().ref('post/').child('post').push().key;    
    firebase.database().ref(`post/${keyPost}/`).set({
        user: userName,
        pospublic: post,
        userphoto: photo,
        createdDate: datePost,
    });
    //Se agrega dentro de la misma función savePost para que tenga la misma id del post y use la misma llave
    firebase.database().ref(`postUser/${userId}/${keyPost}/`).set({
        user : userName, 
        pospublic : post, 
        userphoto : photo,
       createdDate: datePost,
    });
    };
     /*_______________________________________________________________________- */
export let objectComplete = [];
export let object = () =>{
    firebase.database().ref('post').orderByValue().on("value", function(snapshot) {
        Object.entries(snapshot.val()).forEach(function(data) {
        objectComplete.push(data[1]);
        });      
    }); 
}   
export const readPost = (postChange) =>{
    const postReference = firebase.database().ref('post/');
    postReference.on('child_added', (post) => {
       // console.log(post.val())
        postChange(post);
    });   
};
export const readPostUser = (postChange) =>{
    const userId = firebase.auth().currentUser.uid;
    const postReferenceread = firebase.database().ref(`postUser/${userId}/`);
       postReferenceread.on('child_added', (postUser) =>{
           postChange(postUser);
       });
   };
   /*_________________________________________________________________________*/
   //Función para buscar elementos por sus keys.
export function findObjectByKey(array, key, value) {
    const ret = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i][key].includes(value)) {
            ret.push(array[i]);
        }
    }
    return ret;
}





