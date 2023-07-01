import firebase_app from "../config";
import { Firestore, getFirestore, DocumentReference, doc, setDoc } from "firebase/firestore";

const db: Firestore = getFirestore(firebase_app);

interface AddDataResult {
  result: void; // The result of setDoc is void
  error: Error | null;
}

export default async function addData(
  collection: string,
  id: string,
  data: any // Adjust the type of `data` to match the expected data type in Firestore
): Promise<AddDataResult> {
  let result: void | undefined = undefined;
  let error: Error | null = null;

  try {
    const documentRef: DocumentReference = doc(db, collection, id);
    result = await setDoc(documentRef, data, {
      merge: true,
    });
  } catch (e) {
    error = e as Error;
  }

  return { result, error };
}