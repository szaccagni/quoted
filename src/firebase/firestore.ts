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
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const db: Firestore = getFirestore(firebase_app);
const auth = getAuth(firebase_app);
const curUser: User | null = auth.currentUser;

interface AddDataResult {
  result: void; // The result of setDoc is void
  error: Error | null;
} 

type Quote = {
    author: string | '';
    authorAvatar: string | '';
    dtCreated: Date | '';
    quoteText: string | '';
    userId: string | '';
    id?: string | '';
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

const getQuote = async(quoteId: string) => {
  const docRef = doc(db, 'quotes', quoteId)
  try {
    const quoteDoc = await getDoc(docRef)  
    const quoteFormatted = {
      author: quoteDoc.data()?.author,
      authorAvatar: quoteDoc.data()?.authorAvatar,
      dtCreated: quoteDoc.data()?.dtCreated.toDate(),
      id: quoteDoc.id,
      quoteText: quoteDoc.data()?.quoteText,
      userId: quoteDoc.data()?.userId, 
    }
    console.log('quoteDoc: ', quoteFormatted)
    return quoteFormatted
  } catch(err) {
    console.log('getQuote error: ', err)
  }
}

const updateQuote = async(quoteId: string, updatedQuote: object) => {
  const docRef = doc(db, 'quotes', quoteId)
  try {
    await updateDoc(docRef, updatedQuote)
  } catch(err) {
    console.log('updateQuote error: ', err)
  }
}

const deleteQuote = async (quoteId: string) => {
  const docRef = doc(db, 'quotes', quoteId)
  await deleteDoc(docRef);
}

export type { Quote };
export { getQuotes, addQuote, getQuote, updateQuote, deleteQuote }