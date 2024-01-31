

// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAuth } from "firebase/auth";
// var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBe9SaY3Ncob_Sizc0F6FA-gTbw2qXnmBM",
//   authDomain: "otp-verification-150f0.firebaseapp.com",
//   projectId: "otp-verification-150f0",
//   storageBucket: "otp-verification-150f0.appspot.com",
//   messagingSenderId: "436008343305",
//   appId: "1:436008343305:web:53341300ad2e532ff465d8"
// };

//my
const firebaseConfig = {
  apiKey: "AIzaSyDLAwNIqeidpCxP_lhofQanNazReih1v1Y",
  authDomain: "otpverification-2d705.firebaseapp.com",
  projectId: "otpverification-2d705",
  storageBucket: "otpverification-2d705.appspot.com",
  messagingSenderId: "205737744207",
  appId: "1:205737744207:web:af0dd28dc3b228f2f6973a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// auth.languageCode = 'it';

// if (window.location.hostname === 'localhost') {
//   // Use the emulator
//   auth.useEmulator('http://localhost:9099/');
// }


export default auth