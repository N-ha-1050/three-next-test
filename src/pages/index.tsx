import AnimationLink from "@/components/ui/animation-link"
import Title from "@/components/ui/title"
import Link from "next/link"

export default function Home() {
    return (
        <>
            <Title>Home</Title>
            <h2 className="text-xl font-bold">Pages</h2>
            <ul className="mb-4 ml-8 list-disc">
                <li>
                    <AnimationLink href="simple">Simple</AnimationLink>
                </li>
                <li>
                    <AnimationLink href="basic-demo">Basic Demo</AnimationLink>
                </li>
                <li>
                    <AnimationLink href="vrm-demo">VRM Demo</AnimationLink>
                </li>
            </ul>
        </>
    )
}
