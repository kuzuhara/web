<html>
<head>
<title>delete</title>
<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
</head>

<body>

<?php
function quote_smart($value)
{
    // 数値以外をクオートする
    if (!is_numeric($value)) {
        $value = "'" . mysql_real_escape_string($value) . "'";
    }
    return $value;
}

$link = mysql_connect('mysql103.phy.lolipop.lan', 'LAA0737712', 'Aodai7010');
if (!$link) {
    die('接続失敗です。'.mysql_error());
}

print('<p>接続に成功しました。</p>');

$db_selected = mysql_select_db('LAA0737712-aodaisimu', $link);
if (!$db_selected){
    die('データベース選択失敗です。'.mysql_error());
}

print('<p>データベースを選択しました。</p>');

//mysql_set_charset('utf8');

$result = mysql_query('SELECT id,name FROM furniture');//テーブル名
if (!$result) {
    die('SELECTクエリーが失敗しました。'.mysql_error());
}

while ($row = mysql_fetch_assoc($result)) {
    print('<p>');
    print('id='.$row['id']);
    print(',name='.$row['name']);
    print('</p>');
}

print('<p>データを更新します。</p>');

$id = 2;
$name = 'デジタルカメラ';
$friction =0.2;

//$sql = sprintf("UPDATE furniture SET name = %s WHERE id = %s"
//         , quote_smart($name), quote_smart($id));

$sql = sprintf("DELETE FROM furniture WHERE id = %s"
         , quote_smart($id));

$result_flag = mysql_query($sql);


if (!$result_flag) {
    die('UPDATEクエリーが失敗しました。'.mysql_error());
}

print('<p>更新後のデータを取得します。</p>');

$result = mysql_query('SELECT id,name FROM furniture');
if (!$result) {
    die('SELECTクエリーが失敗しました。'.mysql_error());
}

while ($row = mysql_fetch_assoc($result)) {
    print('<p>');
    print('id='.$row['id']);
    print(',name='.$row['name']);
    print('</p>');
}

$close_flag = mysql_close($link);

if ($close_flag){
    print('<p>切断に成功しました。</p>');
}

?>
</body>
</html>