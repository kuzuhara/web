// 家具生成装置
function assembleFurniture() {
	var sumVector = new THREE.Vector3(0,0,0);	// 位置ベクトル
	var fullMass = 0;		// 全質量
	for(var i = 0; i < arguments.length; i++) {
		fullMass += arguments[i]._physijs.mass;
		var tempPosition = new THREE.Vector3().copy(arguments[i].position);
		tempPosition.multiplyScalar(arguments[i]._physijs.mass);
		sumVector.add(tempPosition);
	}
	sumVector.divideScalar(-fullMass);
	var _furniture =  new Physijs.BoxMesh(
		new THREE.BoxGeometry(0, 0, 0),
		new Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xB16833}),
			0,
			0
		),
	0.000001);
	for(var i = 0; i < arguments.length; i++) {
		_furniture.add(arguments[i]);
	}
	_furniture.position.copy(sumVector);
	var furniture =  new Physijs.BoxMesh(
		new THREE.BoxGeometry(0, 0, 0),
		new Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xB16833}),
			arguments[0]._physijs.friction,		// 摩擦係数
			arguments[0]._physijs.restitution	// 反発係数
		),
	fullMass);

	furniture.add(_furniture);
	return furniture;
}

// 家具生成装置
function assembleFurnitureArray(parts) {
	var sumVector = new THREE.Vector3(0,0,0);	// 位置ベクトル
	var fullMass = 0;		// 全質量
	for(var i = 0; i < parts.length; i++) {
		fullMass += parts[i]._physijs.mass;
		var tempPosition = new THREE.Vector3().copy(parts[i].position);
		tempPosition.multiplyScalar(parts[i]._physijs.mass);
		sumVector.add(tempPosition);
	}
	sumVector.divideScalar(-fullMass);
	var _furniture =  new Physijs.BoxMesh(
		new THREE.BoxGeometry(0, 0, 0),
		new Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xB16833}),
			0,
			0
		),
	0.000001);
	for(var i = 0; i < parts.length; i++) {
		_furniture.add(parts[i]);
	}
	_furniture.position.copy(sumVector);
	var furniture =  new Physijs.BoxMesh(
		new THREE.BoxGeometry(0, 0, 0),
		new Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xB16833}),
			parts[0]._physijs.friction,	// 摩擦係数
			parts[0]._physijs.restitution	// 反発係数
		),
	fullMass);
//	console.log("full:",fullMass);
	furniture.add(_furniture);

	return furniture;
}
