for (var i=0;i<restitution.length;i++){
	console.log(restitution[i]);
	console.log(test[i]);
}
console.log(fullname);

//var aaa=fullname.split(",");
var aaa=fullname.split(",");

for (var i=0;i<aaa.length;i++){
	console.log(aaa[i]);
}


//�L�b�`���̕����Ȃǂ�\���ł���悤�ɂ��Ă���
//���ڕύX�Ŗ��߁@function

var select = document.getElementById('roomSelect');

var selectBox = [];

for (var i=0;i<aaa.length-1;i++){
    selectBox[i]= aaa[i];
}

for ( var i in selectBox ) {
    var option = document.createElement('option');
    option.setAttribute('value', i);
    option.innerHTML = selectBox[i];
    select.appendChild(option);
}
