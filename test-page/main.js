import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import atmosVertex from "./shaders/atmosVertex.glsl?raw";
import atmosFragment from "./shaders/atmosFragment.glsl?raw";

const dims = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
};

const mouse = {
	x: 0,
	y: 0,
};

const scene = new THREE.Scene();

const earth = new THREE.Mesh(
	new THREE.SphereGeometry(3, 64, 64),
	new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			earthMap: {
				value: new THREE.TextureLoader().load("./img/earth-map.jpg"),
			},
		},
	})
);

scene.add(earth);

const atmosphere = new THREE.Mesh(
	new THREE.SphereGeometry(3.3, 70, 70),
	new THREE.ShaderMaterial({
		vertexShader: atmosVertex,
		fragmentShader: atmosFragment,
		blending: THREE.AdditiveBlending,
		side: THREE.BackSide,
	})
);

scene.add(atmosphere);

const starGeometry = new THREE.BufferGeometry();

const starMaterial = new THREE.PointsMaterial({
	color: 0xfdf4dc,
});

const starPositions = [];

for (let i = 0; i < 5000; i++) {
	const x = (Math.random() - 0.5) * 1500;
	const y = (Math.random() - 0.5) * 1500;
	const z = (Math.random() - 0.5) * 1500;
	starPositions.push(x, y, z);
}

starGeometry.setAttribute(
	"position",
	new THREE.Float32BufferAttribute(starPositions, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

// const light1 = new THREE.DirectionalLight(0xffffff, 1);
// light1.position.set(0, 5, 10);
// scene.add(light1);

// const light2 = new THREE.DirectionalLight(0xffffff, 0.15);
// light2.position.set(0, 0, 5);
// scene.add(light2);

// const light3 = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(light3);

const camera = new THREE.PerspectiveCamera(45, dims.width / dims.height);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(dims.width, dims.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

window.addEventListener("resize", () => {
	dims.width = document.documentElement.clientWidth;
	dims.height = document.documentElement.clientHeight;
	camera.updateProjectionMatrix();
	camera.aspect = dims.width / dims.height;
	renderer.setSize(dims.width, dims.height);
});

addEventListener("mousemove", (event) => {
	mouse.x = (event.clientX / document.documentElement.clientWidth) * 2 - 1;
	mouse.y = -(event.clientY / document.documentElement.clientHeight) * 2 + 1;
});

screen.orientation.addEventListener("change", () => {
	window.location.reload();
	// dims.width = document.documentElement.clientWidth;
	// dims.height = document.documentElement.clientHeight;
	// console.log(dims.width, dims.height);
	// renderer.setSize(dims.width, dims.height);
	// camera.updateProjectionMatrix();
	// camera.aspect = dims.width / dims.height;
});

const resizeLoop = () => {
	controls.update();
	renderer.render(scene, camera);
	gsap.to(scene.rotation, {
		x: -mouse.y * 0.5,
		y: mouse.x * 0.5,
		duration: 1,
	});
	window.requestAnimationFrame(resizeLoop);
};

resizeLoop();

const timeline = gsap.timeline({ defaults: { duration: 1.5 } });

timeline.fromTo(
	[earth.scale, atmosphere.scale],
	{ x: 0, y: 0, z: 0 },
	{ x: 1, y: 1, z: 1 }
);
timeline.fromTo(".intro", { opacity: 0 }, { opacity: 1 });
timeline.fromTo("h2, .about", { opacity: 0 }, { opacity: 1 });
