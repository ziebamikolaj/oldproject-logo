import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { OrbitControls } from "./libs/OrbitControls.js";
function main() {
	let root;
	let camera, scene, renderer;
	let controls;
	init();
	animate();

	function init() {
		let canvas = document.querySelector("#c");
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
		// camera setup
		camera.position.set(0.14330754290860787, 0.19957375494741503, 0.20968796118275146);
		let positionx = 0.04097498953342438;
		let positiony = 0.02954433618791578;
		let positionz = 0.08118166029453278;
		camera.near = 0.01;
		camera.far = 1000.0;
		controls = new OrbitControls(camera, renderer.domElement);
		controls.dispose();
		controls.update();
		camera.setViewOffset(window.innerWidth, window.innerHeight, window.innerWidth / -7, window.innerHeight / 10.8, window.innerWidth, window.innerHeight);

		// resize
		window.addEventListener("resize", onWindowResize, false);
		function onWindowResize(event) {
			camera.aspect = window.innerWidth / window.innerHeight;
			let x = window.innerWidth / window.innerHeight;
			if (window.innerWidth / window.innerHeight < 8) {
				camera.fov = 0.658412 * Math.pow(x, 2) - 11.4313 * x + 57.1287;
			} else if (window.innerWidth / window.innerHeight > 8) {
				camera.fov = 0;
			}
			camera.setViewOffset(window.innerWidth, window.innerHeight, window.innerWidth / -7, window.innerHeight / 10.8, window.innerWidth, window.innerHeight);
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.render(scene, camera);
		}
		{
			//DirectionalLight
			let color = 0xffffff;
			let intensity = 0.6;
			let light = new THREE.DirectionalLight(color, intensity);
			light.position.set(-500, 500, 500);
			light.target.position.set(positionx, positiony, positionz);
			scene.add(light);
			scene.add(light.target);
		}
		{
			//DirectionalLight2
			let color = 0xffffff;
			let intensity = 0.6;
			let light = new THREE.DirectionalLight(color, intensity);
			light.position.set(500, 500, 500);
			light.target.position.set(positionx, positiony, positionz);
			scene.add(light);
			scene.add(light.target);
		}
		{
			//AmbientLight
			const light = new THREE.AmbientLight(0x404040, 0.5);
			light.position.set(10, 5, -10);
			scene.add(light);
		}

		{
			//plane
			let loader = new THREE.TextureLoader();
			let texture = loader.load("./css/background.jpg");
			let geometry = new THREE.PlaneBufferGeometry();
			let material = new THREE.MeshBasicMaterial({ map: texture, opacity: 1, transparent: true });
			let mesh = new THREE.Mesh(geometry, material);
			mesh.rotateX(-Math.PI / 2);
			mesh.rotateZ(-Math.PI / 16);
			mesh.position.x = 0.19;
			mesh.position.z = 0.008;
			mesh.position.y = 0.01;
			mesh.scale.set(0.6, 0.6, 0.1);
			mesh.rotation.z = 0.2;
			scene.add(mesh);
		}
		{
			let gltfloader = new GLTFLoader();
			gltfloader.load("./models/model.glb", function (gltf) {
				//LogoImport
				gltf.scene.position.set(0, 0, 0);
				root = gltf.scene;
				root.children[0].position.x = 0.1675;
				root.children[0].position.y = 0.055;
				// colors
				root.children[0].children[0].encoding = THREE.LinearEncoding;
				root.children[0].children[1].encoding = THREE.LinearEncoding;
				root.children[0].children[0].material = new THREE.MeshPhongMaterial({ color: 0x212124 });
				root.children[0].children[0].material.shininess = 50;
				root.children[0].children[1].material = new THREE.MeshPhongMaterial({ color: 0xe0004d });
				root.children[0].children[1].material.shininess = 50;
				// geometry
				root.children[0].children[0].geometry.computeVertexNormals(true);
				root.children[0].children[1].geometry.computeVertexNormals(true);
				root.children[0].scale.set(1.4, 1.4, 1.4);
				// light
				let color = 0xffffff;
				let intensity = 0.1;
				let light = new THREE.SpotLight(color, intensity);
				light.target.position.set(root.children[0].position.x, root.children[0].position.y, root.children[0].position.z);
				light.position.set(0, 1, 0);
				root.children[0].add(light);
				root.children[0].add(light.target);
				// else
				root.children[0].rotation.x = 0.1;
				root.children[0].rotation.z = 0;
				root.children[0].rotation.y = 0.1;
				scene.add(root);
			});
		}
		// Effect on mouse moving
		document.addEventListener("mousemove", onDocumentMouseMove, false);
		function onDocumentMouseMove(event) {
			controls.handleMouseMoveRotate(event);
		}
	}
	function animate() {
		requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	}
}
main();
