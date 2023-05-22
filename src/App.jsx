import { onMount } from "solid-js";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

const App = () => {
  onMount(() => {
    ref.appendChild(renderer.domElement);

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 50;
    controls.zoomSpeed = 1;
    controls.panSpeed = 1;
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      render();
    };
    const render = () => {
      renderer.render(scene, camera);
    };

    animate();
  });

  let ref;

  // creating scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe5e5e5);

  // creating camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 256);
  camera.position.set(3, 3, 3);
  camera.lookAt(0, 0, 0);

  // creating renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(1024, 1024);

  // creating mesh
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  boxGeometry.computeVertexNormals();
  const boxMaterial = new THREE.MeshNormalMaterial();
  const box = new THREE.InstancedMesh(
    boxGeometry,
    boxMaterial,
    Math.pow(10, 3)
  );
  scene.add(box);

  return <div ref={ref}></div>;
};

export default App;
