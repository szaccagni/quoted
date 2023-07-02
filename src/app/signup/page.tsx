'use client'

import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { SignUpResponse, signUp } from "@/firebase/firebase-auth";
import AuthLayout from "@/components/AuthLayout";

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { result, error }: SignUpResponse = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        return router.push("/")
    }

    return (
        <AuthLayout>
            <div className="font-bold text-xl mb-3">Create your account</div>
            <div>
                <form onSubmit={handleForm}>
                    <div className="mb-4">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full text-center inline-block md:w-1/2 w-full"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}