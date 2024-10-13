import Title from "@/components/ui/title"
import { Canvas } from "@react-three/fiber"
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js"
import { VRMLoaderPlugin } from "@pixiv/three-vrm"
import { useEffect, useRef, useState } from "react"
import { Html, OrbitControls } from "@react-three/drei"
import { Mesh } from "three"

function Model() {
    const [gltf, setGltf] = useState<GLTF>()
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (!gltf) {
            const loader = new GLTFLoader()
            loader.register((parser) => new VRMLoaderPlugin(parser))
            loader.load(
                "/models/VRM1_Constraint_Twist_Sample.vrm",
                (_gltf) => {
                    setGltf(_gltf)
                    console.log(_gltf)
                },
                (xhr) => {
                    const _progress = (xhr.loaded / xhr.total) * 100
                    setProgress(_progress)
                    console.log(`${_progress}% loaded`)
                },
                (error) => {
                    console.error(error)
                },
            )
        }
    }, [gltf])
    return (
        <>
            {gltf ? (
                <primitive object={gltf.scene} />
            ) : (
                <Html center>{progress}% loaded</Html>
            )}
        </>
    )
}

export default function VrmDemo() {
    const ref = useRef<Mesh>(null!)
    const [text, setText] = useState("")
    return (
        <>
            <Title>Vrm Demo</Title>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <Canvas>
                <perspectiveCamera fov={45} position={[0, 1, 5]} />
                <OrbitControls target={[0, 1, 0]} />
                <directionalLight
                    color="white"
                    position={[0, 1, 1]}
                    intensity={Math.PI}
                />
                <mesh ref={ref}>
                    <Model />
                </mesh>
                <gridHelper args={[10, 10]} />
                <axesHelper args={[5]} />
            </Canvas>
        </>
    )
}
