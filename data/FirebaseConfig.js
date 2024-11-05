import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAgw2nXcA8gj3HtkCsjRaz0yxJxtK3XlJg",
    authDomain: "text-speak-d189c.firebaseapp.com",
    projectId: "text-speak-d189c",
    storageBucket: "text-speak-d189c.firebasestorage.app",
    messagingSenderId: "451000120561",
    appId: "1:451000120561:web:de4011b74a738e54bca550"
};


const appFireabase = initializeApp(firebaseConfig);

export default appFireabase;