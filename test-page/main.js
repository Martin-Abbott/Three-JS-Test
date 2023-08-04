import * as THREE from "three";

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
renderer.render(scene, camera);

window.addEventListener("resize", () => {
	dims.width = window.innerWidth;
	dims.height = window.innerHeight;
	camera.updateProjectionMatrix();
	camera.aspect = dims.width / dims.height;
	renderer.setSize(dims.width, dims.height);
});

const resizeLoop = () => {
	renderer.render(scene, camera);
	window.requestAnimationFrame(resizeLoop);
};

resizeLoop();
