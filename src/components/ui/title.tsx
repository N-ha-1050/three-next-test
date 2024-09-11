import Head from "next/head"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Title({ children }: Props) {
    return (
        <>
            <Head>
                <title>{children} | Scenario Video</title>
            </Head>
            <h1 className="mb-4 text-4xl">{children}</h1>
        </>
    )
}
