import { useEffect, useState } from "react"
import { getQuotes, Quote } from "@/firebase/firestore"
import QuoteCard from "./QuoteCard"

export default function QuotesFeed() {
    const [quotes, setQuotes] =  useState<Quote[]>([])

    useEffect(() => {
        const loadQuotes = async () => {
            const response = await getQuotes()
            setQuotes(response)
            console.log('front end res: ', response )
        }
        loadQuotes()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {quotes.map((quote) => (
                <QuoteCard key={quote.id} {...quote}/>
            ))}
        </div>
    )
}