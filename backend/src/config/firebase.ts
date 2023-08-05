import "dotenv/config";
import firebase from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const { credential } = firebase;

// Initialize Firebase
const appFirebase = initializeApp({
  credential: credential.cert("./firebase.json"),
});

// console.log("credenciales", appFirebase.options.credential);
console.log("name: ", appFirebase.name);

export const firebaseMessaging = getMessaging();
