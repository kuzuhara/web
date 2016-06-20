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
      die('INSERTクエリーが失敗しました。'.mysql_error());
    }
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

print('<p>データを追加します。</p>');

//$sql = "INSERT INTO furniture (id, name, friction, restitution) VALUES (2, '段ボール', 0.9, 0.6)";
//$result_flag = mysql_query($sql);
insert(3, 'ボール', 0.8, 0.6);

if (!$result_flag) {
    die('INSERTクエリーが失敗しました。'.mysql_error());
}

print('<p>追加後のデータを取得します。</p>');

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