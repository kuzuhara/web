for (var i=0;i<restitution.length;i++){
	console.log(restitution[i]);
	console.log(test[i]);
}
for (var i=0;i<selectId.length;i++){
	console.log(selectId[i]);
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
    selectBox[i]= selectId[i];
}

//  http://isthmis.me/Blog/javascript-selectbox/
for ( var i in selectBox ) {
    var option = document.createElement('option');
    option.setAttribute('value', selectId[i]); //���ڂ̒l
    selectBox[i].value=selectId[i];
    selectBox[i].text=selectId[i];
//    option.setAttribute('', i);
    option.innerHTML = selectBox[i]; //�\�����镶�������߂Ă���
    select.appendChild(option);
}


var select = document.getElementById('roomCheck');

var selectBox = [];

for (var i=0;i<aaa.length-1;i++){
    selectBox[i]= selectId[i];
}

//  http://isthmis.me/Blog/javascript-selectbox/
for ( var i in selectBox ) {
    document.insert.checktest.value +=selectId[i]+",";
}
