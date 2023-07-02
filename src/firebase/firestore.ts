import firebase_app from "./config";
import { getAuth, User } from "firebase/auth";
import { 
    Firestore, 
    getFirestore, 
    DocumentReference, 
    doc, 
    setDoc, 
    getDocs, 
    collection,
    addDoc
} from "firebase/firestore";

const db: Firestore = getFirestore(firebase_app);
const auth = getAuth(firebase_app);
const curUser: User | null = auth.currentUser;

interface AddDataResult {
  result: void; // The result of setDoc is void
  error: Error | null;
} 

type Quote = {
    author: string;
    authorAvatar: string;
    dtCreated: Date;
    quoteText: string;
    userId: string;
    id?: string;
};

const quoteCollection = collection(db, "quotes")

async function getQuotes():Promise<Quote[]> {
    let quotes: Quote[] = []
    try {
        const data = await getDocs(quoteCollection)
        const filteredData = data.docs.map((doc) => ({
            author: doc.data().author,
            authorAvatar: doc.data().authorAvatar,
            dtCreated: doc.data().dtCreated.toDate(),
            id: doc.id,
            quoteText: doc.data().quoteText,
            userId: doc.data().userId, 
        }))
        filteredData.sort((a, b) => b.dtCreated.getTime() - a.dtCreated.getTime());

        console.log('filteredData: ', filteredData)
        quotes = filteredData
    } catch (err) {
        console.log(err)
    }
    return quotes
}

const addQuote = async (quoteData: Quote) => {
  try {
    const res = await addDoc(quoteCollection, quoteData)
    console.log('backend add quote res: ', res)
    return res
  } catch(err) {
    console.log(err)
  }
  
}

async function addData(
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

export type { Quote };
export { getQuotes, addQuote }