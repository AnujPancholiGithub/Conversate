// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKtBLBCevVdyGD-2mUFpr-7DXYulsDUQ0",
  authDomain: "conversate-01.firebaseapp.com",
  projectId: "conversate-01",
  storageBucket: "conversate-01.appspot.com",
  messagingSenderId: "21401417156",
  appId: "1:21401417156:web:8aa4da174c69cb98fe6091",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const GoogleApp = () => {
  return (
    <div>
      <SignInCard />
    </div>
  );
};

export default GoogleApp;
