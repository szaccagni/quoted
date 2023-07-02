'use client'

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import NavBar from "@/components/NavBar";
import NewQuote from "@/components/NewQuote";
import QuotesFeed from "@/components/QuotesFeed";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuthContext()
  const [quoteCreate, setQuoteCreate] = useState(false);

  useEffect(() => {
    setQuoteCreate(false)
  },[quoteCreate])

  return (
    <main>
      {user ? (
        <>
          <NavBar></NavBar>
          <div className="mt-32">
            <NewQuote onQuoteCreate={setQuoteCreate}></NewQuote>
            <QuotesFeed quoteCreate={quoteCreate}></QuotesFeed>
          </div>
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
