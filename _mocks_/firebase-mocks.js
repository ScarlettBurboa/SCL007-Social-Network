const auth = ()=>{
return {
    createUserWithEmailAndPassword: (objData)=>{
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