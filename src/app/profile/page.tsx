'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { updateUser, uploadFile } from "@/firebase/firebase-auth";
import Image from "next/image";

export default function Profile() {
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const [photoData, setPhotoData] = useState(user?.photoURL || '/no-photo.png')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/")
    })

    const handleClick = async () => {
        await updateUser(name)
        router.push("/")
    }

    const handleImgInput = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const files = e.target.files
        if (files && files.length > 0 && user) {
            // display preview on screen
            const selectedFile = files[0];
            const reader = new FileReader();
        
            reader.onload = () => {
              if (reader.readyState === 2) {
                setPhotoData(reader.result as string);
              }
            };
            reader.readAsDataURL(selectedFile);

            // upload image to storage 
            await uploadFile(selectedFile, user, setLoading)
        } else {
            setLoading(false)
        }
    }

    return (
        user && (
            <>
                <button className="m-5" onClick={() => router.push('/')}>
                    <Image src='/QUOTED-text.png' alt="quoted" height={100} width={100}></Image>
                </button>
                <div>
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="truncate rounded-full opacity-75 w-52 h-52 relative">
                                <Image src={photoData} alt="profile-photo" fill className="object-cover"></Image>
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
                        <div className="mt-7 mb-7">
                            <div>
                                <input 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setName(e.target.value)} 
                                    defaultValue={user.displayName || ''}
                                ></input>
                            </div>
                        </div>
                        <button 
                            onClick={handleClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-14 rounded-full text-center inline-block  lg:w-1/4 md:w-1/2 w-auto"
                            disabled={loading}
                        >
                            confirm changes
                        </button>
                    </div>
                </div>
            </>
        )
    )
}