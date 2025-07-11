import { 
  signInWithRedirect, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const provider = new GoogleAuthProvider();

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Email/Password Registration
export async function signUpWithEmailPassword(
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Update user profile
  await updateProfile(user, {
    displayName: `${firstName} ${lastName}`
  });
  
  // Create user document in Firestore
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    displayName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  await setDoc(doc(db, 'users', user.uid), userProfile);
  
  // Send email verification
  await sendEmailVerification(user);
  
  return userCredential;
}

// Email/Password Login
export async function signInWithEmailPassword(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Google Sign In
export function signInWithGoogle() {
  return signInWithRedirect(auth, provider);
}

// Password Reset
export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

// Get User Profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as UserProfile;
  }
  return null;
}

// Update User Profile
export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  const updateData = {
    ...updates,
    updatedAt: new Date()
  };
  
  await setDoc(doc(db, 'users', uid), updateData, { merge: true });
}

// Sign Out
export function logOut() {
  return signOut(auth);
}

// Auth State Observer
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
