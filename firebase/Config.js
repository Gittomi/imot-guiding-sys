import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, addDoc, deleteDoc, doc, serverTimestamp, orderBy, onSnapshot } from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  //api key here

  };

  initializeApp(firebaseConfig);
  
  const firestore = getFirestore();

  const COORDINATES = 'coordinates';

  export {
    firestore,
    collection,
    query,
    addDoc,
    onSnapshot,
    serverTimestamp,
    orderBy,
    COORDINATES,
    getAuth,
    signInWithEmailAndPassword,
    deleteDoc,
    doc,
    
   
    
  }