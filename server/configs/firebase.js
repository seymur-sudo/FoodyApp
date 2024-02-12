// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//email
import { getDatabase } from "firebase/database";
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
//S
// const firebaseConfig = {
//   apiKey: "AIzaSyCJcx2YMG6_nVF5edu_A6GVT9F4PBVMutU",
//   authDomain: "deliveryapp-c1231.firebaseapp.com",
//   projectId: "deliveryapp-c1231",
//   storageBucket: "deliveryapp-c1231.appspot.com",
//   messagingSenderId: "424666995253",
//   appId: "1:424666995253:web:77c622114de3f6d62aaf7c",
//   measurementId: "G-LM1P5GYRC8"
// };

//H
const firebaseConfig = {
  apiKey: "AIzaSyDKRjKegAnr4N_6YjNYg6shB-CakqZWRYk",
  authDomain: "foodyapp-bfe77.firebaseapp.com",
  projectId: "foodyapp-bfe77",
  databaseURL:"https://foodyapp-bfe77-default-rtdb.firebaseio.com",
  storageBucket: "foodyapp-bfe77.appspot.com",
  messagingSenderId: "37887093176",
  appId: "1:37887093176:web:a85fdcdab64c4610a3c74d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fileStorage = getStorage(app);

//email
export const db = getDatabase(app);
const auth = getAuth(app);
export {auth}
