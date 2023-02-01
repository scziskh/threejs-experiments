import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const App = () => {
  // new scene
  const scene = new THREE.Scene();

  // new camera (field of view, camera aspect ratio, camera frustum near plane, camera frustum far plane)
  const camera = new THREE.PerspectiveCamera(90, 4 / 3, 0.1, 10000);

  // new WebGlRenderer
  const renderer = new THREE.WebGLRenderer();

  // size of renderer
  renderer.setSize(800, 600);

  // set camera position
  camera.position.set(0, 0, 5);

  // set camera look (point in center screen)
  camera.lookAt(1, 1, 1);

  // create and add mesh (cube) to scene
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.1,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  // load object GLB
  const loader = new GLTFLoader();

  loader.load(
    "/model.glb",
    (glbf) => {
      scene.add(glbf.scene);
      console.log({ glbf });
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error(error);
    }
  );

  // rotate scene
  scene.rotateX(0.5);
  scene.rotateZ(0.5);

  // background color
  scene.background = new THREE.Color(0xe0e0e0);

  // render
  renderer.render(scene, camera);

  // domElement of renderer
  const { domElement } = renderer;

  return <div>{domElement}</div>;
};

export default App;
