import { useEffect, useState } from "react"
import { getQuotes, Quote } from "@/firebase/firestore"
import QuoteCard from "./QuoteCard"
import { User } from "firebase/auth"

interface QuotesFeedProps {
    quoteCreate: boolean,
    user: User
}

export default function QuotesFeed({ quoteCreate, user }: QuotesFeedProps) {
    const [quotes, setQuotes] =  useState<Quote[]>([])
    console.log('quotes feed user: ', user)
    const loadQuotes = async () => {
        const response = await getQuotes()
        setQuotes(response)
        console.log('front end res: ', response )
    }

    useEffect(() => {
        loadQuotes()
    }, [quoteCreate])

    return (
        <div className="flex flex-col items-center justify-center">
            {quotes.map((quote) => (
                <QuoteCard key={quote.id} {...quote}/>
            ))}
        </div>
    )
}