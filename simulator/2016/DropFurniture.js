function FurnitureData(){
	this.finfo;
}

FurnitureData.prototype.handleFileSelect = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files;		// ファイルリストオブジェクト 
	//家具データ

	var own = this;
	var temp={a:0};
	for(var j = 0, f; f = files[j]; j++) {
		temp.a=j;
		console.log('a'+temp.a);
		GDownloadUrl("data\\furnitures\\"+files[j].name, function dispData(fdata, statusCode){
			var obj = eval("(" + fdata + ")"); //ファイルに入っているデータをobjに入る
			finfo[temp.a] = temp.a;//$.extend(true, {}, obj);
			console.log('b'+temp.a);
		});
	}

/*
	var own = this;
	finfo=new Array();
	for(var j = 0, f; f = files[j]; j++) {
		var fdd=function (j, finfo, fdata, statusCode){
			var obj = eval("(" + fdata + ")"); //ファイルに入っているデータをobjに入れる
//			finfo[j] = $.extend(true, {}, obj);
			console.log(obj);
//			finfo[j].friction=obj.friction;
		};
		GDownloadUrl("data\\furnitures\\"+files[j].name, fdd(j, finfo));
		//finfo[j] = $.extend(true, {}, obj);
		//finfo[j]=j;
	}
*/
	dropcount+=1;
}

FurnitureData.prototype.handleDragOver = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
}

//////////////////////////////////////////////////////////

function RoomData() {
	this.rinfo;
}

RoomData.prototype.handleFileSelect = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files;		// ファイルリストオブジェクト 
	//部屋データ
	var own = this;
	for(var j = 0, f; f = files[j]; j++) {
		var ftr;
		GDownloadUrl("data\\rooms\\"+files[j].name, function dispData(fdata, statusCode){
			var obj = eval("(" + fdata + ")"); //ファイルに入っているデータをobjに入る
			own[j] = $.extend(true, {}, obj);

			console.log(own[j],"B");
		});
	}
	dropcount+=1;
}

RoomData.prototype.handleDragOver = function (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
}
