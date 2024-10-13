import Title from "@/components/ui/title"
import { VRMLoaderPlugin } from "@pixiv/three-vrm"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, PrimitiveProps, useFrame } from "@react-three/fiber"
import { useRef } from "react"

function Model() {
    const ref = useRef<PrimitiveProps>(null!)
    const url = "/models/VRM1_Constraint_Twist_Sample.vrm"
    const { scene } = useGLTF(url, true, true, (loader) => {
        loader.register((parser) => new VRMLoaderPlugin(parser))
    })
    useFrame((state, delta) => {
        console.log(ref.current.userData)
        // ref.current.userData.vrm.expressionManager.setValue("aa", Math.random())
    })
    return <primitive ref={ref} object={scene} />
}

export default function VrmTest() {
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
