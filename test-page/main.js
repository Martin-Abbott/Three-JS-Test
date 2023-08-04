import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
	color: "ivory",
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 15, 10);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 0.075);
light2.position.set(0, 0, 5);
scene.add(light2);

const dims = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(45, dims.width / dims.height);
camera.position.z = 18;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(dims.width, dims.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 12;

window.addEventListener("resize", () => {
	dims.width = window.innerWidth;
	dims.height = window.innerHeight;
	camera.updateProjectionMatrix();
	camera.aspect = dims.width / dims.height;
	renderer.setSize(dims.width, dims.height);
});

const resizeLoop = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(resizeLoop);
};

resizeLoop();

const timeline = gsap.timeline({ defaults: { duration: 1.5 } });

timeline.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
timeline.fromTo(".intro", { opacity: 0 }, { opacity: 1 });
timeline.fromTo("h2, .about", { opacity: 0 }, { opacity: 1 });
