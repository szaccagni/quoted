import firebase_app from "../config";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function logOut() {
    await signOut(auth)
    return
}