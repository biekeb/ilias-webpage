import { useMemo, useState, useRef, useEffect } from "react";
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
    let randomPositions = useMemo(() => new Float32Array(particlesCount * 3), [particlesCount]);
    const nextPositions = useMemo(() => new Float32Array(particlesCount * 3), [particlesCount]);
    const lerpFactor = 50;
    const scroll = useScroll();
    const [sprite, setSprite] = useState()


    useEffect(() => {
        if (!particlesRef.current) return;
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        positions.forEach((p, i) => randomPositions[i] = p);
        positions.forEach((p, i) => initialpositions[i] = p);
        positions.forEach((p, i) => nextPositions[i] = p);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;
        context.font = '20px Arial';
        context.fillStyle = '#ffbbff';
        context.fillText("Alis", 0, 50);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);

        const canvas2 = document.createElement('canvas');
        const context2 = canvas2.getContext('2d');
        canvas2.width = 50;
        canvas2.height = 50;
        context2.font = '20px Arial';
        context2.fillStyle = '#ffbbff';
        context2.fillText("Ilias", 0, 50);
        const texture2 = new THREE.CanvasTexture(canvas2);
        const spriteMaterial2 = new THREE.SpriteMaterial({ map: texture2 });
        const sprite2 = new THREE.Sprite(spriteMaterial2);

        particlesRef.current.userData.spriteMaterial = [spriteMaterial, spriteMaterial2];

        spriteMaterial.opacity = 0;
        spriteMaterial2.opacity = 0;
        sprite.position.set(-1.9, .4, 0);
        sprite2.position.set(2.1, .4, 0);
        particlesRef.current.add(sprite);
        particlesRef.current.add(sprite2);
    }, [particlesRef.current]);

    // useEffect(() => {
    //     if (!canvas || !context) return;;
    //     // const sprite1 = createTextSprite('ilias', -1.9, -.2);
    //     const sprite2 = createTextSprite('Alis', 2.1, -.2);
    //     // particlesRef.current.add(sprite1);
    //     particlesRef.current.add(sprite2);
    // }, [canvas, context])

    // const createTextSprite = (text, x, y) => {

    //     context.fillText(text, 0, 50);

    //     const texture = new THREE.CanvasTexture(canvas);
    //     const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    //     const sprite = new THREE.Sprite(spriteMaterial);
    //     sprite.scale.set(1, 1, 1);
    //     sprite.position.set(x, y, 0);

    //     return sprite;
    // };

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
        if (scroll.offset < .7) return { x: randomPositions[index * 3], y: randomPositions[index * 3 + 1], z: randomPositions[index * 3 + 2] }
        if (index < sphereCount * 2) return getSphereGeometry(index);
        else {
            return getConeGeometry(index - torusKnotGeometry1.attributes.position.count * 2)
        }
    }

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
        if (!particlesRef.current) return;
        const positionsAttr = particlesRef.current.geometry.attributes.position;
        // if (particlesRef.current && scroll.offset > .725) {
        const getCurrentPosition = (offset, i) => {
            return (nextPositions[i * 3 + offset] - initialpositions[i * 3 + offset]) / lerpFactor
        }
        for (let i = 0; i < particlesCount; i++) {
            // Interpolate current position towards next position
            const lerpX = getCurrentPosition(0, i)
            const lerpY = getCurrentPosition(1, i)
            const lerpZ = getCurrentPosition(2, i)
            positions[i * 3] += lerpX;
            positions[i * 3 + 1] += lerpY;
            positions[i * 3 + 2] += lerpZ;
        }
        if (framecount.current % 100 === 0) {
            for (let i = 0; i < particlesCount; i++) {
                const nextIndex = (i + currentOffsetFactor.current) % particlesCount;
                const newPos = getPositionAttribute(scroll.offset > .7 ? nextIndex : i)
                nextPositions[i * 3] = newPos.x;
                nextPositions[i * 3 + 1] = newPos.y;
                nextPositions[i * 3 + 2] = newPos.z;
                initialpositions = positions
            }
            currentOffsetFactor.current += 1
        }
        framecount.current += 1
        // }
        if (scroll.offset > .45) {
            if (particlesMaterial.opacity < 1) particlesMaterial.opacity += .001
            else particlesMaterial.transparent = false
        } else {
            particlesMaterial.opacity = Math.max(particlesMaterial.opacity-.001,0)
        }
        if (scroll.offset > .7) {
            particlesRef.current.userData.spriteMaterial.forEach(s => s.opacity += .01);
        }
        positionsAttr.needsUpdate = true;
    });

    return (
        <>
            <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
        </>

    );
};


