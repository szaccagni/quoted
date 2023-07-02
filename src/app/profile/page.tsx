'use client'
import NavBar from "@/components/NavBar";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import updateUser from "@/firebase/auth/updateUser";
import Image from "next/image";

export default function Profile() {
    const [name, setName] = useState('')
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/")
    })

    const handleClick = () => {
        console.log('handle update user')
        updateUser(name, user?.photoURL || '')
    }

    return (
        user && (
            <>
                <button className="m-5" onClick={() => router.push('/')}>
                    <Image src='/QUOTED-text.png' alt="quoted" height={100} width={100}></Image>
                </button>
                <div className="flex flex-col items-center">
                    <div className="truncate rounded-full mb-7">
                        <Image src={user?.photoURL || '/no-photo.png'} alt="profile-photo" width={200} height={200}></Image>
                    </div>
                    <div className="mb-7">
                        <form>
                            <div>
                                <input onChange={(e) => setName(e.target.value)} defaultValue={user.displayName || ''}></input>
                            </div>
                            <button onClick={() => handleClick()}>update name</button>
                            <div>
                                <input type="file" accept="image/*" id="imageInput"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    )
}