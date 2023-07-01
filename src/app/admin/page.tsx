'use client'
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Admin() {
    const { user } = useAuthContext()
    console.log('user', user)
    const router = useRouter()

    // useEffect(() => {
    //     if (user == null) router.push("/")
    // })

    return (
        user &&
        <h1>Only logged in users can view this page</h1>
    );
}