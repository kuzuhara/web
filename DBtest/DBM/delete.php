<html>
<head>
<title>delete</title>
<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
</head>

<body>

<?php
function quote_smart($value)
{
    // ���l�ȊO���N�I�[�g����
    if (!is_numeric($value)) {
        $value = "'" . mysql_real_escape_string($value) . "'";
    }
    return $value;
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

print('<p>�f�[�^���X�V���܂��B</p>');

$id = 2;
$name = '�f�W�^���J����';
$friction =0.2;

//$sql = sprintf("UPDATE furniture SET name = %s WHERE id = %s"
//         , quote_smart($name), quote_smart($id));

$sql = sprintf("DELETE FROM furniture WHERE id = %s"
         , quote_smart($id));

$result_flag = mysql_query($sql);


if (!$result_flag) {
    die('UPDATE�N�G���[�����s���܂����B'.mysql_error());
}

print('<p>�X�V��̃f�[�^���擾���܂��B</p>');

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