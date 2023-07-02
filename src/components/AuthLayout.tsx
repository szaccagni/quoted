import Image from "next/image"
import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <Image src='/QUOTED.png' alt="quoted logo" width={500} height={500}></Image>
            </div>
            <div className="m-10 md:w-2/5 w-3/5">
                {children}
            </div>
        </div>
    )
}