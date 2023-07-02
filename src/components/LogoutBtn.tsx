'use client'

import { logOut } from "@/firebase/firebase-auth";

export default function LogoutBtn() {
    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => logOut()}>
                logout
        </button>
    )
}