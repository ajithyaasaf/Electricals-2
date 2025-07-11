import { signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithRedirect(auth, provider);
}

export function logOut() {
  return signOut(auth);
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
