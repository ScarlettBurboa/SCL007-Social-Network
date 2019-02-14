const auth = ()=>{
return {
    createUserWithEmailAndPassword: (email, password)=>{
return new Promise((resolve)=>{
resolve('Usuario creado')
})
    }
}
};

const firebase = ()=>{
    auth: auth
};

export default jest.fn(()=>{
    return firebase;
})