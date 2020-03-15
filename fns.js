"use strict";

const FNS = Object.freeze( {

	emptyObject: Object.freeze( {} ),

	createGeometry( { type, size: sz } ) {
		switch ( type ) {
			case "sphere":
				return new THREE.SphereGeometry( sz / 2, 32, 32 );
			case "box":
				return typeof sz === "number"
					? new THREE.BoxGeometry( sz, sz, sz )
					: new THREE.BoxGeometry( sz.x, sz.y, sz.z );
		}
	},

	createBox( opt ) {
		return FNS.createMesh( { ...opt, type: "box" } );
	},

	createSphere( opt ) {
		return FNS.createMesh( { ...opt, type: "sphere" } );
	},

	createMesh( opt ) {
		const {
				color = 0x1e90ff,
				position: pos = FNS.emptyObject,
				rotation: rot = FNS.emptyObject,
			} = opt,
			geo = FNS.createGeometry( opt ),
			mat = new THREE.MeshPhongMaterial( {
				color: new THREE.Color( color ),
				emissive: 0x000000,
				specular: 0xffffff,
				shininess: opt.shininess || 0,
				side: THREE.FrontSide,
			} ),
			mesh = new THREE.Mesh( geo, mat );

		mesh.position.set(
			pos.x || 0,
			pos.y || 0,
			pos.z || 0 );
		mesh.rotation.set(
			THREE.Math.degToRad( rot.x || 0 ),
			THREE.Math.degToRad( rot.y || 0 ),
			THREE.Math.degToRad( rot.z || 0 ) );
		mesh.castShadow =
		mesh.receiveShadow = true;
		return mesh;
	},

} );
