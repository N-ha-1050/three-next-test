import Title from "@/components/ui/title"
import { Canvas, useFrame } from "@react-three/fiber"
import { VRMLoaderPlugin } from "@pixiv/three-vrm"
import { useEffect, useRef, useState } from "react"
import { GLTFLoader, GLTF, GLTFLoaderPlugin } from "three-stdlib"
import { Html, OrbitControls } from "@react-three/drei"

const c2n: { [key: string]: number } = {
    あ: 0,
    い: 1,
    う: 2,
    え: 3,
    お: 4,
}

const freq = 1

const aiueo = ["aa", "ih", "ou", "ee", "oh"]
function Model({ text }: { text: string }) {
    const [gltf, setGltf] = useState<GLTF>()
    const [progress, setProgress] = useState<number>(0)
    const [index, setIndex] = useState<number>()
    const characters = Array.from(text).map((chr) => aiueo[c2n[chr]])
    aiueo.forEach((chr) => {
        gltf?.userData.vrm.expressionManager.setValue(chr, 0)
    })

    useFrame((state, delta) => {
        if (gltf) {
            const a = 2 / freq
            const c = Math.cos(a * Math.PI * state.clock.elapsedTime)
            const len = characters.length
            const s = Math.sin(Math.PI * state.clock.elapsedTime)
            const idx = Math.floor(state.clock.elapsedTime / freq) % len
            setIndex(idx)
            gltf.userData.vrm.expressionManager.setValue(
                characters[idx],
                0.5 - 0.5 * c,
            )
            gltf.userData.vrm.update(delta)
        }
    })

    useEffect(() => {
        if (!gltf) {
            const loader = new GLTFLoader()
            // @ts-ignore
            loader.register((parser) => new VRMLoaderPlugin(parser))
            loader.load(
                "models/VRM1_Constraint_Twist_Sample.vrm",
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
                <>
                    <primitive object={gltf.scene} />
                    {index !== undefined && (
                        <Html center position={[0, 1, 0]}>
                            <p className="text-5xl font-bold text-blue-500">
                                {text[index]}
                            </p>
                        </Html>
                    )}
                </>
            ) : (
                <Html center>{progress}% loaded</Html>
            )}
        </>
    )
}

export default function VrmDemo() {
    const [text, setText] = useState("")
    return (
        <>
            <Title>VRM Demo</Title>
            <input
                placeholder="「あいうえお」のみ対応しています"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full text-black"
            />
            <Canvas style={{ width: "100%", height: "100vh" }}>
                <perspectiveCamera fov={45} position={[0, 1, 5]} />
                <OrbitControls target={[0, 1, 0]} />
                <directionalLight
                    color="white"
                    position={[0, 1, 1]}
                    intensity={Math.PI}
                />
                <mesh>
                    <Model text={text} />
                </mesh>
                <gridHelper args={[10, 10]} />
                <axesHelper args={[5]} />
            </Canvas>
        </>
    )
}
