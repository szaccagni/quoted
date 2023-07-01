import firebase_app from "./config";
import { signInWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";

const auth = getAuth(firebase_app);

interface SignInResponse {
    result: UserCredential | null;
    error: any;
}

export default async function signIn(email: string, password: string): Promise<SignInResponse> {
    let result: UserCredential | null = null;
    let error: any = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    console.log('result', result)
    console.log('error', error)
    return { result, error };
}

export type { SignInResponse };