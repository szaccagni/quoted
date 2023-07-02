import firebase_app from "./config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    UserCredential,
    signOut,
    User,
    updateProfile
} from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

const auth = getAuth(firebase_app);
const storage = getStorage();


interface SignUpResponse {
    result: UserCredential | null;
    error: any;
}

interface SignInResponse {
    result: UserCredential | null;
    error: any;
}

interface UpdateResponse {
    result: void | null;
    error: any;
}

async function signUp(email: string, password: string): Promise<SignUpResponse> {
    let result: UserCredential | null = null;
    let error: any = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function signIn(email: string, password: string): Promise<SignInResponse> {
    let result: UserCredential | null = null;
    let error: any = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}


async function logOut() {
    await signOut(auth)
    return
}

async function uploadFile(file: Blob | Uint8Array, curUser: User, setLoading: Dispatch<SetStateAction<boolean>>) {
    const fileRef = ref(storage, curUser?.uid + '.png');
    uploadBytes(fileRef, file)
    .then((res) => {
        setLoading(false)
        return res
    });
}

async function updateUser(displayName: string | null): Promise<UpdateResponse> {
    const auth = getAuth(firebase_app);
    let result = null;
    let error = null;

    try {
        let curUser: User | null = auth.currentUser;
        if (curUser) {
            // get photo
            const fileRef = ref(storage, curUser.uid + '.png');
            const photoURL = await getDownloadURL(fileRef);
            result = await updateProfile(curUser, { displayName: displayName || curUser.displayName,  photoURL: photoURL || curUser.photoURL});
        } else {
            throw new Error("User not found");
        }
    } catch (e) {
        error = e;
    }

    if (result === null) {
        throw new Error("Failed to update profile");
    }
    return { result, error };
}


export type { SignUpResponse, SignInResponse };
export { signUp, signIn, logOut, updateUser, uploadFile }
