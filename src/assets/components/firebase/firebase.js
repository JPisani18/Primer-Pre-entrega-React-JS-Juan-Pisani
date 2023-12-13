// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqviW8Yza63znvM0DzmaI0x0BVRGCAq9s",
    authDomain: "mi-tienda-juan-pisani.firebaseapp.com",
    projectId: "mi-tienda-juan-pisani",
    storageBucket: "mi-tienda-juan-pisani.appspot.com",
    messagingSenderId: "1091680274901",
    appId: "1:1091680274901:web:6c603a7f20b824d567555c"
  };
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
  export { firestore, app as default };