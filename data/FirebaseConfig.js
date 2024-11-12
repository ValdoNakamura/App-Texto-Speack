import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgw2nXcA8gj3HtkCsjRaz0yxJxtK3XlJg",
    authDomain: "text-speak-d189c.firebaseapp.com",
    projectId: "text-speak-d189c",
    storageBucket: "text-speak-d189c.appspot.com",
    messagingSenderId: "451000120561",
    appId: "1:451000120561:web:de4011b74a738e54bca550"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia usando AsyncStorage
const FireBase_Auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializar Firestore
const FireBase_DB = getFirestore(app);

export { app, FireBase_Auth, FireBase_DB };