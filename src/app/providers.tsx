'use client'

import { AuthContextProvider, AuthContextProviderProps } from "@/context/AuthContext"

export function Providers({ children }: AuthContextProviderProps) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}