<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";
  $name;
  $friction;
  $restitution;
  $i;


  $test=[];
  $test[0]="aaa";
  $test[1]="bbb";
  $jsonTest=json_encode($test);
  // MySQLへ接続する
  $link = mysql_connect($url,$user,$pass) or die("MySQLへの接続に失敗しました。");

  // データベースを選択する
  $sdb = mysql_select_db($db,$link) or die("データベースの選択に失敗しました。");

  // クエリを送信する
  $sql = "SELECT * FROM furniture";
  $result = mysql_query($sql, $link) or die("クエリの送信に失敗しました。<br />SQL:".$sql);
  $sql2 = "SELECT * FROM box";
  $result2 = mysql_query($sql2, $link) or die("クエリの送信に失敗しました。<br />SQL:".$sql2);

  //結果セットの行数を取得する
  $rows = mysql_num_rows($result);
  $rows2 = mysql_num_rows($result2);

function quote_smart($value)
{
    // 数値以外をクオートする
    if (!is_numeric($value)) {
        $value = '"' . mysql_real_escape_string($value) . '"';
    }
    return $value;
}

  //表示するデータを作成
  if($rows){
    $i=0;
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td>".$row["id"]."</td><td>".$row["friction"]."</td><td>".$row["restitution"]."</td><td>".$row["name"]."</td>";
      $tempHtml .= "</tr>\n";
      $name[$i]=$row["name"];
      echo $name[$i];
      $friction[$i]=$row["friction"];
      $restitution[$i]=$row["restitution"];
      $i++;
    }
    $jsonName=json_encode($name);
    $jsonFriction=json_encode($friction);
    $jsonRestitution=json_encode($restitution);
    $msg = $rows."件のデータがあります。";
    $chunk = $rows;
  }else{
    $msg = "データがありません。";
  }
  if($rows2){
    while($row2 = mysql_fetch_array($result2)) {
      $tempHtml2 .= "<tr>";
      $tempHtml2 .= "<td>".$row2["wX"]."</td><td>".$row2["wY"]."</td><td>".$row2["wZ"]."</td><td>".$row2["x"]."</td><td>".$row2["y"]."</td><td>".$row2["z"]."</td><td>".$row2["rX"]."</td><td>".$row2["rY"]."</td><td>".$row2["rZ"]."</td><td>".$row2["mass"]."</td><td>".$row2["density"]."</td><td>".$row["useMass"]."</td><td>".$row2["color"]."</td><td>".$row2["texture"]."</td><td>".$row2["useTexture"]."</td>";
      $tempHtml2 .= "</tr>\n";
    }
    $msg2 = $rows2."件のデータがあります。";
  }else{
    $msg2 = "データがありません。";
  }

  //結果保持用メモリを開放する
  mysql_free_result($result);
  mysql_free_result($result2);

  // MySQLへの接続を閉じる
  mysql_close($link) or die("MySQL切断に失敗しました。");
?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
    <title>全件表示</title>
  </head>
  <body>
    <h3>表示</h3>
    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>摩擦</td><td>反発</td><td>name</td></tr>
      <?= $tempHtml ?>
    </table>

    <hr>
    <h3>boxを表示</h3>
    <?= $msg2 ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffff"><td>id</td><td>幅x</td><td>幅ｙ</td><td>name</td></tr>
      <?= $tempHtml2 ?>
    </table>

<script type="text/javascript">var rows = "<?= $rows ?>";</script>
<script type="text/javascript">var restitution = JSON.parse('<?php echo  $jsonRestitution; ?>');</script>
<script type="text/javascript">var test=[];
    test[0] = JSON.stringify('<?php echo  $jsonName[0]; ?>');
    test[1] = JSON.stringify('<?php echo  $jsonName[1]; ?>');
</script>
<script type="text/javascript" src="script.js"></script>


  </body>
</html>


