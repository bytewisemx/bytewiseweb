import { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';
import { ShaderMaterial, SRGBColorSpace, TextureLoader, Vector2 } from 'three';
import { century, declination, equationOfTime } from 'solar-calculator';

import './HeroWorldGlobe.css';

type GlobePoint = {
  lat: number;
  lng: number;
  size: number;
  color: string;
};

type GlobeArc = {
  source: { lat: number; lng: number };
  target: { lat: number; lng: number };
};

const DAY_TEXTURE = 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg';
const NIGHT_TEXTURE = 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg';

const dayNightVertexShader = `
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const dayNightFragmentShader = `
  #define PI 3.141592653589793
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec2 sunPosition;
  uniform vec2 globeRotation;
  uniform float dayBoost;
  uniform float nightBoost;
  varying vec3 vNormal;
  varying vec2 vUv;

  float toRad(in float a) {
    return a * PI / 180.0;
  }

  vec3 Polar2Cartesian(in vec2 c) {
    float theta = toRad(90.0 - c.x);
    float phi = toRad(90.0 - c.y);
    return vec3(
      sin(phi) * cos(theta),
      cos(phi),
      sin(phi) * sin(theta)
    );
  }

  void main() {
    float invLon = toRad(globeRotation.x);
    float invLat = -toRad(globeRotation.y);
    mat3 rotX = mat3(
      1.0, 0.0, 0.0,
      0.0, cos(invLat), -sin(invLat),
      0.0, sin(invLat), cos(invLat)
    );
    mat3 rotY = mat3(
      cos(invLon), 0.0, sin(invLon),
      0.0, 1.0, 0.0,
      -sin(invLon), 0.0, cos(invLon)
    );
    vec3 rotatedSunDirection = rotX * rotY * Polar2Cartesian(sunPosition);
    float intensity = dot(normalize(vNormal), normalize(rotatedSunDirection));
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);
    float blendFactor = smoothstep(-0.28, 0.42, intensity);
    vec3 color = mix(nightColor.rgb * nightBoost, dayColor.rgb * dayBoost, blendFactor);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function sunPositionAt(dt: Date) {
  const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
  const t = century(dt);
  const longitude = ((day - dt.getTime()) / 864e5) * 360 - 180;
  return [longitude - equationOfTime(t) / 4, declination(t)] as const;
}

export default function HeroWorldGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const [globeMaterial, setGlobeMaterial] = useState<ShaderMaterial | undefined>(undefined);

  const points = useMemo<GlobePoint[]>(
    () => [
      { lat: 19.4326, lng: -99.1332, size: 0.34, color: '#7dd3fc' },
      { lat: 40.7128, lng: -74.006, size: 0.28, color: '#38bdf8' },
      { lat: 51.5074, lng: -0.1278, size: 0.24, color: '#bae6fd' },
      { lat: 1.3521, lng: 103.8198, size: 0.3, color: '#60a5fa' },
      { lat: -23.5505, lng: -46.6333, size: 0.26, color: '#93c5fd' }
    ],
    []
  );

  const arcs = useMemo<GlobeArc[]>(
    () => [
      { source: { lat: 19.4326, lng: -99.1332 }, target: { lat: 40.7128, lng: -74.006 } },
      { source: { lat: 19.4326, lng: -99.1332 }, target: { lat: 51.5074, lng: -0.1278 } },
      { source: { lat: 40.7128, lng: -74.006 }, target: { lat: 1.3521, lng: 103.8198 } },
      { source: { lat: 51.5074, lng: -0.1278 }, target: { lat: -23.5505, lng: -46.6333 } }
    ],
    []
  );

  useEffect(() => {
    let active = true;
    const loader = new TextureLoader();

    Promise.all([loader.loadAsync(DAY_TEXTURE), loader.loadAsync(NIGHT_TEXTURE)]).then(([dayTexture, nightTexture]) => {
      if (!active) {
        dayTexture.dispose();
        nightTexture.dispose();
        return;
      }

      dayTexture.colorSpace = SRGBColorSpace;
      nightTexture.colorSpace = SRGBColorSpace;

      const material = new ShaderMaterial({
        uniforms: {
          dayTexture: { value: dayTexture },
          nightTexture: { value: nightTexture },
          sunPosition: { value: new Vector2() },
          globeRotation: { value: new Vector2() },
          dayBoost: { value: 1.35 },
          nightBoost: { value: 1.2 }
        },
        vertexShader: dayNightVertexShader,
        fragmentShader: dayNightFragmentShader
      });

      materialRef.current = material;
      setGlobeMaterial(material);
    });

    return () => {
      active = false;
      materialRef.current?.dispose();
      materialRef.current = null;
      setGlobeMaterial(undefined);
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    const material = globeMaterial;
    if (!globe || !material) return undefined;

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.28;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.4;

    const syncRotation = () => {
      const camera = globe.camera();
      const { lng, lat } = globe.toGeoCoords(camera.position);
      material.uniforms.globeRotation.value.set(lng, lat);
    };

    const cycleStart = Date.now();
    const dayCycleMs = 180000;
    const cycleRatio = 86400000 / dayCycleMs;

    const updateSun = () => {
      const elapsed = Date.now() - cycleStart;
      const cycleDate = new Date(cycleStart + elapsed * cycleRatio);
      const [sunLng, sunLat] = sunPositionAt(cycleDate);
      material.uniforms.sunPosition.value.set(sunLng, sunLat);
    };

    let rafId = 0;
    const tick = () => {
      syncRotation();
      updateSun();
      rafId = requestAnimationFrame(tick);
    };

    syncRotation();
    updateSun();
    controls.addEventListener('change', syncRotation);

    rafId = requestAnimationFrame(tick);

    globe.pointOfView({ lat: 18, lng: -30, altitude: 2.2 }, 0);

    return () => {
      controls.removeEventListener('change', syncRotation);
      cancelAnimationFrame(rafId);
    };
  }, [globeMaterial]);

  return (
    <div className="hero-world-globeWrap">
      <div className="hero-world-glow" aria-hidden="true" />
      <Globe
        ref={globeRef}
        width={320}
        height={320}
        globeMaterial={globeMaterial}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#93c5fd"
        atmosphereAltitude={0.16}
        animateIn
        waitForGlobeReady
        enablePointerInteraction={false}
        showGraticules={false}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.028}
        pointRadius="size"
        pointsMerge={false}
        arcsData={arcs}
        arcStartLat={(d: object) => (d as GlobeArc).source.lat}
        arcStartLng={(d: object) => (d as GlobeArc).source.lng}
        arcEndLat={(d: object) => (d as GlobeArc).target.lat}
        arcEndLng={(d: object) => (d as GlobeArc).target.lng}
        arcColor={() => ['rgba(186, 230, 253, 0.25)', 'rgba(125, 211, 252, 0.95)']}
        arcStroke={1}
        arcDashLength={0.24}
        arcDashGap={0.52}
        arcDashAnimateTime={3200}
        arcsTransitionDuration={0}
        rendererConfig={{ antialias: true, alpha: true }}
      />
    </div>
  );
}
