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

  // MySQL�֐ڑ�����
  $link = mysql_connect($url,$user,$pass) or die("MySQL�ւ̐ڑ��Ɏ��s���܂����B");

  // �f�[�^�x�[�X��I������
  $sdb = mysql_select_db($db,$link) or die("�f�[�^�x�[�X�̑I���Ɏ��s���܂����B");

  // �N�G���𑗐M����
  $sql = "SELECT * FROM furniture";
  $result = mysql_query($sql, $link) or die("�N�G���̑��M�Ɏ��s���܂����B<br />SQL:".$sql);
  $sql2 = "SELECT * FROM box";
  $result2 = mysql_query($sql2, $link) or die("�N�G���̑��M�Ɏ��s���܂����B<br />SQL:".$sql2);
  $sql3 = "SELECT * FROM cylinder";
  $result3 = mysql_query($sql3, $link) or die("�N�G���̑��M�Ɏ��s���܂����B<br />SQL:".$sql3);

  //���ʃZ�b�g�̍s�����擾����
  $rows = mysql_num_rows($result);
  $rows2 = mysql_num_rows($result2);
  $rows3 = mysql_num_rows($result3);

  function insert($id, $name, $friction, $restitution){
    $sql=sprintf("INSERT INTO furniture (id, name, friction, restitution) VALUES (%d,'%s',%f,%f)",$id,$name,$friction,$restitution);
    print($sql);
    $result_flag = mysql_query($sql);
    if (!$result_flag) {
      die('INSERT�N�G���[�����s���܂����B'.mysql_error());
    }
  }
  //insert(1,'�^���X', 0.1, 0.8);


  function quote_smart($value){
    // ���l�ȊO���N�I�[�g����
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
      die('�폜�Ɏ��s���܂����B'.mysql_error());
    }
  }
  //delete(0,'�^���X', 0.1, 0.8);

function update($id, $name, $friction, $restitution){
    $sql=sprintf("UPDATE furniture SET (id, name, friction, restitution) VALUES (%d,'%s',%f,%f)",$id,$name,$friction,$restitution);
    print($sql);
    $result_flag = mysql_query($sql);
    if (!$result_flag) {
      die('UPDATE�N�G���[�����s���܂����B'.mysql_error());
    }
  }


  function dummy(){
    echo "aaaa";
  }

  //�\������f�[�^���쐬
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
    $msg = $rows."���̃f�[�^������܂��B";
    $chunk = $rows;
  }else{
    $msg = "�f�[�^������܂���B";
  }

  if($rows2){
    while($row2 = mysql_fetch_array($result2)) {
      $tempHtml2 .= "<tr>";
      $tempHtml2 .= "<td>".$row2["id"]."</td><td>".$row2["wX"]."</td><td>".$row2["wY"]."</td><td>".$row2["wZ"]."</td><td>".$row2["x"]."</td><td>".$row2["y"]."</td><td>".$row2["z"]."</td><td>".$row2["rX"]."</td><td>".$row2["rY"]."</td><td>".$row2["rZ"]."</td><td>".$row2["mass"]."</td><td>".$row2["density"]."</td><td>".$row2["useMass"]."</td><td>".$row2["color"]."</td><td>".$row2["texture"]."</td><td>".$row2["useTexture"]."</td>";
      $tempHtml2 .= "</tr>\n";
    }
    $msg2 = $rows2."���̃f�[�^������܂��B";
  }else{
    $msg2 = "�f�[�^������܂���B";
  }

  if($rows3){
    while($row3 = mysql_fetch_array($result3)) {
      $tempHtml3 .= "<tr>";
      $tempHtml3 .= "<td>".$row3["id"]."</td><td>".$row3["radius"]."</td><td>".$row3["height"]."</td><td>".$row3["x"]."</td><td>".$row3["y"]."</td><td>".$row3["z"]."</td><td>".$row3["rX"]."</td><td>".$row3["rY"]."</td><td>".$row3["rZ"]."</td><td>".$row3["mass"]."</td><td>".$row3["density"]."</td><td>".$row3["useMass"]."</td><td>".$row3["color"]."</td><td>".$row3["texture"]."</td><td>".$row3["useTexture"]."</td>";
      $tempHtml3 .= "</tr>\n";
    }
    $msg3 = $rows3."���̃f�[�^������܂��B";
  }else{
    $msg3 = "�f�[�^������܂���B";
  }
  //���ʕێ��p���������J������
  mysql_free_result($result);
  mysql_free_result($result2);
  mysql_free_result($result3);

  // MySQL�ւ̐ڑ������
  mysql_close($link) or die("MySQL�ؒf�Ɏ��s���܂����B");
  echo $fullname;
?>


<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html"; charset="SHIFT-JIS" >
    <title>�S���\��</title>
    <link rel="stylesheet" type="text/css" href="style.css" >


  </head>
  <body>

    <div id="furniture-box">
    <h3>furniture�e�[�u��</h3>
    <?= $msg ?>
    <table width = "200" border = "1">
      <tr bgcolor="##ccffcc"><th>ID</th><th>���O</th><th>���C</th><th>����</th></tr>
      <?= $tempHtml ?>
    </table>
    </div>

<!-- �����E�Ƌ�������ɓn����悤�ɂ��� -->
    <hr>

    <div id="a-box">
    <h3>�f�[�^�̒ǉ�</h3>
    <form name="insert" method="get" action="insert.php">
      <table>
        <tr><td>ID</td><td><input type = "number" name ="id-insert"></td></tr>
        <tr><td>���O</td><td><input type = "text" name ="name-insert"></td></tr>
        <tr><td>���C</td><td><input type = "number" name ="friction-insert" max="1.00" min="0.01" step="0.01">  </td></tr>
        <tr><td>����</td><td><input type = "number" name ="restitution-insert" max="1.00" min="0.01" step="0.01">  </td></tr>
      </table>

        <input id="roomCheck" type = "text" name ="checktest">

<!--      <p>�`�F�b�N�p�Ƌ�ID�F<select id="roomCheck" name="roomCheck"></select></p> -->

      <button type="submit" name="insertButton" value="�ǉ�">�ǉ�</button>
    </form>
    </div>


    <div id="b-box">
    <h3>�f�[�^�̍폜</h3>
    <form method="post" action="delete.php">
      <p>�폜����Ƌ�ID�F<select id="roomSelect" name="roomId" onChange="this.form.submit()"></select></p>
      <!-- <p>ID   <input type = "text" name ="id-delete"></p> -->
      <button type="submit" name="deleteButton" value="�폜">�폜</button>
    </form>
    </div>


    <div id="c-box">
    <h3>�f�[�^�̍X�V</h3>
    <form method="get" action="update2.php">
      <table>
        <tr><td>ID</td><td><input type = "number" name ="id-update"></td></tr>
        <tr><td>���O</td><td><input type = "text" name ="name-update"></td></tr>
        <tr><td>���C</td><td><input type = "number" name ="friction-update" max="1.00" min="0.01" step="0.01"></td></tr>
        <tr><td>����</td><td><input type = "number" name ="restitution-update" max="1.00" min="0.01" step="0.01"></td></tr>
      </table>
      <button type="submit" name="updateButton" value="�X�V">�X�V</button>
    </form>
    </div>

    <br>

    <p style="clear:left;">
    <hr>
    <div id="box-box">
    <h3>box�e�[�u��</h3>
    <?= $msg2 ?>
    <table class="boxTable" width = "200" border = "0">
      <tr bgcolor="##ccffff">
        <th>ID</th>
        <th>��x</th>
        <th>��y</th>
        <th>��z</th>
        <th>x</th>
        <th>y</th>
        <th>z</th>
        <th>rX</th>
        <th>rY</th>
        <th>rZ</th>
        <th>����</th>
        <th>��d</th>
        <th>useMass</th>
        <th>�F</th>
        <th>�e�N�X�`��</th>
        <th>useTexture</th>
      </tr>
      <?= $tempHtml2 ?>
    </table>
    </div>
    </p>

    <p style="clear:left;">
    <hr>
    <div id="box-box">
    <h3>cylinder�e�[�u��</h3>
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
        <th>����</th>
        <th>��d</th>
        <th>useMass</th>
        <th>�F</th>
        <th>�e�N�X�`��</th>
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
