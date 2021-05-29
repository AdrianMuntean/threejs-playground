import './style.css'

import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let torusRotation = { x: 0.01, y: 0.005, z: 0.01 };
let menuOpened = false;

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new Three.TorusGeometry(10, 3, 16, 100);
const material = new Three.MeshStandardMaterial({ color: 0x3651AC })
const torus = new Three.Mesh(geometry, material);

scene.add(torus);
const pointLight = new Three.PointLight(0xFFFFFF);
pointLight.position.set(10, 10, 10);

const ambientLight = new Three.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);
const lightHelper = new Three.PointLightHelper(pointLight);
// scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);
  torus.rotation.x += torusRotation.x;
  torus.rotation.y += torusRotation.y;
  torus.rotation.z += torusRotation.z;
  controls.update();

  renderer.render(scene, camera);
};

const addStar = () => {
  const geometry = new Three.SphereGeometry(0.25, 24, 24);
  const material = new Three.MeshStandardMaterial({ color: 0xFFFFFF });
  const star = new Three.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};

Array(200).fill().forEach(addStar);
const spaceTexture = new Three.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

const moonTexture = new Three.TextureLoader().load('moon.jpeg');
const normalTexture = new Three.TextureLoader().load('normal.jpeg');
const moon = new Three.Mesh(
  new Three.SphereGeometry(3, 32, 32),
  new Three.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
moon.position.set(10, 10, 10);
scene.add(moon);

const moveCamera = () => {

}

const buttonX = document.getElementsByClassName('incX')[0];
buttonX.addEventListener('click', () => { torusRotation.x += 0.01; });
const buttonY = document.getElementsByClassName('incY')[0];
buttonY.addEventListener('click', () => { torusRotation.y += 0.001; });
const buttonZ = document.getElementsByClassName('incZ')[0];
buttonZ.addEventListener('click', () => { torusRotation.z += 0.01; });
const menuButton = document.getElementById('menu');
const closeButton = document.getElementById('close');
menuButton.addEventListener('click', () => {
  [...document.getElementsByClassName("button")].forEach(button => button.style.display = 'block');
  menuButton.style.display = 'none';
  closeButton.style.display = 'block';
});
closeButton.addEventListener('click', () => {
  [...document.getElementsByClassName("button")].forEach(button => button.style.display = 'none');

  menuButton.style.display = 'block';
  closeButton.style.display = 'none';
});

animate();