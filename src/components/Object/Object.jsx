// Object.jsx
import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const BoxModel = () => {
  const [object, setObject] = useState(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/');
    mtlLoader.load('box.mtl', (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('/');
      objLoader.load('box.obj', (obj) => {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        setObject(obj);
      });
    });
  }, []);

  return object ? (
    <primitive
      object={object}
      scale={0.1}
      position={[0, -0.4, 0]}
      rotation={[0.3, Math.PI / 5, 0]}
    />
  ) : null;
};

const Object = () => {
  return (
    <div className=" min-w-[60px] min-h-[60px]">
      <Canvas shadows camera={{ position: [2, 1.5, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <BoxModel />
        </Suspense>
        <ContactShadows position={[0, -0.7, 0]} opacity={0.4} scale={5} blur={1.5} far={1.5} />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};


export default Object;
