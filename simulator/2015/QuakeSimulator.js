'use strict';

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var initScene, render, renderer, scene, camera, ball, gv, room, data, test;

var target_z=0;

var roomname="living";
var roomname="kitchen";
var roomname="student";

var lightstandlist=[];
var nonuniformitemslist=[];
var furniturelist = [];
var furnitureslist = [];
var furnitureslist2 = [];
var room_x;
var room_y;
var room_z;
var camera_theta;//仰角
var camera_phi;//方位角
var camera_r;


// student
if (roomname=="student"){

	furniturelist = [
		"chest_door1","chest_door2","bookshelf","sofa","tv","tvboard","chest","desk","chair","bookshelf_bottle","bookshelf_clearcase","bookshelf_can",
		"bookshelf_tissue","desk_tissue","penstand",
//		"compass"
	];

	furnitureslist = [
		"desk_stationery_right","desk_stationery_left",
		"tvboard_container1","tvboard_container2","tvboard_drawer",
		"chest_drawer","chest_kimono_top","chest_kimono1","chest_kimono2","chest_kimono3","chest_kimono4","chest_kimono5","chest_kimono6",
		"desk_drawer",
		"desk_book_left","desk_book_middle","desk_book_right","desk_pens",
		"bookshelf_book_rbf","bookshelf_book_rbb","bookshelf_tissues",
	];
	furnitureslist2 =[
	];
	lightstandlist =[
		"lightstand"
	];

	nonuniformitemslist =[
		"desk_unevenbooks_left","desk_unevenbooks_right","bookshelf_unevenbooks_lm","bookshelf_unevenbooks_lt","bookshelf_unevenbooks_rt"
	];

	room_x = 3500;//南北幅
	room_y = 3050;//東西幅
	room_z = 2400;//高さ

	camera_theta = Math.PI*0.1;//仰角
	camera_phi = Math.PI*0.25;//方位角
	camera_r = 9000;
}
// living
else if(roomname=="living"){
	furniturelist = [
		"table","table_cup","table_dish",

		"sofa",
		"rack_large","rack_large_telephone","rack_large_phone",
		"rack_small","rack_small_ricecooker",
		"shelf","shelf_glass_left","shelf_glass_right","shelf_objet","shelf_cardboard",
		"tv","tvboard","tvrecorder_t","tvrecorder_b",
		"stove_objet",
//		"compass"
	];

	furnitureslist =[
		"shelf_drawer","shelf_cup_tf","shelf_cup_tb","shelf_cup_bf","shelf_cup_bb",
		"shelf_dish_tl","shelf_dish_tm","shelf_dish_tr",
		"shelf_dish_bl","shelf_dish_bm","shelf_dish_br"
	];

	furnitureslist2 =[
	];
	lightstandlist =[
	];
	nonuniformitemslist =[
	];

	room_x = 3600;//南北幅
	room_y = 3500;//東西幅
	room_z = 2500;//高さ

	camera_theta = 0.3269911184307751;//Math.PI*0.12;//仰角
	camera_phi = 4.822787143782128;//Math.PI*1.75;//方位角
	camera_r = 8700;
}
// kitchen
else {
	furniturelist = [
		"suspended_ladle","suspended_turner","suspended_spatula","suspended_tongs",
		"sink",
		"sink_knife","sink_saucepan","sink_cookwarebox","sink_cookingpot","sink_cookingpot_lid","sink_bowl","sink_rice",
		"sink_stove","sink_cuttingboard",
		"sink_door1","sink_door2","sink_door3","sink_door4","sink_door5","sink_door6","sink_door7","sink_door8",
		"shelf","shelf_microwaveoven","shelf_pot","shelf_door_bl","shelf_door_br","shelf_door_tl","shelf_door_tm","shelf_door_tr",
		"rack","rack_hashistand","rack_oven","rack_pot",
		"fridge","fridge_door_left","fridge_door_right",
		"fridge_1_bread","fridge_1_butter",
		"fridge_3_pickledplum","fridge_3_tofu",
		"fridge_4_sprout","fridge_4_meat_s",
		"fridge_5_meat_l","fridge_5_cucumber",
		"fridge_8_cabbage","fridge_8_carrot","fridge_8_radish",
//		"compass"
	];
	furnitureslist =[
		"sink_petbottle",
		"shelf_cup_tr","shelf_drawer","shelf_tupper",
		"rack_hashi","rack_items_t","rack_items_m","rack_items_b",
		"cardboard",
		"fridge_drawer_small","fridge_drawer_large","fridge_petbottle_small","fridge_petbottle_large",
		"fridge_1_yogurt","fridge_2_tupper","fridge_8_onion"
	];
	furnitureslist2 =[
		"sink_petbottle",
		"shelf_dishes_t2","shelf_dishes_t3","shelf_dishes_br1","shelf_dishes_br2","shelf_dishes_br3",
		"shelf_dishes_bm1","shelf_dishes_bm2","shelf_dishes_bm3","shelf_cups_br","shelf_tupper",
		"fridge_6_icecube","fridge_eggs",
	];
	lightstandlist =[
	];
	nonuniformitemslist =[
		"fridge_7_frozenfood_left","fridge_7_frozenfood_right"
	];
	room_x = 2600;//南北幅
	room_y = 2600;//東西幅
	room_z = 2500;//高さ

	camera_theta = Math.PI*0.18;//仰角
	camera_phi = Math.PI*0.81;//方位角　//シミュレーションの際の角度
	camera_r = 9000;

}

var room_t = room_z;//壁・床の厚さ

//モデルの変数
var model_chest, model_desk, model_bookshelf1, model_tv, model_sofa, model_lightstand, model_penstand, model_pen=[], model_penstand2;

var camera_d_theta = 0;
var camera_d_phi = 0;
var camera_dr = 0;
var camera_dr = 0;

var fangle = 0.025;
var fr = 200;

var fps = 100;

var width = 800;//表示領域:横
var height = 800;//表示領域:縦

var i=0;

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
	data = new QuakeData();

	// データを入れる
	document.addEventListener('dragover', function(ev){
		data.handleDragOver(ev);
	});
	document.addEventListener('drop', function(ev){
		data.handleFileSelect(ev);
	});

	// 上方ベクトル→注視点の順で設定しないと反映されない
	camera.position.set(100, 100, 100); // カメラの配置
	camera.up.set(0, 0, 1); // カメラの上方ベクトルの設定
	camera.lookAt(new THREE.Vector3(0, 0, room_z/2)); // 注視点の設定
	scene.add( camera );

	var plight=[];
	for (var j=0;j<2;j++){
		for (var i=0;i<2;i++){
			plight[i+j*2] = new THREE.PointLight(0xFFFFFF,5,room_z*1.8);
			plight[i+j*2].position.set((i-0.5)*room_x,(j-0.5)*room_y,room_z);
			if (i==j)
				scene.add(plight[i+j*2]);
		}
	}

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
	console.log(camera_phi,camera_theta,camera_r);
	});

	//////////////////////家具の配置///////////////////////////////////////////////////////////////////////////////////////

	//loadFuniture(ファイル名,0,0,0)
	for (var i=0;i<furniturelist.length;i++){
		loadFurniture("room\\"+roomname+"\\furniturelist\\"+furniturelist[i],0,0,0);
	}
	//loadFunitures(ファイル名)
	for (var i=0;i<furnitureslist.length;i++){
		loadFurnitures("room\\"+roomname+"\\furnitureslist\\"+furnitureslist[i]);
	}
	//loadFunitures2(ファイル名)
	for (var i=0;i<furnitureslist2.length;i++){
		loadFurnitures2("room\\"+roomname+"\\furnitureslist2\\"+furnitureslist2[i]);
	}
	for (var i=0;i<lightstandlist.length;i++){
		loadLightStand("room\\"+roomname+"\\lightstand\\"+lightstandlist[i]);
	}
	for (var i=0;i<nonuniformitemslist.length;i++){
//		console.log(nonuniformitemslist[i]);
		loadNonuniformItems("room\\"+roomname+"\\nonuniformitems\\"+nonuniformitemslist[i]);
	}
	//////////////////////家具の配置///////////////////////////////////////////////////////////////////////////////////////
	var mat_floor = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('room/'+roomname+'/surface'+'/floor.jpg')});

	//-----------------------------------------------床の作成-----------------------------------------------------------------
	// 床の質量
	var floormass = 1000000000000.0;

	// 物理計算用の床
	var floor = new Physijs.BoxMesh(
		new THREE.BoxGeometry(room_x, room_y, room_t),
		new Physijs.createMaterial(
			new THREE.MeshPhongMaterial({
				opacity:0.8,
				transparent:true,
				visible: false
			}),
			1,
			1
		),
	floormass);	// 質量(極端に大きい数字を入れる事で最も大きい値とする)

	// 表示用の床
	var t_floor = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(room_x, room_y, 1, 1),
		mat_floor
	);	
	floor.position.set(0, 0, -room_t/2);

//------------------------------------------------床の終わり--------------------------------------------------------------------------------

//------------------------------------------------壁の作成----------------------------------------------------------------------------------
	// 壁の質量
	var wallmass = floormass;

	var mat_wall = [
		new THREE.MeshPhongMaterial(
			{map:THREE.ImageUtils.loadTexture('room/'+roomname+'/surface'+'/east.png'),transparent:true, opacity:0.5, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial(
			{map:THREE.ImageUtils.loadTexture('room/'+roomname+'/surface'+'/west.png'),transparent:true, opacity:0.5, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial(
			{map:THREE.ImageUtils.loadTexture('room/'+roomname+'/surface'+'/north.png'),transparent:true, opacity:0.5, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial(
			{map:THREE.ImageUtils.loadTexture('room/'+roomname+'/surface'+'/south.png'),transparent:true, opacity:0.5, side:THREE.DoubleSide})
	];

	var wall=[];
	var t_wall=[];
	var wallGeometry=[
		new THREE.BoxGeometry(room_t, room_y+room_t*2, room_z+room_t),
		new THREE.BoxGeometry(room_t, room_y+room_t*2, room_z+room_t),
		new THREE.BoxGeometry(room_x, room_t, room_z+room_t),
		new THREE.BoxGeometry(room_x, room_t, room_z+room_t)
	];
	var wallPosition=[
		new THREE.Vector3(-room_x/2-room_t/2, 0 , room_z/2-room_t/2),
		new THREE.Vector3( room_x/2+room_t/2, 0 , room_z/2-room_t/2),
		new THREE.Vector3(0, -room_y/2-room_t/2 , room_z/2-room_t/2),
		new THREE.Vector3(0,  room_y/2+room_t/2 , room_z/2-room_t/2)
	];
	var t_wallGeometry=[
		new THREE.PlaneBufferGeometry(room_z, room_y, 1, 1),
		new THREE.PlaneBufferGeometry(room_z, room_y, 1, 1),
		new THREE.PlaneBufferGeometry(room_x, room_z, 1, 1),
		new THREE.PlaneBufferGeometry(room_x, room_z, 1, 1)
	];
	var t_wallRotation=[
		new THREE.Vector3(0, Math.PI/2,0),
		new THREE.Vector3(0,-Math.PI/2,0),
		new THREE.Vector3(-Math.PI/2,0,0),
		new THREE.Vector3( Math.PI/2,0,0)
	];
	var t_wallPosition=[
		new THREE.Vector3(-room_x/2, 0, room_z/2),
		new THREE.Vector3( room_x/2, 0, room_z/2),
		new THREE.Vector3(0, -room_y/2, room_z/2),
		new THREE.Vector3(0,  room_y/2, room_z/2)
	];

	for (var i=0;i<4;i++){
		// 物理計算用の壁
		wall[i] = new Physijs.BoxMesh(
			wallGeometry[i],
			new Physijs.createMaterial(
				new THREE.MeshPhongMaterial({
					opacity:0.8,
					transparent:true,
					visible: false
				}),
				1,
				1
			),
		wallmass);

		// 表示用の壁
		t_wall[i] = new THREE.Mesh(
			t_wallGeometry[i],
			mat_wall[i]
		);

		wall[i].position.set(wallPosition[i].x, wallPosition[i].y, wallPosition[i].z);
		t_wall[i].rotation.x = t_wallRotation[i].x;
		t_wall[i].rotation.y = t_wallRotation[i].y;
		t_wall[i].rotation.z = t_wallRotation[i].z;
		t_wall[i].position.set(t_wallPosition[i].x, t_wallPosition[i].y, t_wallPosition[i].z);
	}

//---------------------------------------壁の終わり--------------------------------------------------------------------------------


//---------------------------------------部屋の作成--------------------------------------------------------------------------------
	room = new Physijs.BoxMesh(
		new THREE.BoxGeometry(0, 0, 0),
		new Physijs.createMaterial(
			new THREE.MeshPhongMaterial({color: 0xB16833}),
			floor._physijs.friction,		// 摩擦係数
			0		// 反発係数
		),
		floormass + wallmass * 4
	);
	
	room.add(floor);
	room.add(t_floor);

	for (var i=0;i<4;i++){
		room.add(wall[i]);
		room.add(t_wall[i]);
	}

//----------------------------------------ストーブの作成----------------------------------------------------------------------------------
	if (roomname == "living"){
		// ストーブの質量
		var smass = 1;

		var stove_size_x=700;
		var stove_size_y=220;
		var stove_size_z=620;
		var stove_pos_x=0;
		var stove_pos_y=1540;
		var stove_pos_z=315;

		// ストーブ
		var p_stove = new Physijs.BoxMesh(
			new THREE.BoxGeometry(stove_size_x, stove_size_y, stove_size_z),
			new Physijs.createMaterial(
				new THREE.MeshLambertMaterial({color:0xdeb887, ambient:0xdeb887}),
				0.4,//friction
				0.3//restitution
			),
		smass);


		p_stove.position.set(stove_pos_x, stove_pos_y, stove_pos_z);
		room.add(p_stove);
	}

	scene.add(room);

//----------------------------------------------------ボードとフックの作成----------------------------------------------------------------------------------
	if (roomname == "kitchen"){
		// ボードの質量
		var bmass = 1;

		//ボードのサイズ,位置
		var board_size_x=2;//厚み
		var board_size_y=500;
		var board_size_z=100;
		var board_pos_x=-1290;
		var board_pos_y=1000;
		var board_pos_z=1370;


		// ボード
		var p_board = new Physijs.BoxMesh(
			new THREE.BoxGeometry(board_size_x, board_size_y, board_size_z),
			new Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color:0x0000FF, ambient:0x0000FF,transparent:true,opecity:0.5}),
				0.15,
				0.4
			),
		bmass);
		p_board.position.set(board_pos_x, board_pos_y, board_pos_z);
		room.add(p_board);

		var hmass = 1;// フックの質量
		var hook_h = 1370; // 曲面部分上端の高さ
		var hook_t = 8; // 厚さ
		var hook_w = 12;  // 幅
		var hook_wl = 64.7; // 壁に接触する板の長さ
		var hook_pl = 4; // 曲面を構成する板の長さ
		var hook_r = 16; // 曲面の半径
		var hook_tl = 33; // 先端の長さ

		for (var i=0;i<4;i++){
			// 壁に接触する板の部分
			var p_hook_wall= new Physijs.BoxMesh(
				new THREE.BoxGeometry(hook_t, hook_w, hook_wl),
				new Physijs.createMaterial(
					new THREE.MeshLambertMaterial({color:0x777777, ambient:0x777777}),
					0.15,
					0.4
				),
			hmass);
			p_hook_wall.position.set(board_pos_x+board_size_x/2+hook_t/2, 800+i*100, hook_h+hook_wl/2);
			room.add(p_hook_wall);
			// 曲面の部分
			for (var j=5;j<=155;j+=10){
				var p_hook_curve = new Physijs.BoxMesh(
					new THREE.BoxGeometry(hook_t, hook_w, hook_pl),
					new Physijs.createMaterial(
					new THREE.MeshLambertMaterial({color:0x777777, ambient:0x777777}),
						0.15,
						0.4
					),
				hmass);
				p_hook_curve.position.set(board_pos_x+board_size_x/2+hook_t/2+hook_r-hook_r*Math.cos(j*Math.PI/180), 800+i*100, hook_h-hook_r*Math.sin(j*Math.PI/180));
				p_hook_curve.rotation.set(0,-j*Math.PI/180,0);
				room.add(p_hook_curve);
			}
			// 先端の部分
			var p_hook_terminal= new Physijs.BoxMesh(
				new THREE.BoxGeometry(hook_t, hook_w, hook_tl),
				new Physijs.createMaterial(
					new THREE.MeshLambertMaterial({color:0x777777, ambient:0x777777}),
					0.15,
					0.4
				),
			hmass);
			p_hook_terminal.position.set(board_pos_x+board_size_x/2+hook_t/2+hook_r-hook_r*Math.cos(160*Math.PI/180)+hook_tl/2*Math.sin(160*Math.PI/180)
				, 800+i*100
				, hook_h-hook_r*Math.sin(160*Math.PI/180)-hook_tl/2*Math.cos(160*Math.PI/180)
			);
			p_hook_terminal.rotation.set(0,-160*Math.PI/180,0);
			room.add(p_hook_terminal);
		}

	}
	scene.add(room);

//----------------------------------------------部屋終わり--------------------------------------------------------------------------------

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