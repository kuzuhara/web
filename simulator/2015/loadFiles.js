// loadFurniture : 1つの家具の読み込み
// loadColoredFurniture : 1つの家具の読み込み(引数で色を指定)
// loadNonuniformItems : 不ぞろいのオブジェクトの読み込み
// loadFurnitures : 1列に並んだ家具の読み込み
// loadFurnitures2 : 2次元に並んだ家具の読み込み
// loadLightStand : 電気スタンドの読み込み

function loadFurniture(name,dx,dy,dz){
	var ftr;
	GDownloadUrl(name+".json", function dispData(fdata, statusCode){
		var obj = eval("(" + fdata + ")");
		var f = [];
		for (var i = 0; i < obj.dimension.length; i++) {
			var x1 = obj.dimension[i].x1;
			var y1 = obj.dimension[i].y1;
			var z1 = obj.dimension[i].z1;
			var x2 = obj.dimension[i].x2;
			var y2 = obj.dimension[i].y2;
			var z2 = obj.dimension[i].z2;

			var sx=Math.abs(x1-x2);//Math.abs:絶対値を返す
			var sy=Math.abs(y1-y2);
			var sz=Math.abs(z1-z2);

			var m;

			var mx=(x1+x2)/2;
			var my=(y1+y2)/2;
			var mz=(z1+z2)/2;

			var rx = obj.dimension[i].rx;
			var ry = obj.dimension[i].ry;
			var rz = obj.dimension[i].rz;

			var texture=obj.dimension[i].texture;
			var tmesh;

			if (texture==""){
				if (obj.dimension[i].type=="truncated cone_nobase"){
					tmesh=new THREE.MeshLambertMaterial({color:obj.dimension[i].color, ambient:obj.dimension[i].color, side:THREE.DoubleSide});//jsonファイルで設定した色
				}
				else{
					tmesh=new THREE.MeshLambertMaterial({color:obj.dimension[i].color, ambient:obj.dimension[i].color});//jsonファイルで設定した色
				}
			}
			else if(texture=="translucent"){
				tmesh=new THREE.MeshLambertMaterial({color:obj.dimension[i].color, ambient:obj.dimension[i].color, transparent:true, opacity:0.5});//半透明
			}
			else{
				tmesh=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('room/'+roomname+'/'+texture)});//モデルにテクスチャを張る
			}

			if(obj.dimension[i].type=="box"){
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*sx*sy*sz;//材質と体積で質量を求める
				}
				f[i] = new Physijs.BoxMesh(
					new THREE.BoxGeometry(sx,sy,sz),
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
			}else if (obj.dimension[i].type=="cylinder"){
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*Math.PI*sx*sx/4*sy;//材質と体積で質量を求める
				}				
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,sx/2,sy,16,1,false), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
			}else if (obj.dimension[i].type=="capsule"){
				var r=sx/2;
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*Math.PI*r*r*r;//材質と体積で質量を求める
				}
				var l=Math.abs(obj.dimension[i].z1-obj.dimension[i].z2)-r*2;//Math.abs:絶対値を返す
				var tp=new THREE.SphereGeometry(r);
				var bt=new THREE.SphereGeometry(r);
				var md=new THREE.CylinderGeometry(r, r, l, 16, 1, false);
				var matrixt=new THREE.Matrix4();
				matrixt.makeTranslation(0,l/2,0);
				tp.applyMatrix(matrixt);
				var matrixb=new THREE.Matrix4();
				matrixb.makeTranslation(0,-l/2,0);
				bt.applyMatrix(matrixb);
				var mg=new THREE.Geometry();
				mg.merge(tp);
				mg.merge(bt);
				mg.merge(md);
				f[i] = new Physijs.CapsuleMesh(
					mg, 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
			}else if (obj.dimension[i].type=="cylinder_v"){
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*Math.PI*sx*sx/4*sz;//材質と体積で質量を求める
				}				
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,sx/2,sz,16,1,false), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
				rx+=90;
			}else if (obj.dimension[i].type=="truncated cone"){
				var rb = obj.dimension[i].rb;
				m=obj.dimension[i].mass;//設定した値の質量にする
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,rb,sz,16,1,false), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
				rx+=90;
			}else if (obj.dimension[i].type=="truncated cone_nobase"){
				var rb = obj.dimension[i].rb;
				m=obj.dimension[i].mass;//設定した値の質量にする
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,rb,sz,16,1,true), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
				rx+=90;
			}else if (obj.dimension[i].type=="tube"){
				var parts=[];
				var sidenum=16;
				var psh=sz; // 高さ
				var pst=obj.dimension[i].thickness;//外径(側面の厚さ)
				var rd=sx/2+pst/2; // 内径(穴のあいた部分の大きさ)
				var psw=Math.tan(Math.PI*2/sidenum/2)*rd*2; // 板1枚の幅
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*psh*pst*psw*sidenum;//材質と体積で質量を求める
				}				
				f[i] =  new Physijs.BoxMesh(
					new THREE.BoxGeometry(0, 0, 0),
					new Physijs.createMaterial(
						new THREE.MeshLambertMaterial({color: 0x000000}),
						0,
						0
					),
					m);
				//チューブの部品を追加
				for (var j=0;j<sidenum;j++){
					parts[j]=new Physijs.BoxMesh(
						new THREE.BoxGeometry(psw, pst, psh),
						Physijs.createMaterial(
							tmesh,
							obj.dimension[i].friction,
							obj.dimension[i].restitution
						),
						m/sidenum
					);
					var tt=Math.PI*2*j/sidenum;
					parts[j].rotation.z=tt;
					parts[j].position.x=rd*Math.sin(tt);
					parts[j].position.y=-rd*Math.cos(tt);
					parts[j].position.z=0;
					f[i].add(parts[j]);
				}
			}

			if(i==0)
				console.log(name);
			console.log(m);

			f[i].position.x=mx;
			f[i].position.y=my;
			f[i].position.z=mz;

			f[i].rotation.x=rx*Math.PI/180;//ラジアン=度×円周率÷180
			f[i].rotation.y=ry*Math.PI/180;
			f[i].rotation.z=rz*Math.PI/180;
		}

		ftr = assembleFurnitureArray(f);

		ftr.position.x=obj.posx+dx;
		ftr.position.y=obj.posy+dy;
		ftr.position.z=obj.posz+dz;

		ftr.rotation.x=obj.rotx*Math.PI/180;//ラジアン=度×円周率÷180
		ftr.rotation.y=obj.roty*Math.PI/180;
		ftr.rotation.z=obj.rotz*Math.PI/180;

		scene.add(ftr);
	});
}

function loadColoredFurniture(name,dx,dy,dz,cl){
	var ftr;
	GDownloadUrl(name+".json", function dispData(fdata, statusCode){
		var obj = eval("(" + fdata + ")");
		var f = [];
		for (var i = 0; i < obj.dimension.length; i++) {
			var x1 = obj.dimension[i].x1;
			var y1 = obj.dimension[i].y1;
			var z1 = obj.dimension[i].z1;
			var x2 = obj.dimension[i].x2;
			var y2 = obj.dimension[i].y2;
			var z2 = obj.dimension[i].z2;

			var sx=Math.abs(x1-x2);//Math.abs:絶対値を返す
			var sy=Math.abs(y1-y2);
			var sz=Math.abs(z1-z2);

			var m;

			var mx=(x1+x2)/2;
			var my=(y1+y2)/2;
			var mz=(z1+z2)/2;

			var rx = obj.dimension[i].rx;
			var ry = obj.dimension[i].ry;
			var rz = obj.dimension[i].rz;

			var texture=obj.dimension[i].texture;

			var tmesh;

			if (texture==""){
				if (obj.dimension[i].type=="truncated cone_nobase"){
					tmesh=new THREE.MeshLambertMaterial({color:cl, ambient:cl, side:THREE.DoubleSide});// 引数で受け取った色
				}
				else{
					tmesh=new THREE.MeshLambertMaterial({color:cl, ambient:cl});// 引数で受け取った色
				}
			}
			else if(texture=="usecolor"){
				tmesh=new THREE.MeshLambertMaterial({color:obj.dimension[i].color, ambient:obj.dimension[i].color});//ファイルに記述した色
			}
			else if(texture=="translucent"){
				tmesh=new THREE.MeshLambertMaterial({color:obj.dimension[i].color, ambient:obj.dimension[i].color, transparent:true, opacity:0.5});//半透明
			}
			else{
				tmesh=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('room/'+roomname+'/'+texture)});//モデルにテクスチャを張る
			}

			if(obj.dimension[i].type=="box"){
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*sx*sy*sz;//材質と体積で質量を求める
				}
				f[i] = new Physijs.BoxMesh(
					new THREE.BoxGeometry(sx,sy,sz),
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
			}else if (obj.dimension[i].type=="cylinder"){
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*Math.PI*sx*sx/4*sy;//材質と体積で質量を求める
				}				
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,sx/2,sy,16,1,false), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
			}else if (obj.dimension[i].type=="capsule"){
				var r=sx/2;
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*Math.PI*r*r*r;//材質と体積で質量を求める
				}
				var l=Math.abs(obj.dimension[i].z1-obj.dimension[i].z2)-r*2;//Math.abs:絶対値を返す
				var tp=new THREE.SphereGeometry(r);
				var bt=new THREE.SphereGeometry(r);
				var md=new THREE.CylinderGeometry(r, r, l, 16, 1, false);
				var matrixt=new THREE.Matrix4();
				matrixt.makeTranslation(0,l/2,0);
				tp.applyMatrix(matrixt);
				var matrixb=new THREE.Matrix4();
				matrixb.makeTranslation(0,-l/2,0);
				bt.applyMatrix(matrixb);
				var mg=new THREE.Geometry();
				mg.merge(tp);
				mg.merge(bt);
				mg.merge(md);
				f[i] = new Physijs.CapsuleMesh(
					mg, 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
			}else if (obj.dimension[i].type=="cylinder_v"){
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*Math.PI*sx*sx/4*sz;//材質と体積で質量を求める
				}				
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,sx/2,sz,16,1,false), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
				rx+=90;
			}else if (obj.dimension[i].type=="truncated cone"){
				var rb = obj.dimension[i].rb;
				m=obj.dimension[i].mass;//設定した値の質量にする
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,rb,sz,16,1,false), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
				rx+=90;
			}else if (obj.dimension[i].type=="truncated cone_nobase"){
				var rb = obj.dimension[i].rb;
				m=obj.dimension[i].mass;//設定した値の質量にする
				f[i] = new Physijs.CylinderMesh(
					new THREE.CylinderGeometry(sx/2,rb,sz,16,1,true), 
					Physijs.createMaterial(
						tmesh,
						obj.dimension[i].friction,
						obj.dimension[i].restitution
					),
					m // weight, 0 is for zero gravity
				);
				rx+=90;
			}else if (obj.dimension[i].type=="tube"){
				var parts=[];
				var sidenum=16;
				var psh=sz; // 高さ
				var pst=obj.dimension[i].thickness;//外径(側面の厚さ)
				var rd=sx/2+pst/2; // 内径(穴のあいた部分の大きさ)
				var psw=Math.tan(Math.PI*2/sidenum/2)*rd*2; // 板1枚の幅
				if (obj.dimension[i].mass!=0){//massが0でなければ
					m=obj.dimension[i].mass;//設定した値の質量にする
				}
				else{
					m=obj.dimension[i].density*0.001*psh*pst*psw*sidenum;//材質と体積で質量を求める
				}				
				f[i] =  new Physijs.BoxMesh(
					new THREE.BoxGeometry(0, 0, 0),
					new Physijs.createMaterial(
						new THREE.MeshLambertMaterial({color: 0x000000}),
						0,
						0
					),
					m);
				//チューブの部品を追加
				for (var j=0;j<sidenum;j++){
					parts[j]=new Physijs.BoxMesh(
						new THREE.BoxGeometry(psw, pst, psh),
						Physijs.createMaterial(
							tmesh,
							obj.dimension[i].friction,
							obj.dimension[i].restitution
						),
						m/sidenum
					);
					var tt=Math.PI*2*j/sidenum;
					parts[j].rotation.z=tt;
					parts[j].position.x=rd*Math.sin(tt);
					parts[j].position.y=-rd*Math.cos(tt);
					parts[j].position.z=0;
					f[i].add(parts[j]);
				}
			}
			if (i==0)
				console.log(name);
			console.log(m);
			f[i].position.x=mx;
			f[i].position.y=my;
			f[i].position.z=mz;

			f[i].rotation.x=rx*Math.PI/180;//ラジアン=度×円周率÷180
			f[i].rotation.y=ry*Math.PI/180;
			f[i].rotation.z=rz*Math.PI/180;
		}

		ftr = assembleFurnitureArray(f);

		ftr.position.x=obj.posx+dx;
		ftr.position.y=obj.posy+dy;
		ftr.position.z=obj.posz+dz;

		ftr.rotation.x=obj.rotx*Math.PI/180;//ラジアン=度×円周率÷180
		ftr.rotation.y=obj.roty*Math.PI/180;
		ftr.rotation.z=obj.rotz*Math.PI/180;

		scene.add(ftr);
	});
}

function loadNonuniformItems(name){
	GDownloadUrl(name+".json", function dispData(fdata, statusCode){
		var obj = eval("(" + fdata + ")");
		for (var i=0;i<obj.individual.length;i++){

			var x=obj.startx;
			var y=obj.starty;
			var z=obj.startz;
			// directionの値(0～2)に応じてX,Y,Z方向にずらす

			if (obj.direction==0){
				x+=obj.individual[0].sx/2;
				for(var j=1;j<=i;j++){
					x+=obj.individual[j].sx;
				}
				x-=obj.individual[i].sx/2;
				if (obj.align==true){
					y+=obj.individual[i].sy/2;
					z+=obj.individual[i].sz/2;
				}
			}
			else if (obj.direction==1){
				y+=obj.individual[0].sy/2;
				for(var j=1;j<=i;j++){
					y+=obj.individual[j].sy;
				}
				y-=obj.individual[i].sy/2;
				if (obj.align==true){
					z+=obj.individual[i].sz/2;
					x+=obj.individual[i].sx/2;
				}
			}
			else if (obj.direction==2){
				z+=obj.individual[0].sz/2;
				for(var j=1;j<=i;j++){
					z+=obj.individual[j].sz;
				}
				z-=obj.individual[i].sz/2;
				if (obj.align==true){
					x+=obj.individual[i].sx/2;
					y+=obj.individual[i].sy/2;
				}
			}

			var texture=obj.individual[i].texture;

			var tmesh;

			if (texture==""){
				tmesh=new THREE.MeshLambertMaterial({color:obj.individual[i].color, ambient:obj.individual[i].color});//jsonファイルで設定した色
			}
			else{
				tmesh=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('room/'+roomname+'/'+texture)});//モデルにテクスチャを張る
			}

			var m=obj.individual[i].mass;//設定した値の質量にする

			var ftr = new Physijs.BoxMesh(
				new THREE.BoxGeometry(obj.individual[i].sx,obj.individual[i].sy,obj.individual[i].sz),
				Physijs.createMaterial(
					tmesh,
					obj.friction,
					obj.restitution
				),
				m // weight, 0 is for zero gravity
			);

			ftr.position.x=x;
			ftr.position.y=y;
			ftr.position.z=z;
			scene.add(ftr);
		}
	});
}




function loadFurnitures(name){
	GDownloadUrl(name+".json", function dispData(fdata, statusCode){
		var obj = eval("(" + fdata + ")");
		var num=obj.number;
		var dx=obj.dx;
		var dy=obj.dy;
		var dz=obj.dz;
		for(var j=0;j<num;j++){
			var cl=0xFFFFFF*Math.random();
			loadColoredFurniture(name,dx*j,dy*j,dz*j,cl);
		}
	});
}

function loadFurnitures2(name){
	GDownloadUrl(name+".json", function dispData(fdata, statusCode){
		var obj = eval("(" + fdata + ")");
		var num1=obj.number1;
		var num2=obj.number2;
		var dx1=obj.dx1;var dy1=obj.dy1;var dz1=obj.dz1;
		var dx2=obj.dx2;var dy2=obj.dy2;var dz2=obj.dz2;
		for(var k=0;k<num2;k++){
			for(var j=0;j<num1;j++){
				var cl=0xFFFFFF*Math.random();
				loadColoredFurniture(name,dx1*j+dx2*k,dy1*j+dy2*k,dz1*j+dz2*k,cl);
			}
		}
	});
}

function loadLightStand(name){
	var ftr;
	GDownloadUrl(name+".json", function dispData(fdata, statusCode){
		var obj = eval("(" + fdata + ")");
		var base_r = obj.base_r;
		var base_h = obj.base_h;
		var arm_b_r = obj.arm_b_r;
		var arm_b_h = obj.arm_b_h;
		var arm_t_r = obj.arm_t_r;
		var arm_t_h = obj.arm_t_h;
		var head_r_t = obj.head_r_t;
		var head_r_b = obj.head_r_b;
		var head_h = obj.head_h;

		var angle_t=obj.angle_t;
		var angle_b=obj.angle_b;
		var angle_h=obj.angle_h;

		var model_lightstand;

		//ライトスタンド底
		var model_lightstand_base = new Physijs.CylinderMesh(
			new THREE.CylinderGeometry(base_r, base_r, base_h, 8, 1, false),
			Physijs.createMaterial(
				new THREE.MeshLambertMaterial({color: obj.color_base, ambient: obj.color_base}),
				.4, // friction
				.3 // restitution
			),
			obj.m_base
		);

		model_lightstand_base.rotation.x=Math.PI*0.5;

		//ライトスタンド下柱
		var model_lightstand_arm_b = new Physijs.CylinderMesh(
			new THREE.CylinderGeometry(arm_b_r, arm_b_r, arm_b_h, 8, 1, false),
			Physijs.createMaterial(
				new THREE.MeshLambertMaterial({color: obj.color_bar_b, ambient: obj.color_bar_b}),
				.4, // friction
				.3 // restitution
			),
			obj.m_arm_b
		);

		model_lightstand_arm_b.rotation.x=-angle_b;
		model_lightstand_arm_b.position.x=model_lightstand_base.position.x;
		model_lightstand_arm_b.position.y=model_lightstand_base.position.y-arm_b_h/2*Math.cos(angle_b);
		model_lightstand_arm_b.position.z=model_lightstand_base.position.z+base_h/2+arm_b_h/2*Math.sin(angle_b);


		//ライトスタンド上柱
		var model_lightstand_arm_t = new Physijs.CylinderMesh(
			new THREE.CylinderGeometry(arm_t_r, arm_t_r, arm_t_h, 8, 1, false),
			Physijs.createMaterial(
				new THREE.MeshLambertMaterial({color: obj.color_bar_t, ambient: obj.color_bar_t}),
				.4, // friction
				.3 // restitution
			),
			obj.m_arm_t
		);

		model_lightstand_arm_t.rotation.x=angle_t;
		model_lightstand_arm_t.position.x=model_lightstand_arm_b.position.x;
		model_lightstand_arm_t.position.y=model_lightstand_arm_b.position.y-arm_b_h/2*Math.cos(angle_b)+arm_t_h/2*Math.cos(angle_t);
		model_lightstand_arm_t.position.z=model_lightstand_arm_b.position.z+arm_b_h/2*Math.sin(angle_b)+arm_t_h/2*Math.sin(angle_t);

		//ライトスタンド頭
		var model_lightstand_head_num=new THREE.CylinderGeometry(head_r_t, head_r_b, head_h, 8, 1, true);
		model_lightstand_head_num.side=THREE.DoubleSide;

		var model_lightstand_head = new Physijs.CylinderMesh( // Physijs mesh
			model_lightstand_head_num,
			Physijs.createMaterial(
				new THREE.MeshLambertMaterial({color: obj.color_shade, ambient: obj.color_shade, side:THREE.DoubleSide}),
				.4, // friction
				.3 // restitution
			),
			obj.m_head
		);

		model_lightstand_head.rotation.x=angle_h+Math.PI*0.5;
		model_lightstand_head.position.x=model_lightstand_arm_t.position.x;
		model_lightstand_head.position.y=model_lightstand_arm_t.position.y+arm_t_h/2*Math.cos(angle_t)+(head_r_t+head_r_b)*0.5*Math.cos(angle_t);
		model_lightstand_head.position.z=model_lightstand_arm_t.position.z+arm_t_h/2*Math.sin(angle_t)+(head_r_t+head_r_b)*0.5*Math.sin(angle_t);

		model_lightstand=assembleFurniture(model_lightstand_base,model_lightstand_arm_b,model_lightstand_arm_t,model_lightstand_head);


		model_lightstand.position.x=obj.posx;
		model_lightstand.position.y=obj.posy;
		model_lightstand.position.z=obj.posz;

		model_lightstand.rotation.x=obj.rotx*Math.PI/180;//ラジアン=度×円周率÷180
		model_lightstand.rotation.y=obj.roty*Math.PI/180;
		model_lightstand.rotation.z=obj.rotz*Math.PI/180;

		scene.add(model_lightstand);
	});
}


