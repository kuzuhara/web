function QuakeData() {
	this.data;
}

QuakeData.prototype.setScene = function(scene) {
	this.scene = scene;
}

QuakeData.prototype.handleFileSelect = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	
	var files = evt.dataTransfer.files;		// ファイルリストオブジェクト 
	
	var output = [];
	var own = this;
	for(var j = 0, f; f = files[j]; j++) {
		var reader = new FileReader();
		
		reader.onload = function(ev) {
			var datalist = ev.target.result.split(/\s*\n/);
			
			// 地震の総合的情報
			for(var i = 0;i < 17; i++) {
				datalist[i] = datalist[i].substring(18,datalist[i].length);		// 先頭18文字を削る
			}
			
			if(own.data == null){
				own.data = {
					"Origin Time":datalist[0],
					"Lat.":datalist[1],
					"Long.":datalist[2],
					"Depth. (km)":datalist[3],
					"Mag.":datalist[4],
					"Station Code":datalist[5],
					"Station Lat.":datalist[6],
					"Station Long.":datalist[7],
					"Station Height(m)":datalist[8],
					"Record Time":datalist[9],
					"Sampling Freq":0,
					"Duration Time(s)":datalist[11],
					"Scale Factor":datalist[13],
					"Max. Acc. (gal)":datalist[14],
					"Last Correction":datalist[15],
					"Memo.":datalist[16],
					"Acceleration":{},	// 加速度
					"Velocity":{},		// 速度
					"Position":{},		// 位置
					"Average":{}		// 平均
				}
			}
			
			// 振動データの読み込み
			var s = "";
			for(var i = 17; i < datalist.length; i++){
				s += datalist[i];
			}
			var d = s.split(/\s+/);		// スペースで区切る
			own.data["Acceleration"][datalist[12]] = d.slice(1,d.length - 1);		// 先頭と最後の要素を削る
			
			var data_dir = own.data["Acceleration"][datalist[12]];
			
			// Scale Factor(周波数)の計算式
			var sf = parseFloat(datalist[13].split("(")[0]) / parseFloat(datalist[13].split("/")[1]);
			
			// サンプリング周波数の計算
			var temp = datalist[10].replace(/Hz/i,"");		// Hzを取り出す
			var freq;	// 周波数
			if(temp.search(/k/i) != -1) {		// キロ判定
				freq = parseFloat(temp.replace(/k/i,"")) * 1000;
			}
			else {
				freq = parseFloat(temp);
			}
			
			own.data["Sampling Freq"] = freq;
			
			var sum = 0;
			for(var i = 0; i < data_dir.length; i++){
				data_dir[i] = parseFloat(data_dir[i]);
				sum += data_dir[i];
			}
			
			var avg = sum / data_dir.length;
			own.data["Average"][datalist[12]] = avg;
			
			var n = data_dir.length;
			
			// 加速度を積分して速度を求める
			for(var i = 0; i < n; i++){
				data_dir[i] = (data_dir[i] - avg) * sf;
			}
			
			var v_full = new Array();		// 速度
			v_full[0] = 0;
			for(var i = 0; i < n - 1; i++){
				v_full[i+1] = v_full[i] + data_dir[i] / freq;
			}
			
			var dlength=100; // 区間長
			var areanum=v_full.length/dlength; // 区間数
			
			// vを求める
			var vtemp = new Array();
			var v = new Array();
			// 最小二乗法によるフィッティング曲線のパラメータ
			for(var j=0;j<areanum;j++){
				v = v_full.slice(dlength*j, dlength*(j+1));
				
				var a0 = 0;
				
				for(var i = 0; i < v.length; i++){
					a0 += v[i] / v.length;
				}
				
				for(var i = 0; i < v.length; i++){
					v[i] -= a0;
				}
				vtemp=vtemp.concat(v);
			
			}
			v = vtemp;
			own.data["Velocity"][datalist[12]] = v;
			
			// 位置計算(積分)
			var pos_full = new Array();
			pos_full[0] = 0;
			for(var i = 0; i < n-1; i++){
				pos_full[i+1] = pos_full[i] + v[i] / freq;
			}
			
			// posを求める
			var posTemp = new Array();
			var pos = new Array();
			for(var j = 0; j < areanum; j++) {
				pos = pos_full.slice( dlength * j, dlength * (j + 1));
				
				var a0 = 0;
				
				for(var i = 0; i < pos.length; i++){
					a0 += pos[i] / pos.length;
				}
				
				for(var i = 0; i < pos.length; i++){
					pos[i] -= a0;
				}
				
				posTemp = posTemp.concat(pos);
			
			}
			
			pos = posTemp;
			own.data["Position"][datalist[12]] = pos;
			//own.scene.setFixedTimeStep( 1/own.data["Sampling Freq"] );
			scene.setFixedTimeStep( 1/own.data["Sampling Freq"] );
//			console.log(own.data["Sampling Freq"]);
//			console.log(1/own.data["Sampling Freq"]);
//			console.log(scene.fixedTimeStep);
		}
		reader.readAsText(f);
	}
}

QuakeData.prototype.handleDragOver = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
}
