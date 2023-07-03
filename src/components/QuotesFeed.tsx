import { useEffect, useState } from "react"
import { getQuotes, Quote } from "@/firebase/firestore"
import QuoteCard from "./QuoteCard"

interface QuotesFeedProps {
    quoteCreate: boolean,
}

export default function QuotesFeed({ quoteCreate }: QuotesFeedProps) {
    const [quotes, setQuotes] =  useState<Quote[]>([])

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