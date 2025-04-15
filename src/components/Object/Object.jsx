import React, { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

const BoxModel = () => {
  const [object, setObject] = useState(null)

  useEffect(() => {
    const mtlLoader = new MTLLoader()
    mtlLoader.setPath('/')
    mtlLoader.load('box.mtl', (materials) => {
      materials.preload()

      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.setPath('/')
      objLoader.load('box.obj', (obj) => {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        setObject(obj)
      })
    })
  }, [])

  return object ? (
    <primitive
      object={object}
      scale={0.12}
      position={[0, -0.5, 0]}
      rotation={[0.4, Math.PI / 4, 0]}
    />
  ) : null
}

const Object = () => {
  const [showModel, setShowModel] = useState(false)

  const handleClick = () => {
    setShowModel(true)
  }

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #ffffff 50%, #f5b99a 80%, #f47f5c 100%)',
        textAlign: 'left',
        
      }}
    >
    <button 
  onClick={handleClick} 
  style={{
    padding: '12px 24px', 
    fontSize: '12px', 
    marginLeft: '10px',
    cursor: 'pointer', 
    background: 'linear-gradient(145deg, #f47f5c, #f5b99a)', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '8px', 
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
  }}
>
  Załaduj model 3D
</button>


      {showModel && (
        <Canvas
          shadows
          camera={{ position: [2, 1.5, 5], fov: 60 }}
          style={{ height: '370px', width: '100vw', marginTop: '20px', }}
        >
          {/* Światła */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Model 3D */}
          <Suspense fallback={null}>
            <BoxModel />
          </Suspense>

          {/* Cień pod modelem */}
          <ContactShadows
            position={[0, -0.7, 0]}
            opacity={0.4}
            scale={10}
            blur={1.5}
            far={1.5}
          />

          {/* HDRI otoczenie i autoobrót */}
          <Environment preset="sunset" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
        </Canvas>
      )}
    </div>
  )
}

export default Object
