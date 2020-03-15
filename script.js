"use strict";

const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

window.onresize = () => {
	const w = window.innerWidth,
		h = window.innerHeight;

	renderer.setSize( w, h );
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
};

// .............................................................................
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// .............................................................................
const scene = new THREE.Scene();

// .............................................................................
const axes = new THREE.AxesHelper( 50 );
scene.add( axes );

// .............................................................................
/*
const loader = new THREE.GLTFLoader();
// const loader = new THREE.FBXLoader();
const dracoLoader = new THREE.DRACOLoader();

// dracoLoader.setDecoderPath( "three/libs/draco/" );

// loader.setDRACOLoader( dracoLoader );
loader.load( "models/BeachBabe.gltf",
	gltf => {
		const obj = gltf.scene;

		console.log( obj )
		obj.rotation.y = THREE.Math.degToRad( 90 );
		obj.position.set( 0, 0, 5 );
		obj.traverse( node => {
			if ( node.isMesh ) {
				node.castShadow = true;
				node.receiveShadow = true;
			}
		} );
		scene.add( obj );
	},
	xhr => { console.log( `${ xhr.loaded / xhr.total * 100 }% loaded` ); },
	error => { console.log( "An error happened", error ); }
);
*/

// .............................................................................
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 10000 );
camera.position.set( -30, 20, -30 );
scene.add( camera );

// .............................................................................
scene.add( new THREE.AmbientLight( 0x888888 ) );

// .............................................................................
const spotTop = new THREE.DirectionalLight( 0xffffff, .2 );
spotTop.position.set( 0, 50, 0 );
spotTop.target.position.x = 10;
spotTop.castShadow = true;
spotTop.shadow.camera.near = .5;
spotTop.shadow.camera.far = 200;
spotTop.shadow.camera.left = -100;
spotTop.shadow.camera.right = 100;
spotTop.shadow.camera.top = 100;
spotTop.shadow.camera.bottom = -100;
spotTop.shadow.mapSize.width =
spotTop.shadow.mapSize.height = 512;
const spotTopHelper = new THREE.CameraHelper( spotTop.shadow.camera );
scene.add( spotTop, spotTop.target, spotTopHelper );

// .............................................................................
const spot = new THREE.SpotLight( 0xffffff, .3 );
spot.angle = Math.PI / 8;
spot.penumbra = .1;
spot.castShadow = true;
spot.shadow.camera.near = 8;
spot.shadow.camera.far = 200;
spot.shadow.mapSize.width =
spot.shadow.mapSize.height = 1024;
spot.shadow.radius = 4;
spot.position.set( 40, 50, 20 );
const spotShadowHelper = new THREE.CameraHelper( spot.shadow.camera );
scene.add( spot, spotShadowHelper );

// .............................................................................
const sky = new THREE.Mesh(
	new THREE.SphereGeometry( 500, 32, 32 ),
	new THREE.MeshBasicMaterial( { color: 0x444477, side: THREE.BackSide } )
);
sky.position.set( 0, 0, 0 );
scene.add( sky );

// .............................................................................
const spheres = new THREE.Group();
spheres.add(
	FNS.createSphere( { size: 4,   position: { x:  0,   y: 2,    z: 0   }, shininess: 8,  color: "hsl(339, 60%, 60%)" } ),
	FNS.createSphere( { size: 2,   position: { x:  4,   y: 1,    z: 0   }, shininess: 8,  color: "hsl(339, 70%, 50%)" } ),
	FNS.createSphere( { size: 1.8, position: { x:  5,   y: .9,   z: 3   }, shininess: 30, color: "hsl(339, 100%, 40%)" } ),
	FNS.createSphere( { size: 1,   position: { x:  3,   y: 0.5,  z: 3   }, shininess: 5,  color: "hsl(339, 80%, 40%)" } ),
	FNS.createSphere( { size: 0.5, position: { x:  1,   y: 0.25, z: 4.5 }, shininess: 5,  color: "hsl(339, 90%, 30%)" } ),
	FNS.createSphere( { size: 0.5, position: { x:  1.6, y: 0.25, z: 4.2 }, shininess: 5,  color: "hsl(339, 90%, 30%)" } ),
	FNS.createSphere( { size: 0.5, position: { x:  2.5, y: 0.25, z: 5   }, shininess: 5,  color: "hsl(339, 90%, 30%)" } ),
);
spheres.position.set( 0, 0, -10 );
scene.add( spheres );

// .............................................................................
const cubes = new THREE.Group();
cubes.add(
	FNS.createBox( { size: 1, position: { x:  0,   y: 0.5, z:  0   }, rotation: { y:   5 }, color: "hsl(210, 100%, 56%)" } ),
	FNS.createBox( { size: 1, position: { x: -1.1, y: 0.5, z:  0.5 }, rotation: { y:  10 }, color: "hsl(210, 100%, 50%)" } ),
	FNS.createBox( { size: 1, position: { x: -1.1, y: 0.5, z: -0.8 }, rotation: { y: -25 }, color: "hsl(210, 100%, 45%)" } ),
	FNS.createBox( { size: 1, position: { x:  0.5, y: 0.5, z:  1.2 }, rotation: { y:  25 }, color: "hsl(210, 100%, 40%)" } ),
	FNS.createBox( { size: 1, position: { x:  0.9, y: 0.5, z: -1.2 }, rotation: { y: -40 }, color: "hsl(210, 100%, 60%)" } ),
	FNS.createBox( { size: 1, position: { x:  1.5, y: 0.5, z:  0   }, rotation: { y: -20 }, color: "hsl(210, 100%, 65%)" } ),
	FNS.createBox( { size: 1, position: { x:  1.7, y: 0.5, z:  2.1 }, rotation: { y:  70 }, color: "hsl(210, 100%, 58%)" } ),
	FNS.createBox( { size: 1, position: { x: -1.7, y: 0.5, z: -2.1 }, rotation: { y:  50 }, color: "hsl(210, 100%, 62%)" } ),
	FNS.createBox( { size: 1, position: { x: -0.2, y: 0.5, z: -1.8 }, rotation: { y: -30 }, color: "hsl(210, 100%, 52%)" } ),
	FNS.createBox( { size: 1, position: { x: -0.5, y: 1.5, z:  0   }, rotation: { y:  40 }, color: "hsl(210, 100%, 48%)" } ),
	FNS.createBox( { size: 1, position: { x:  0.8, y: 1.5, z: -0.5 }, rotation: { y: -10 }, color: "hsl(210, 100%, 43%)" } ),
	FNS.createBox( { size: 1, position: { x: -0.4, y: 1.5, z: -1.5 }, rotation: { y:  30 }, color: "hsl(210, 100%, 61%)" } ),
	FNS.createBox( { size: 1, position: { x: -0.2, y: 2.5, z: -0.6 }, rotation: { y:  60 }, color: "hsl(210, 100%, 52%)" } ),
);
cubes.position.set( -10, 0, 0 );
scene.add( cubes );

// .............................................................................
const mirrorBox = FNS.createBox( { size: { x: 21, y: 6, z: 1 }, position: { x: 0, y: 3, z: 0 }, color: "rgb(128, 128, 128)" } );
const mirrorRefl = new THREE.Reflector( new THREE.PlaneBufferGeometry( 20, 5, 2 ),
	{
		textureWidth: window.innerWidth * window.devicePixelRatio,
		textureHeight: window.innerHeight * window.devicePixelRatio,
		recursion: 1,
		// color: 0xffffff,
		// clipBias: 0.003,
	} );
mirrorRefl.position.set( 0, 3, .51 );
const mirror = new THREE.Group();
mirror.add( mirrorBox, mirrorRefl );
mirror.position.set( 10, 0, 10 );
mirror.rotation.y = THREE.Math.degToRad( -135 );
scene.add( mirror );

// const cubeCamera = new THREE.CubeCamera( 1, 100000, 128 );
// scene.add( cubeCamera );
// const cube1 = new THREE.Mesh(
// 	new THREE.BoxGeometry( 5, 5, 5 ),
// 	new THREE.MeshBasicMaterial( { envMap: cubeCamera.renderTarget.texture } )
// );
// cube1.position.set( 8, 2.5, 0 );
// cube1.castShadow = true;
// cube1.receiveShadow = true;
// cubeCamera.position.copy( cube1.position );
// scene.add( cube1 );

// .............................................................................
const meshPlane = new THREE.Mesh(
	new THREE.PlaneBufferGeometry( 100, 100, 2 ),
	new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide } )
);
meshPlane.rotation.x = THREE.Math.degToRad( 90 );
meshPlane.receiveShadow = true;
scene.add( meshPlane );

// .............................................................................
document.body.append( renderer.domElement );
window.onresize();

// .............................................................................
const controls = new THREE.OrbitControls( camera, renderer.domElement );

// .............................................................................

let x = 6;
let lightPos = 0;

function animate() {
	stats.begin();

	spot.position.set(
		Math.sin( lightPos ) * 50, 20,
		Math.cos( lightPos ) * 50 );
	lightPos += .025;

	// cube1.visible = false;
	// cubeCamera.update( renderer, scene );
	// cube1.visible = true;

	renderer.render( scene, camera );

	stats.end();
	requestAnimationFrame( animate );
}

animate();
