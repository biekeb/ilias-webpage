import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export const RotatingSphere = () => {
    const torusKnotGeometry1 = useMemo(() => new THREE.SphereGeometry(1, 64, 64), []);
    const coneGeometryRight = useMemo(() => {
        const geometry = new THREE.ConeGeometry(1, 2, 16, 16);
        geometry.rotateZ(Math.PI / 2);
        geometry.translate(-1.5, 0, 0)
        return geometry;
    }, []);
    const coneGeometryLeft = useMemo(() => {
        const geometry = new THREE.ConeGeometry(1, 2, 16, 16);
        geometry.rotateZ(-Math.PI / 2);
        geometry.translate(1.5, 0, 0)
        return geometry;
    }, []);


    const particlesRef = useRef();
    const currentOffsetFactor = useRef(1);
    const framecount = useRef(0);
    const particlesCount = torusKnotGeometry1.attributes.position.count * 2 + coneGeometryRight.attributes.position.count * 2;
    const sphereCount = torusKnotGeometry1.attributes.position.count
    const positions = useMemo(() => new Float32Array(particlesCount * 3), [particlesCount]);
    let initialpositions = useMemo(() => new Float32Array(particlesCount * 3), [particlesCount]);
    const nextPositions = useMemo(() => new Float32Array(particlesCount * 3), [particlesCount]);
    const lerpFactor = 100;
    const scroll = useScroll();

    useEffect(() => {
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
    }, []);

    const createTextSprite = (text, x, y) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;

        context.font = '50px Arial';
        context.fillStyle = '#ffbbff';
        context.fillText(text, 0, 50);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(1, 1, 1);
        sprite.position.set(x, y, 0);

        return sprite;
    };

    const getConeGeometry = (index) => {
        const count = coneGeometryRight.attributes.position.count
        const right = index > count
        const i = index % count
        let geometry = right ? coneGeometryRight : coneGeometryLeft
        const x = geometry.attributes.position.getX(i) + (right ? 2 : -2);
        const y = geometry.attributes.position.getY(i);
        const z = geometry.attributes.position.getZ(i);

        return { x, y, z }
    }

    const getSphereGeometry = (index) => {
        const count = torusKnotGeometry1.attributes.position.count
        const right = index > count
        const i = index % count
        const x = torusKnotGeometry1.attributes.position.getX(i) + (right ? 2 : -2);
        const y = torusKnotGeometry1.attributes.position.getY(i);
        const z = torusKnotGeometry1.attributes.position.getZ(i);

        return { x, y, z }
    }

    const getPositionAttribute = (index) => {
        if (index < sphereCount * 2) return getSphereGeometry(index);
        else {
            return getConeGeometry(index - torusKnotGeometry1.attributes.position.count * 2)
        }
    }

    // Initialize positions and velocities
    useEffect(() => {
        // for (let i = 0; i < particlesCount; i++) {
        //     const { x, y, z } = getPositionAttribute(i)
        //     positions[i * 3] = x;
        //     positions[i * 3 + 1] = y;
        //     positions[i * 3 + 2] = z;

        //     // Set next position as the next point in the sequence, wrapping around
        //     const nextIndex = (i + 1) % particlesCount;
        //     const newPos = getPositionAttribute(nextIndex)
        //     nextPositions[i * 3] = newPos.x;
        //     nextPositions[i * 3 + 1] = newPos.y;
        //     nextPositions[i * 3 + 2] = newPos.z;
        // }
        const sprite1 = createTextSprite('ilias', -1.9, -.2);
        const sprite2 = createTextSprite('Alis', 2.1, -.2);
        particlesRef.current.add(sprite1);
        particlesRef.current.add(sprite2);
    }, [particlesCount, torusKnotGeometry1, positions, nextPositions]);

    // Create particle geometry and material
    const particlesGeometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geom;
    }, [positions]);

    const particlesMaterial = useMemo(() => {
        return new THREE.PointsMaterial({
            color: '#ffffff',
            sizeAttenuation: true,
            size: 0.03,
            transparent: true,
            opacity: 0,
        });
    }, []);

    // Update particle positions in each frame
    useFrame(() => {
        const positionsAttr = particlesRef.current.geometry.attributes.position;
        if (particlesRef.current && scroll.offset > .725) {
            for (let i = 0; i < particlesCount; i++) {
                // Interpolate current position towards next position
                const lerpX = (nextPositions[i * 3] - initialpositions[i * 3]) / lerpFactor
                const lerpY = (nextPositions[i * 3 + 1] - initialpositions[i * 3 + 1]) / lerpFactor
                const lerpZ = (nextPositions[i * 3 + 2] - initialpositions[i * 3 + 2]) / lerpFactor
                positions[i * 3] += lerpX;
                positions[i * 3 + 1] += lerpY;
                positions[i * 3 + 2] += lerpZ;
            }
            if (framecount.current % 100 === 0) {
                for (let i = 0; i < particlesCount; i++) {
                    const nextIndex = (i + currentOffsetFactor.current) % particlesCount;
                    const newPos = getPositionAttribute(nextIndex)
                    nextPositions[i * 3] = newPos.x;
                    nextPositions[i * 3 + 1] = newPos.y;
                    nextPositions[i * 3 + 2] = newPos.z;
                    initialpositions = positions
                }
                currentOffsetFactor.current += 1
            }
            framecount.current += 1
        }
        if (scroll.offset > .55){
            if (particlesMaterial.opacity < 1) particlesMaterial.opacity += .001
            else particlesMaterial.transparent=false

        }
        positionsAttr.needsUpdate = true;
    });

    return (
        <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
    );
};


