'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getQuote, Quote, updateQuote, deleteQuote, uploadAuthorImg, getUrl } from "@/firebase/firestore";
import Image from "next/image";

export default function EditQuote() {
    const { user } = useAuthContext()
    const searchParams = useSearchParams()
    const quoteId = searchParams.get('quoteId')
    const [photoData, setPhotoData] = useState('')
    const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
    const [quoteData, setQuoteData] = useState<Quote>({
        author: '',
        authorAvatar: '',
        dtCreated: '',
        quoteText: '',
        userId: '',
    });
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    async function loadQuote() {
        if (quoteId) {
            const quoteDoc = await getQuote(quoteId)
            setQuoteData({
                author: quoteDoc?.author,
                authorAvatar: quoteDoc?.authorAvatar,
                dtCreated: quoteDoc?.dtCreated,
                quoteText: quoteDoc?.quoteText,
                userId: quoteDoc?.userId,
            })
            setLoading(false)
        } else {
            setError('error getting quote data')
            router.push('/')
        }

    }

    useEffect(() => {
        if (user == null) router.push("/")
        loadQuote()
    }, [])

    async function handleUpdate() {
        let photoUrl = ''
        if (photoFile) photoUrl = await getUrl(photoFile?.name || '')
        let quoteDataToUpdate = {}
        if (photoUrl) {
            quoteDataToUpdate = {
                ...quoteData,
                authorAvatar: photoUrl
            }
        } else {
            quoteDataToUpdate = quoteData
        }
        
        if (quoteId) {
            await updateQuote(quoteId, quoteDataToUpdate)
            router.push('/')
        }
    }

    async function handleDelete() {
        if (quoteId) {
            await deleteQuote(quoteId)
            router.push('/')
        }
    }

    const handleImgInput = async (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        user && !error && (
            <>
                <button className="m-3" onClick={() => router.push('/')}>
                    <Image src='/QUOTED-text.png' alt="quoted" height={100} width={100}></Image>
                </button>
                {
                    loading ? (
                        <div>loading...</div>
                    ) : (
                        <div>
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <div className="truncate rounded-full opacity-75 w-52 h-52 relative">
                                        <Image src={photoData || quoteData.authorAvatar || '/no-photo.png'} alt="profile-photo" fill className="object-cover"></Image>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <form id="imageForm">
                                            <label htmlFor="imageInput" id="cameraIcon">
                                                <Image src="/camera.png" alt="Camera Icon" width={50} height={50} ></Image>
                                            </label>
                                            <input onChange={(e) => handleImgInput(e)}type="file" accept="image/*" id="imageInput" className="hidden"></input>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-7 mb-7 w-4/5">
                                    <div>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            onChange={(e) =>
                                                setQuoteData(() => ({
                                                    ...quoteData,
                                                    author: e.target.value
                                                }))
                                            }
                                            defaultValue={quoteData.author}
                                        ></input>
                                    </div>
                                </div>
                                <div className="mb-7 w-4/5">
                                    <div>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            onChange={(e) =>
                                                setQuoteData(() => ({
                                                    ...quoteData,
                                                    quoteText: e.target.value
                                                }))
                                            }
                                            defaultValue={quoteData.quoteText}
                                            rows={4}
                                        ></textarea>
                                    </div>
                                </div>
                                <button
                                    onClick={handleUpdate}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-14 rounded-full text-center inline-block  lg:w-1/4 md:w-1/2 w-auto"
                                >
                                    confirm changes
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-14 rounded-full text-center inline-block  lg:w-1/4 md:w-1/2 w-auto mt-2"
                                >
                                    delete quote
                                </button>
                            </div>
                        </div>
                    )
                }
            </>
        )
    )

}