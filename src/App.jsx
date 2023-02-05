import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
  // creating scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe5e5e5);

  // creating camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 256);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);

  // creating renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(512, 512);

  // creating Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // add 3D object to scene
  // const cubeGeometry = new THREE.BoxGeometry(128, 128, 128);
  // const cubeMaterial = new THREE.MeshNormalMaterial();
  // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // scene.add(cube);

  // grid

  const gridGeometry = new THREE.BoxGeometry(1, 1, 1);
  const gridMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 1,
    scale: 1,
    dashSize: 1,
    gapSize: 1,
  });
  const grid = new THREE.InstancedMesh(
    gridGeometry,
    gridMaterial,
    Math.pow(10, 3)
  );

  let i = 0;

  const matrix = new THREE.Matrix4();

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      for (let z = 0; z < 10; z++) {
        matrix.setPosition(5 - x, 5 - y, 5 - z);

        grid.setMatrixAt(i, matrix);

        i++;
      }
    }
  }

  scene.add(grid);

  // callback update dom and return it
  const getThreeDom = () => {
    requestAnimationFrame(getThreeDom);
    renderer.render(scene, camera);

    return renderer.domElement;
  };

  return <div>{getThreeDom()}</div>;
};

export default App;
