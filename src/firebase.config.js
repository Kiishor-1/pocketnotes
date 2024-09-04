import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_REACT_APP_API_KEY ,
//   authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
//   messagingSenderId:import.meta.env.VITE_REACT_APP_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_REACT_APP_APPID,
//   measurementId:import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyS3J4-HAR6C1R-8qGSDV3DZhuKV3H1Y4",
  authDomain: "pocketnotes-beda1.firebaseapp.com",
  projectId: "pocketnotes-beda1",
  storageBucket: "pocketnotes-beda1.appspot.com",
  messagingSenderId: "381760484920",
  appId: "1:381760484920:web:28977ed8d97a98d0fb18cd",
  measurementId: "G-XCZSY26DK3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const setUpRecaptcha = (elementId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved:');
      },
    });
  }
};
