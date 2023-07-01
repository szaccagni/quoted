import firebase_app from "../config";
import { getAuth, User, updateProfile } from "firebase/auth";

interface UpdateResponse {
  result: void | null;
  error: any;
}

export default async function updateUser(displayName: string | null, photoURL: string | null): Promise<UpdateResponse> {
  const auth = getAuth(firebase_app);
  let result = null;
  let error = null;

  try {
    let curUser: User | null = auth.currentUser;
    if (curUser) {
        result = await updateProfile(curUser, {displayName: displayName || curUser.displayName , photoURL: photoURL || curUser.photoURL} );
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    error = e;
  }

  if (result === null) {
    throw new Error("Failed to update profile");
  }

  console.log('result', result);
  console.log('error', error);
  return { result, error };
}