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
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// .............................................................................
const scene = new THREE.Scene();

// .............................................................................
const axes = new THREE.AxesHelper( 50 );
scene.add( axes );

// .............................................................................
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

// .............................................................................
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 10000 );
camera.position.set( 10, 5, 10 );
scene.add( camera );

// .............................................................................
scene.add( new THREE.AmbientLight( 0x888888 ) );

// .............................................................................
const spot = new THREE.SpotLight( 0xffffff );
spot.angle = Math.PI / 8;
spot.penumbra = .1;
spot.castShadow = true;
spot.shadow.camera.near = 8;
spot.shadow.camera.far = 200;
spot.shadow.mapSize.width =
spot.shadow.mapSize.height = 1024;
spot.shadow.radius = 4;
spot.position.set( 40, 50, 20 );
scene.add( spot );
const spotShadowHelper = new THREE.CameraHelper( spot.shadow.camera );
scene.add( spotShadowHelper );

// .............................................................................
const sky = new THREE.Mesh(
	new THREE.SphereGeometry( 500, 32, 32 ),
	new THREE.MeshBasicMaterial( { color: 0x444477, side: THREE.BackSide } )
);
sky.position.set( 0, 0, 0 );
scene.add( sky );

// .............................................................................
const sphere = new THREE.Mesh(
	new THREE.SphereGeometry( 2.5, 32, 32 ),
	new THREE.MeshStandardMaterial( { color: 0x1e90ff, side: THREE.FrontSide } )
);
sphere.position.set( 13, 2.5, 0 );
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add( sphere );

// .............................................................................
const meshCube = new THREE.Mesh(
	new THREE.BoxGeometry( 5, 5, 5 ),
	new THREE.MeshStandardMaterial( { color: 0x1e90ff, side: THREE.FrontSide } )
);
meshCube.position.set( -6, 2.5, 0 );
meshCube.castShadow = true;
meshCube.receiveShadow = true;
scene.add( meshCube );

const meshCube2 = new THREE.Mesh(
	new THREE.BoxGeometry( 5, 5, 5 ),
	new THREE.MeshStandardMaterial( { color: 0x1e90ff, side: THREE.FrontSide } )
);
meshCube2.position.set( 8, 2.5, 0 );
meshCube2.castShadow = true;
meshCube2.receiveShadow = true;
scene.add( meshCube2 );

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
controls.update();

// .............................................................................

let x = 6;
let lightPos = 0;

function animate() {
	// x += .01;
	// meshCube2.position.set( x, 2.5, 0 );
	renderer.render( scene, camera );
	spot.position.set(
		Math.sin( lightPos ) * 50, 20,
		Math.cos( lightPos ) * 50 );
	lightPos += .025;
	requestAnimationFrame( animate );
}

animate();
