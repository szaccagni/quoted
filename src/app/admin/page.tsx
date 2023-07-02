'use client'
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import updateUser from "@/firebase/auth/updateUser";

export default function Admin() {
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
        user &&
        <>
        <div>
            <div>{user.displayName}</div>
            <div>{user.photoURL}</div>
            <div>{user.email}</div>
        </div>
        <div>
            <form>
                <input onChange={(e) => setName(e.target.value)}></input>
                <button onClick={() => handleClick()}>update name</button>
            </form>
        </div>
        </>
    );
}