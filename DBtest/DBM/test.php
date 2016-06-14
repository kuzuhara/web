<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";

  // MySQLへ接続する
  $link = mysql_connect($url,$user,$pass) or die("MySQLへの接続に失敗しました。");

  // データベースを選択する
  $sdb = mysql_select_db($db,$link) or die("データベースの選択に失敗しました。");

  // クエリを送信する
  $sql = "SELECT * FROM furniture";
  $result = mysql_query($sql, $link) or die("クエリの送信に失敗しました。<br />SQL:".$sql);

  //結果セットの行数を取得する
  $rows = mysql_num_rows($result);

  //表示するデータを作成
  if($rows){
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td>".$row["id"]."</td><td>".$row["friction"]."</td><td>".$row["restitution"]."</td><td>".$row["name"]."</td>";
      $tempHtml .= "</tr>\n";
    }
    $msg = $rows."件のデータがあります。";
  }else{
    $msg = "データがありません。";
  }

  //結果保持用メモリを開放する
  mysql_free_result($result);

  // MySQLへの接続を閉じる
  mysql_close($link) or die("MySQL切断に失敗しました。");
?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
    <title>全件表示</title>
  </head>
  <body>
    <h3>全件表示</h3>
    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>摩擦</td><td>反発</td><td>name</td></tr>
      <?= $tempHtml ?>
    </table>

    <hr>
    <h3>boxを表示</h3>
    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>摩擦</td><td>反発</td><td>name</td></tr>
      <?= $tempHtml ?>
    </table>

  </body>
</html>

//２個目のテーブルを表示させる
