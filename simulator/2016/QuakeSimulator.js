'use strict';

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var initScene, render, renderer, scene, camera, ball, gv, room, data, test;

var finfo=[];//家具情報
var rinfo;//部屋情報

var target_z=0;

var roomname="living";
var roomname="kitchen";
var roomname="student";

var lightstandlist=[];
var nonuniformitemslist=[];
var furniturelist = [];
var furnitureslist = [];
var furnitureslist2 = [];

var camera_theta;//仰角
var camera_phi;//方位角
var camera_r;


//モデルの変数
var model_chest, model_desk, model_bookshelf1, model_tv, model_sofa, model_lightstand, model_penstand, model_pen=[], model_penstand2;

var camera_d_theta = 0;
var camera_d_phi = 0;
var camera_dr = 0;

var fangle = 0.025;
var fr = 200;

var fps = 100;

var width = 800;//表示領域:横
var height = 800;//表示領域:縦

var i=0;
var dropcount = 0;


// 最初の処理
initScene = function() {
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFShadowMap;
	renderer.shadowMapAutoUpdate = true;
	renderer.fps=fps;

	document.getElementById( 'viewport' ).appendChild( renderer.domElement );

	gv = new THREE.Vector3(0,0,-9800);

	scene = new Physijs.Scene;
	scene.setGravity(gv);
	scene.fps=fps;
	camera = new THREE.PerspectiveCamera(
		35,
		width / height,
		1,
		1000000
	);

	// データを入れる準備
	finfo = new FurnitureData();
	rinfo = new RoomData();
	data = new QuakeData();

	// データを入れる
	document.addEventListener('dragover', function(ev){
		if(dropcount==0){
			finfo.handleDragOver(ev);
		}else if(dropcount==1){
			rinfo.handleDragOver(ev);
		}else{
			data.handleDragOver(ev);
		}
	});
	document.addEventListener('drop', function(ev){
		if(dropcount==0){
			finfo.handleFileSelect(ev);
		}else if(dropcount==1){
			rinfo.handleFileSelect(ev);
		}else{
			data.handleFileSelect(ev);
		}
	});

	// 上方ベクトル→注視点の順で設定しないと反映されない
	camera.position.set(100, 100, 100); // カメラの配置
	camera.up.set(0, 0, 1); // カメラの上方ベクトルの設定
	camera.lookAt(new THREE.Vector3(0, 0, 1000)); // 注視点の設定
	scene.add( camera );
/*
	var plight=[];
	for (var j=0;j<2;j++){
		for (var i=0;i<2;i++){
			plight[i+j*2] = new THREE.PointLight(0xFFFFFF,5,room_z*1.8);
			plight[i+j*2].position.set((i-0.5)*room_x,(j-0.5)*room_y,room_z);
			if (i==j)
				scene.add(plight[i+j*2]);
		}
	}
*/
	scene.add(new THREE.AmbientLight(0x404040));

	document.addEventListener('keydown', function( ev ) {
		switch ( ev.keyCode ) {
			case 37://左
//			case '3'.charCodeAt(0)://左
				camera_d_phi = -fangle;
				break;
			case 38://上
//			case '5'.charCodeAt(0)://上
				camera_d_theta = fangle;
				break;
			case 39://右
//			case '4'.charCodeAt(0)://右
				camera_d_phi = fangle;
				break;
			case 40://下
//			case '6'.charCodeAt(0)://下
				camera_d_theta = -fangle;
				console.log(finfo);
				console.log(finfo[0]);
				console.log(finfo[1]);
				break;
			case 33://PageUp
//			case '7'.charCodeAt(0)://PageUp
				camera_dr = -fr;
				break;
			case 34://PageDown
//			case '8'.charCodeAt(0)://PageDown
				camera_dr = fr;
				break;
			case 188:// <
				i -= 100;
				if(i < 0) {
					i = 0;
				}
				break;
			case 190:// >
				i += 100;
				break;
			case 48:// 0
				i = 0;
				break;
			case '1'.charCodeAt(0):
				target_z+=100;
				break;
			case '2'.charCodeAt(0):
				target_z-=100;
				break;
		}
//	console.log(target_z);
	});
	document.addEventListener('keyup', function( ev ) {
		switch ( ev.keyCode ) {

			case 37://左
//			case '3'.charCodeAt(0)://左
				camera_d_phi = 0.0;
				break;
			case 38://上
//			case '5'.charCodeAt(0)://上
				camera_d_theta = 0.0;
				break;
			case 39://右
//			case '4'.charCodeAt(0)://右
				camera_d_phi = 0.0;
				break;
			case 40://下
//			case '6'.charCodeAt(0)://下
				camera_d_theta = 0.0;
				break;
			case 33://PageUp
//			case '7'.charCodeAt(0)://PageUp
				camera_dr = 0;
				break;
			case 34://PageDown
//			case '8'.charCodeAt(0)://PageDown
				camera_dr = 0;
				break;
		}

	});

	room = new Physijs.BoxMesh(
		new THREE.BoxGeometry(0, 0, 0),
		new Physijs.createMaterial(
			new THREE.MeshPhongMaterial({color: 0xB16833}),

			0,		// 摩擦係数
			0		// 反発係数
		),
		10
	);

	loadRoom("data\\rooms\\living");

	requestAnimationFrame( render );

	scene.addEventListener("update", function() {
		var time = function() {
			room.__dirtyPosition = true;
			room.__dirtyRotation = true;

			var rgv = new THREE.Vector3();// 床の重力を反発(reverse gv)
			rgv.copy(gv);
			rgv.multiplyScalar(-room._physijs.mass);
			room.applyCentralForce(rgv);

			if(!data.data){

				room.setLinearVelocity(new THREE.Vector3().set(0,0,0));
				room.setAngularVelocity(new THREE.Vector3().set(0,0,0));
				room.position.x=0;
				room.position.y=0;
				room.position.z=0;

			}
			else{
				var d = data.data["Velocity"];
				var ratio=10; // three.jsと地震データのスケール比 本来は10

				var quakeVector = new THREE.Vector3(d["E-W"][i] * ratio, d["N-S"][i] * ratio, d["U-D"][i] * ratio);
				room.setAngularVelocity(new THREE.Vector3().set(0,0,0));

				room.setLinearVelocity(quakeVector);

				scene.simulate(); // run physics

				document.getElementById("frame").innerHTML = i;
				var t = frame_to_time(i * 100 / data.data["Sampling Freq"]);
				document.getElementById("time").innerHTML =
					("0"+t["minute"].toFixed(0)).slice(-2) + "'" +
					("0"+t["second"].toFixed(0)).slice(-2) + '"' +
					("0"+t["centi_second"].toFixed(0)).slice(-2);
				document.getElementById("E-W_pos").innerHTML = data.data["Position"]["E-W"][i].toFixed(4);
				document.getElementById("N-S_pos").innerHTML = data.data["Position"]["N-S"][i].toFixed(4);
				document.getElementById("U-D_pos").innerHTML = data.data["Position"]["U-D"][i].toFixed(4);
				document.getElementById("E-W_vel").innerHTML = data.data["Velocity"]["E-W"][i].toFixed(4);
				document.getElementById("N-S_vel").innerHTML = data.data["Velocity"]["N-S"][i].toFixed(4);
				document.getElementById("U-D_vel").innerHTML = data.data["Velocity"]["U-D"][i].toFixed(4);
				document.getElementById("E-W_acc").innerHTML = data.data["Acceleration"]["E-W"][i].toFixed(4);
				document.getElementById("N-S_acc").innerHTML = data.data["Acceleration"]["N-S"][i].toFixed(4);
				document.getElementById("U-D_acc").innerHTML = data.data["Acceleration"]["U-D"][i].toFixed(4);

				i += 1;

			}
		};
		time();
	});


};

// 物理計算と描画
render = function() {
	room.setLinearVelocity(new THREE.Vector3().set(0,0,0));
	room.setAngularVelocity(new THREE.Vector3().set(0,0,0));

	var x = camera_r*Math.cos(camera_theta)*Math.cos(camera_phi);
	var y = camera_r*Math.cos(camera_theta)*Math.sin(camera_phi);
	var z = camera_r*Math.sin(camera_theta);
	
	camera.position.set(x, y, z);
	camera.up.set(0, 0, 1); // カメラの上方ベクトルの設定
	camera.lookAt(new THREE.Vector3(0, 0, target_z));//room_z*0.1)); // 注視点の設定

	camera_phi+=camera_d_phi;
	camera_theta+=camera_d_theta;
	camera_r+=camera_dr;

	if(camera_theta>Math.PI*0.49){
		camera_theta=Math.PI*0.49;
	}

	if(camera_theta<0.0){
		camera_theta=0.0;
	}
/*
	if(camera_r<room_x){
		camera_r=room_x;
	}
*/

	// 床の重力を反発(reverse gv)
	var rgv = new THREE.Vector3();
	rgv.copy(gv);
	rgv.multiplyScalar(-room._physijs.mass);
	if(!data.data){
		room.applyCentralForce(rgv);
	}
	room.__dirtyPosition = true;
	room.__dirtyRotation = true;

	if(data.data){
		scene.simulate(); // run physics
	}
	renderer.render( scene, camera); // render the scene
	requestAnimationFrame( render );

};

// 開始時にinitSceneを実行するように設定
window.onload = initScene;

function frame_to_time(frame) {
	var time = {
		"minute" : 0,
		"second" : 0,
		"centi_second" : 0
	}
	
	time["minute"] = Math.floor(frame / 6000);
	frame -= time["minute"] * 6000;
	time["second"] = Math.floor(frame / 100);
	time["centi_second"] = Math.floor(frame % 100);
	
	return time;
}