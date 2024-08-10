// import { initializeApp } from "firebase/app";
// import { getAuth , RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";

// // Your web app's Firebase configuration
// // const firebaseConfig = {
// //   apiKey:import.meta.env.VITE_REACT_APP_API_KEY ,
// //   authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGE_SENDER_ID,
// //   appId: import.meta.env.VITE_REACT_APP_APPID,
// //   measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID
// // };

// const firebaseConfig = {
//   apiKey: "AIzaSyAE3mJzchfEYK9d-63VnsezqTjDl3CJ9OU",
//   authDomain: "pocketnotes-1dfdc.firebaseapp.com",
//   projectId: "pocketnotes-1dfdc",
//   storageBucket: "pocketnotes-1dfdc.appspot.com",
//   messagingSenderId: "521603125413",
//   appId: "1:521603125413:web:8d2cd39f10a63d0274bd4c",
//   measurementId: "G-D7LR26CMQ3"
// };


// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };


// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey:import.meta.env.VITE_REACT_APP_API_KEY ,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_REACT_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const setUpRecaptcha = (elementId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved:', response);
      },
    });
  }

};
