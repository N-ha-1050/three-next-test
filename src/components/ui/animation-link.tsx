import Link from "next/link"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
    href: string
}

export default function AnimationLink({ children, href }: Props) {
    return (
        <Link
            href={href}
            className="border-b border-transparent duration-200 hover:border-gray-300 hover:opacity-80"
        >
            {children}
        </Link>
    )
}
