'use client'

import Image from "next/image"
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { Quote, addQuote, uploadAuthorImg, getUrl } from "@/firebase/firestore"

interface NewQuoteProps {
    onQuoteCreate: Dispatch<SetStateAction<boolean>>;
}

export default function NewQuote( { onQuoteCreate }: NewQuoteProps) {
    const { user } = useAuthContext()
    const [photoData, setPhotoData] = useState('/no-photo.png')
    const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
    const [author, setAuthor] = useState('')
    const [quoteText, setQuoteText] = useState('')
    const [loading, setLoading] = useState(false)

    const handleImgInput = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const files = e.target.files
        if (files && files.length > 0 && user) {
            // display preview on screen
            const selectedFile = files[0];
            setPhotoFile(selectedFile)
            const reader = new FileReader();
        
            reader.onload = () => {
              if (reader.readyState === 2) {
                setPhotoData(reader.result as string);
              }
            };
            reader.readAsDataURL(selectedFile);

            await uploadAuthorImg(selectedFile, selectedFile?.name)
        } else {
            setLoading(false)
        }
    }

    const createQuote = async () => {
        let photoUrl = await getUrl(photoFile?.name || '')
        const newQuote: Quote = {
            author,
            authorAvatar: photoUrl,
            dtCreated: new Date(),
            quoteText,
            userId: (user?.uid || '')
        }
        const res = await addQuote(newQuote)
        setAuthor('')
        setQuoteText('')
        setPhotoData('/no-photo.png')
        setPhotoFile(undefined)
        onQuoteCreate(true)
    }

    return (
        <div className="flex flex-col items-center justify-center mb-3">
            <div className="w-11/12 py-3 px-5 border">
                <div className="flex">                    
                    <div className="truncate rounded-full w-20 h-20 relative opacity-50">
                        <Image src={photoData} alt="" fill className="object-cover"></Image>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <form id="imageForm">
                                <label htmlFor="imageInput" id="cameraIcon">
                                    <Image src="/camera.png" alt="Camera Icon" width={50} height={50} ></Image>
                                </label>
                                <input onChange={(e) => handleImgInput(e)} type="file" accept="image/*" id="imageInput" className="hidden"></input>
                            </form>
                        </div>
                    </div>
                    <div className="w-4/5 px-2">
                        <div className="ml-5">
                            <div className="w-full mb-3">
                                <input 
                                    className="w-full p-2 border" 
                                    placeholder="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                ></input>
                            </div>
                            <div className="w-full">
                                <textarea 
                                    rows={4} 
                                    className="w-full p-2 border" 
                                    placeholder="quote"
                                    value={quoteText}
                                    onChange={(e) => setQuoteText(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-14 rounded-full text-center inline-block  lg:w-1/4 md:w-1/2 w-auto mt-5"
                        onClick={createQuote}
                    >create</button>
                </div>
            </div>
        </div>
    )
}