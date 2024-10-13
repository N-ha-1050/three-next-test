import Title from "@/components/ui/title"
import { OrbitControls } from "@react-three/drei"
import { Canvas, PrimitiveProps, useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

function Model() {
    const ref = useRef<PrimitiveProps>(null!)
    // const { scene } = useLoader(
    //     GLTFLoader,
    //     "/models/VRM1_Constraint_Twist_Sample.vrm",
    //     (loader) => {
    //         loader.register((parser) => new VRMLoaderPlugin(parser))
    //     },
    // )
    const url = "/models/toycar/ToyCar.gltf"
    const { scene, animations } = useLoader(GLTFLoader, url)
    useFrame((state, delta) => {
        ref.current.rotation.y += delta
    })
    return (
        <primitive
            ref={ref}
            object={scene}
            dispose={null}
            scale={[8, 8, 8]}
            position={[0, 0, 0]}
        />
    )
}

export default function VrmDemo() {
    return (
        <>
            <Title>Vrm Test</Title>
            <Canvas>
                <perspectiveCamera fov={45} position={[0, 1, 5]} />
                <OrbitControls target={[0, 1, 0]} />
                <directionalLight
                    color="white"
                    position={[0, 1, 1]}
                    intensity={Math.PI}
                />
                <mesh>
                    <Model />
                </mesh>
                <gridHelper args={[10, 10]} />
                <axesHelper args={[5]} />
            </Canvas>
        </>
    )
}
