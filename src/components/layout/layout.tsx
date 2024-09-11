import Link from "next/link"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="p-2">
            {children}
            <Link
                href="/"
                className="border-b border-transparent duration-200 hover:border-gray-300 hover:opacity-80"
            >
                Go back to Top Page
            </Link>
        </div>
    )
}
