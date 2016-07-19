<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";
  $friction;
  $restitution;
  $i;
  $fullname="";
  $selectId;


//  $test=[];
//  $test[0]="aaa";
//  $test[1]="bbb";
//  $jsonTest=json_encode($test);

  // MySQLへ接続する
  $link = mysql_connect($url,$user,$pass) or die("MySQLへの接続に失敗しました。");

  // データベースを選択する
  $sdb = mysql_select_db($db,$link) or die("データベースの選択に失敗しました。");

  // クエリを送信する
  $sql = "SELECT * FROM furniture";
  $result = mysql_query($sql, $link) or die("クエリの送信に失敗しました。<br />SQL:".$sql);
  $sql2 = "SELECT * FROM box";
  $result2 = mysql_query($sql2, $link) or die("クエリの送信に失敗しました。<br />SQL:".$sql2);
  $sql3 = "SELECT * FROM cylinder";
  $result3 = mysql_query($sql3, $link) or die("クエリの送信に失敗しました。<br />SQL:".$sql3);

  //結果セットの行数を取得する
  $rows = mysql_num_rows($result);
  $rows2 = mysql_num_rows($result2);
  $rows3 = mysql_num_rows($result3);

  function insert($id, $name, $friction, $restitution){
    $sql=sprintf("INSERT INTO furniture (id, name, friction, restitution) VALUES (%d,'%s',%f,%f)",$id,$name,$friction,$restitution);
    print($sql);
    $result_flag = mysql_query($sql);
    if (!$result_flag) {
      die('INSERTクエリーが失敗しました。'.mysql_error());
    }
  }
  //insert(1,'タンス', 0.1, 0.8);


  function quote_smart($value){
    // 数値以外をクオートする
    if(!is_numeric($value)) {
      $value = '"' . mysql_real_escape_string($value) . '"';
    }
    return $value;
  }


  function delete($id){
    $sql = sprintf("DELETE FROM furniture WHERE id = %s", $id);
    print($sql);
    $result_flag = mysql_query($sql);
    if (!$result) {
      die('削除に失敗しました。'.mysql_error());
    }
  }
  //delete(0,'タンス', 0.1, 0.8);

function update($id, $name, $friction, $restitution){
    $sql=sprintf("UPDATE furniture SET (id, name, friction, restitution) VALUES (%d,'%s',%f,%f)",$id,$name,$friction,$restitution);
    print($sql);
    $result_flag = mysql_query($sql);
    if (!$result_flag) {
      die('UPDATEクエリーが失敗しました。'.mysql_error());
    }
  }


  function dummy(){
    echo "aaaa";
  }

  //表示するデータを作成
  if($rows){
    $i=0;
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td align=right>".$row["id"]."</td><td>".$row["name"]."</td><td align=right>".$row["friction"]."</td><td align=right>".$row["restitution"]."</td>";
      $tempHtml .= "</tr>\n";
//      $name[$i]=(string)$row["name"];
//      echo $name[$i];
//      $fullname+=$row["name"]+",";
      $selectId[$i]=$row["id"];
      $fullname=sprintf("%s%s,", $fullname, $row["name"]);
      $friction[$i]=$row["friction"];
      $restitution[$i]=$row["restitution"];
      $i++;
    }
//    $jsonName=json_encode($name);
    $jsonSelectId=json_encode($selectId);
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
      $tempHtml2 .= "<td>".$row2["id"]."</td><td>".$row2["wX"]."</td><td>".$row2["wY"]."</td><td>".$row2["wZ"]."</td><td>".$row2["x"]."</td><td>".$row2["y"]."</td><td>".$row2["z"]."</td><td>".$row2["rX"]."</td><td>".$row2["rY"]."</td><td>".$row2["rZ"]."</td><td>".$row2["mass"]."</td><td>".$row2["density"]."</td><td>".$row2["useMass"]."</td><td>".$row2["color"]."</td><td>".$row2["texture"]."</td><td>".$row2["useTexture"]."</td>";
      $tempHtml2 .= "</tr>\n";
    }
    $msg2 = $rows2."件のデータがあります。";
  }else{
    $msg2 = "データがありません。";
  }

  if($rows3){
    while($row3 = mysql_fetch_array($result3)) {
      $tempHtml3 .= "<tr>";
      $tempHtml3 .= "<td>".$row3["id"]."</td><td>".$row3["radius"]."</td><td>".$row3["height"]."</td><td>".$row3["x"]."</td><td>".$row3["y"]."</td><td>".$row3["z"]."</td><td>".$row3["rX"]."</td><td>".$row3["rY"]."</td><td>".$row3["rZ"]."</td><td>".$row3["mass"]."</td><td>".$row3["density"]."</td><td>".$row3["useMass"]."</td><td>".$row3["color"]."</td><td>".$row3["texture"]."</td><td>".$row3["useTexture"]."</td>";
      $tempHtml3 .= "</tr>\n";
    }
    $msg3 = $rows3."件のデータがあります。";
  }else{
    $msg3 = "データがありません。";
  }
  //結果保持用メモリを開放する
  mysql_free_result($result);
  mysql_free_result($result2);
  mysql_free_result($result3);

  // MySQLへの接続を閉じる
  mysql_close($link) or die("MySQL切断に失敗しました。");
  echo $fullname;
?>


<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html"; charset="SHIFT-JIS" >
    <title>全件表示</title>
    <link rel="stylesheet" type="text/css" href="style.css" >


  </head>
  <body>

    <div id="furniture-box">
    <h3>furnitureテーブル</h3>
    <?= $msg ?>
    <table width = "200" border = "1">
      <tr bgcolor="##ccffcc"><th>ID</th><th>名前</th><th>摩擦</th><th>反発</th></tr>
      <?= $tempHtml ?>
    </table>
    </div>

<!-- 部屋・家具をここに渡せるようにする -->
    <hr>

    <div id="a-box">
    <h3>データの追加</h3>
    <form name="insert" method="get" action="insert.php">
      <table>
        <tr><td>ID</td><td><input type = "number" name ="id-insert"></td></tr>
        <tr><td>名前</td><td><input type = "text" name ="name-insert"></td></tr>
        <tr><td>摩擦</td><td><input type = "number" name ="friction-insert" max="1.00" min="0.01" step="0.01">  </td></tr>
        <tr><td>反発</td><td><input type = "number" name ="restitution-insert" max="1.00" min="0.01" step="0.01">  </td></tr>
      </table>

        <input id="roomCheck" type = "text" name ="checktest">

<!--      <p>チェック用家具ID：<select id="roomCheck" name="roomCheck"></select></p> -->

      <button type="submit" name="insertButton" value="追加">追加</button>
    </form>
    </div>


    <div id="b-box">
    <h3>データの削除</h3>
    <form method="post" action="delete.php">
      <p>削除する家具ID：<select id="roomSelect" name="roomId" onChange="this.form.submit()"></select></p>
      <!-- <p>ID   <input type = "text" name ="id-delete"></p> -->
      <button type="submit" name="deleteButton" value="削除">削除</button>
    </form>
    </div>


    <div id="c-box">
    <h3>データの更新</h3>
    <form method="get" action="update2.php">
      <table>
        <tr><td>ID</td><td><input type = "number" name ="id-update"></td></tr>
        <tr><td>名前</td><td><input type = "text" name ="name-update"></td></tr>
        <tr><td>摩擦</td><td><input type = "number" name ="friction-update" max="1.00" min="0.01" step="0.01"></td></tr>
        <tr><td>反発</td><td><input type = "number" name ="restitution-update" max="1.00" min="0.01" step="0.01"></td></tr>
      </table>
      <button type="submit" name="updateButton" value="更新">更新</button>
    </form>
    </div>

    <br>

    <p style="clear:left;">
    <hr>
    <div id="box-box">
    <h3>boxテーブル</h3>
    <?= $msg2 ?>
    <table class="boxTable" width = "200" border = "0">
      <tr bgcolor="##ccffff">
        <th>ID</th>
        <th>幅x</th>
        <th>幅y</th>
        <th>幅z</th>
        <th>x</th>
        <th>y</th>
        <th>z</th>
        <th>rX</th>
        <th>rY</th>
        <th>rZ</th>
        <th>質量</th>
        <th>比重</th>
        <th>useMass</th>
        <th>色</th>
        <th>テクスチャ</th>
        <th>useTexture</th>
      </tr>
      <?= $tempHtml2 ?>
    </table>
    </div>
    </p>

    <p style="clear:left;">
    <hr>
    <div id="box-box">
    <h3>cylinderテーブル</h3>
    <?= $msg3 ?>
    <table class="boxTable" width = "200" border = "0">
      <tr bgcolor="##ccffff">
        <th>ID</th>
        <th>radius</th>
        <th>height</th>
        <th>x</th>
        <th>y</th>
        <th>z</th>
        <th>rX</th>
        <th>rY</th>
        <th>rZ</th>
        <th>質量</th>
        <th>比重</th>
        <th>useMass</th>
        <th>色</th>
        <th>テクスチャ</th>
        <th>useTexture</th>
      </tr>
      <?= $tempHtml3 ?>
    </table>
    </div>
    </p>

    <script type="text/javascript">var rows = "<?= $rows ?>";</script>
    <script type="text/javascript">var selectId = JSON.parse('<?php echo  $jsonSelectId; ?>');</script>
    <script type="text/javascript">var restitution = JSON.parse('<?php echo  $jsonRestitution; ?>');</script>
    <script type="text/javascript">
    //        var name = JSON.parse('<?php echo  $jsonName; ?>');
    </script>

    <script type="text/javascript">
      var test=[];
      test[0] = "efg";
      test[1] = "def";
      var fullname="<?php echo $fullname ?>";
    </script>
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>
