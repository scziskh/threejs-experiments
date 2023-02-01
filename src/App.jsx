import * as THREE from "three";
import { PerspectiveCamera } from "three";

const App = () => {
  // new scene
  const scene = new THREE.Scene();

  // new camera (field of view, camera aspect ratio, camera frustum near plane, camera frustum far plane)
  const camera = new PerspectiveCamera(90, 4 / 3, 0.1, 10000);

  // new WebGlRenderer
  const renderer = new THREE.WebGLRenderer();

  // size of renderer
  renderer.setSize(800, 600);

  camera.position.z = 2;

  // create and add mesh (cube) to scene
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.1,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  renderer.render(scene, camera);

  // domElement renderer
  const { domElement } = renderer;

  return <div>{domElement}</div>;
};

export default App;
