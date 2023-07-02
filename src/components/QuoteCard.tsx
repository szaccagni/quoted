import Image from "next/image";
import { Quote } from "@/firebase/firestore";

export default function QuoteCard(quote: Quote) {
    const formattedDate = quote.dtCreated.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const containerClass = 'flex items-center px-5 w-full'

    return (
        <div className="bg-gray-200 w-11/12 py-3 my-1">
            <div className={containerClass}>
                <div className="truncate rounded-full w-14 h-14 relative">
                    <Image src={quote.authorAvatar || '/no-photo.png'} alt="" fill className="object-cover"></Image>
                </div>
                <div className="ml-3">
                    <p className="text-base leading-6 font-medium">
                        {quote.author} &nbsp; &nbsp;
                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            {formattedDate}
                        </span>
                    </p>
                </div>
            </div>
            <div className={`mt-4 justify-center ${containerClass}`}>
                <p>&quot;{quote.quoteText}&quot;</p>
            </div>
            <div className={`mt-4 ${containerClass}`}>
                <a href="#" className="mt-1 flex items-center text-gray-500">
                    <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </a>
                <a href="#" className="mt-1 mx-3 flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </a>
            </div>
        </div>
    )
}