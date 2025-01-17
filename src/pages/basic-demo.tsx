import Title from "@/components/ui/title"
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { OrbitControls } from "@react-three/drei"
import { Mesh } from "three"
import AnimationLink from "@/components/ui/animation-link"

function Box(props: ThreeElements["mesh"]) {
    const meshRef = useRef<Mesh>(null!)

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => (meshRef.current.rotation.x += delta))

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    )
}

export default function BasicDemo() {
    return (
        <>
            <Title>Three.js Test</Title>
            <p>
                <AnimationLink href="https://r3f.docs.pmnd.rs/getting-started/introduction#what-does-it-look-like?">
                    React Three Fiber 公式ドキュメント Getting Started
                </AnimationLink>
                にある例
            </p>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    decay={0}
                    intensity={Math.PI}
                />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <OrbitControls />
            </Canvas>
        </>
    )
}
