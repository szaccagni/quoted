import firebase_app from "./config";
import { createUserWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";

const auth = getAuth(firebase_app);

interface SignUpResponse {
    result: UserCredential | null;
    error: any;
}

export default async function signUp(email: string, password: string): Promise<SignUpResponse> {
    let result: UserCredential | null = null;
    let error: any = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    
    return { result, error };
}

export type { SignUpResponse };
