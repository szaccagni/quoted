import firebase_app from "./config";
import { getAuth, User } from "firebase/auth";
import { getDownloadURL, getStorage, ref, StorageReference, uploadBytes } from "firebase/storage"
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
const storage = getStorage();

interface AddDataResult {
  result: void; // The result of setDoc is void
  error: Error | null;
} 

interface ImgUploadResponse {
  result: void | null;
  error: any;
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

        quotes = filteredData
    } catch (err) {
        console.log(err)
    }
    return quotes
}

const addQuote = async (quoteData: Quote) => {
  try {
    const res = await addDoc(quoteCollection, quoteData)
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

const uploadAuthorImg = async (file: Blob | Uint8Array | File | '', fileName: string ) => {
  if (file) {
    const fileRef = ref(storage, fileName);
    const upload = await uploadBytes(fileRef, file)
  }
}

const getUrl = async (fileName: string) => {
  const fileRef = ref(storage, fileName);
  const photoURL = await getDownloadURL(fileRef);
  return photoURL;
}

// async function uploadFile(file: Blob | Uint8Array, curUser: User, setLoading: Dispatch<SetStateAction<boolean>>) {
//   const fileRef = ref(storage, curUser?.uid + '.png');
//   uploadBytes(fileRef, file)
//   .then((res) => {
//       setLoading(false)
//       return res
//   });
// }

export type { Quote };
export { getQuotes, addQuote, getQuote, updateQuote, deleteQuote, uploadAuthorImg, getUrl }