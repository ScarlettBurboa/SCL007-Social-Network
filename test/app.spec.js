import { checkAuthState, registerUser, firebase, callback, firebaseUser } from '../src/js/auth.js';

const chai = require('chai');
/*
describe('Mostrar como iniciar un proyecto', () => {
  it('Debería mostrar como hacer tests', () => {
    chai.assert.equal(checkAuthState(), true);
  });
  it('Debería mostrar cómo hacer test con otras functiones', () => {
    chai.assert.equal(miOtraFunctionTesteableExp(), false);
  });
});*/
beforeEach(() => {
  firebaseUser();
});


describe('Mostrar que checkAuthState sea una función', () => {
  it('Debería ser una función', () => {
  chai.assert.equal(typeof checkAuthState,'function');
  });
});


describe('Mostrar que registerUser sea una función', () => {
  it('Debería ser una función', () => {
  chai.assert.equal(typeof registerUser,'function');
  });
});

describe('registerUser(email, password)', ()=>{
  
 // let isEmail= 'usuario@gmail.com';
 // let isPassword = '12345678';
 // let register = registerUser(isEmail, isPassword);
//
//  it('debe retornar un objeto que tenga como propiedades email y password', () => {
//  assert.ok(register.hasOwnProperty('IsEmail'));
//  assert.ok(register.hasOwnProperty('isPassword'));
//});

it('debería retornar verdadero para usuario@gmail.com con password 12345678', () => {
  chai.expect(firebase.registerUser('usuario@gmail.com','12345678'), true);
});



});