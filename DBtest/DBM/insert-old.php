<html>
<head>
<title>insert</title>
<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
</head>

<body>

<?php
  function insert($id, $name, $friction, $restitution){
    //$www=$id +","+ $name + "," + $friction +"," + $restitution;
    $sql=sprintf("INSERT INTO furniture (id, name, friction, restitution) VALUES (%d,'%s',%f,%f)",$id,$name,$friction,$restitution);
    print($sql);
    //$sql = $www;
    $result_flag = mysql_query($sql);
    if (!$result_flag) {
      die('INSERT�N�G���[�����s���܂����B'.mysql_error());
    }
  }



$link = mysql_connect('mysql103.phy.lolipop.lan', 'LAA0737712', 'Aodai7010');
if (!$link) {
    die('�ڑ����s�ł��B'.mysql_error());
}

print('<p>�ڑ��ɐ������܂����B</p>');

$db_selected = mysql_select_db('LAA0737712-aodaisimu', $link);
if (!$db_selected){
    die('�f�[�^�x�[�X�I�����s�ł��B'.mysql_error());
}

print('<p>�f�[�^�x�[�X��I�����܂����B</p>');

//mysql_set_charset('utf8');

$result = mysql_query('SELECT id,name FROM furniture');//�e�[�u����
if (!$result) {
    die('SELECT�N�G���[�����s���܂����B'.mysql_error());
}

while ($row = mysql_fetch_assoc($result)) {
    print('<p>');
    print('id='.$row['id']);
    print(',name='.$row['name']);
    print('</p>');
}

print('<p>�f�[�^��ǉ����܂��B</p>');

//$sql = "INSERT INTO furniture (id, name, friction, restitution) VALUES (2, '�i�{�[��', 0.9, 0.6)";
//$result_flag = mysql_query($sql);
insert(3, '�{�[��', 0.8, 0.6);

if (!$result_flag) {
    die('INSERT�N�G���[�����s���܂����B'.mysql_error());
}

print('<p>�ǉ���̃f�[�^���擾���܂��B</p>');

$result = mysql_query('SELECT id,name FROM furniture');
if (!$result) {
    die('SELECT�N�G���[�����s���܂����B'.mysql_error());
}

while ($row = mysql_fetch_assoc($result)) {
    print('<p>');
    print('id='.$row['id']);
    print(',name='.$row['name']);
    print('</p>');
}

$close_flag = mysql_close($link);

if ($close_flag){
    print('<p>�ؒf�ɐ������܂����B</p>');
}

?>
</body>
</html>