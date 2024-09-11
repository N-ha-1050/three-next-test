import { ReactNode } from "react"

type Props = {
    title: string
    children: ReactNode
}
export default function Section({ title, children }: Props) {
    return (
        <>
            <h2 className="mb-2 text-xl">{title}</h2>
            <div className="mb-8">{children}</div>
        </>
    )
}
