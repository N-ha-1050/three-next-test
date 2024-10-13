import Title from "@/components/ui/title"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, PrimitiveProps, useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"

type ModelProps = {
    url: string
}

function Model({ url }: ModelProps) {
    const [gltf, setGltf] = useState<any>()
    useEffect(() => {
        if (!gltf) {
            const {
                GLTFLoader,
            } = require("three/examples/jsm/loaders/GLTFLoader")
            const loader = new GLTFLoader()
            loader.load(url, (_gltf) => {
                setGltf(_gltf)
            })
        }
    }, [gltf])
    const { GLTFLoader } = require("three/examples/jsm/loaders/GLTFLoader.js")
    const { scene, animations } = useLoader(GLTFLoader, url)
    return (
        <primitive
            object={scene}
            dispose={null}
            scale={[8, 8, 8]}
            position={[0, 0, 0]}
        />
    )
}
export default function GltfTest() {
    return (
        <>
            <Title>Gltf Test</Title>
            <Canvas>
                <perspectiveCamera fov={45} position={[0, 1, 5]} />
                <OrbitControls target={[0, 1, 0]} />
                <directionalLight
                    color="white"
                    position={[0, 1, 1]}
                    intensity={Math.PI}
                />
                <mesh>
                    <Model url="/models/toycar/ToyCar.gltf" />
                </mesh>
                <gridHelper args={[10, 10]} />
                <axesHelper args={[5]} />
            </Canvas>
        </>
    )
}
