import {getFirestore} from 'firebase/firestore';
import { initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCviz4RdJR9eYgHAlQBsIQcVMsTQ1y8c9E",
  authDomain: "busybuy-672aa.firebaseapp.com",
  projectId: "busybuy-672aa",
  storageBucket: "busybuy-672aa.appspot.com",
  messagingSenderId: "752548168930",
  appId: "1:752548168930:web:9c553126c0b9ab842e8abb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};