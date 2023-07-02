'use client'

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import NavBar from "@/components/NavBar";
import QuotesFeed from "@/components/QuotesFeed";

export default function Home() {
  const { user } = useAuthContext()

  return (
    <main>
      {user ? (
        <>
          <NavBar></NavBar>
          <QuotesFeed></QuotesFeed>
        </>
      ) : (
        <AuthLayout>
          <div>
            Create an official QUOTED account to get the full experience.
          </div>
          <div className="flex flex-col">
            <Link href='/signup' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full my-5 text-center">
              Create an account
            </Link>
            <Link href='/signin' className="bg-transparent hover:bg-gray-300 font-bold py-3 px-4 rounded-full border border-gray-400 p5 text-center">
              Log in
            </Link>
          </div>
        </AuthLayout>
      )}
    </main>
  )
}
