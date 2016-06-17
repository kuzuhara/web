
//var friction = JSON.parse($script.attr('data-array'));
for (var i=0;i<restitution.length;i++){
	console.log(restitution[i]);
	console.log(test[i]);
}
console.log(fullname);

var aaa=fullname.split(",");

for (var i=0;i<aaa.length;i++){
	console.log(aaa[i]);
}

//キッチンの部屋などを表示できるようにしていく
//項目変更で命令　function


var select = document.getElementById('roomSelect');
var selectBox = [];
for (var i=0;i<aaa.length-1;i++){
    selectBox[i]= aaa[i];
}
/*
var selectBox = {
    
    'Japan'     : aaa[0],
    'America'   : aaa[1],


}; */



for ( var i in selectBox ) {
    var option = document.createElement('option');
 
    option.setAttribute('value', i);
    option.innerHTML = selectBox[i];
 
    select.appendChild(option);
}