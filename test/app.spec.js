//import mockFirabase from '../_mocks_/firebase-mocks.js';
//global.firebase = mockFirabase();
import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user_a: {
          age: 15,
          username: 'user_a',

          __collection__: {
            friends: {
              __doc__: {
                user_b: {
                  reference: '__ref__:users/user_b'
                }
              }
            }
          }
        },

        user_b: {
          age: 10,
          username: 'user_b',

          __collection__: {
            friends: {
              __doc__: {
                user_a: {
                  reference: '__ref__:users/user_a'
                }
              }
            }
          }
        },

        user_c: {
          age: 20,
          username: 'user_c'
        }
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, {isNaiveSnapshotListenerEnabled: true});
import { registerUser } from '../src/js/auth.js';

//const chai = require('chai');

describe('Mostrar registro de usuario', () => {
  it('Debería mostrar cuando se registra un usuario', () => {
    return registerUser('usuario@email.com', 12345678).then((email, password)=>{
      expect(email, password).toBe('usuario@email.com', 12345678);

    });
  });

});
