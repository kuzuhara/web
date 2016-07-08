<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";
  $friction;
  $restitution;
  $i;
  $fullname="";


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

//insert(1,'タンス', 0.1, 0.8);
  $a = $_GET['id-insert']+"<br />";
  $b = $_GET['name-insert']+"<br />";
  $c = $_GET['friction-insert']+"<br />";
  $d = $_GET['restitution-insert']+"<br />";


  $g = $_GET['checktest'];

  $sample=explode(',',$g);
  $count = count($sample)-1;

  echo $a;
  echo "<br>";
  echo $b;
  echo "<br>";
  echo $c;
  echo "<br>";
  echo $d;
  echo "<br>";
  echo $g;

$found = 0;

for ($i=0;$i<$count;$i++){
  echo "<br>";
  echo $sample[$i];
  if($sample[$i] == $a){
    $found = 1;
  }
}

if($found == 0){
  insert($a,$b,$c,$d);
}

  //表示するデータを作成
  if($rows){
    $i=0;
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td>".$row["id"]."</td><td>".$row["name"]."</td><td>".$row["friction"]."</td><td>".$row["restitution"]."</td>";
      $tempHtml .= "</tr>\n";
//      $name[$i]=(string)$row["name"];
//      echo $name[$i];
//      $fullname+=$row["name"]+",";
      $fullname=sprintf("%s%s,", $fullname, $row["name"]);
      $friction[$i]=$row["friction"];
      $restitution[$i]=$row["restitution"];
      $i++;
    }
//    $jsonName=json_encode($name);
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
//  echo $fullname;

echo "<a href='control.php'>戻る</a>";

?>

<html>
  <head>
    <h3>furnitureテーブル</h3>
    <meta http-equiv="Content-Type" content="text/html" charset="SHIFT-JIS"; >
    <title>追加表示</title>
  </head>
  <body>

    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>name</td><td>摩擦</td><td>反発</td></tr>
      <?= $tempHtml ?>
    </table>

    <hr>

    <p><?php echo 'ID : ', $a , ' name : ' , $b,' 摩擦 : ',$c ,' 反発 : ', $d ; ?></p>
 <br>
 <a href='control.php'>戻る</a>
  </body>
