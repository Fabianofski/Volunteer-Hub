import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig : object = {
  apiKey: "AIzaSyC3GSNjDV2E_95cOur2tfmi4uOyhbx6GIE",
  authDomain: "volunteerhub-2ff2b.firebaseapp.com",
  projectId: "volunteerhub-2ff2b",
  storageBucket: "volunteerhub-2ff2b.appspot.com",
  messagingSenderId: "1056710675641",
  appId: "1:1056710675641:web:cd86712ec84d395a031f68",
  measurementId: "G-9B6HZPPE89"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;