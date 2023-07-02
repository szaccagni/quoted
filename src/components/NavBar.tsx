import Image from "next/image"
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { logOut } from "@/firebase/firebase-auth";
import { useRouter } from "next/navigation";


export default function NavBar() {
    const { user } = useAuthContext()
    const [toggle, setToggle] = useState(false)
    const router = useRouter()

    const navClass = 'fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 border-b border-slate-300 shadow-sm'
    const buttonClass = 'inline-flex items-center text-sm text-gray-500 rounded-full border-2 p-1 border-transparent hover:border-gray-200'
    const dropDownClass = 'block container mx-auto w-full flex justify-between items-center flex-col'
    const linkClass = 'hover:bg-gray-200 w-full text-center cursor-pointer p-2'

    return (
        <div className={toggle ? `${navClass}` : `${navClass} h-28`}>
            <div className='container sm:mx-auto w-full flex justify-between items-center p-4'>
                <div className='flex items-center'>
                    <Image src='/QUOTED-text.png' alt="quoted" height={100} width={100}></Image>
                </div>
                <div className='flex items-center'>
                    <button onClick={() => setToggle(!toggle)} className={toggle ? `${buttonClass} border-gray-200` : `${buttonClass}`}>
                        <div className="truncate rounded-full">
                            <Image src={user?.photoURL || '/no-photo.png'} alt="profile-photo" width={70} height={70}></Image>
                        </div>
                    </button>
                </div>
            </div>
            <div className={toggle ? dropDownClass : 'hidden'}>
                <button className={linkClass} onClick={() => router.push('/profile')}>update profile</button>
                <button className={linkClass} onClick={() => logOut()}>logout</button>
            </div>
        </div>
    )
}