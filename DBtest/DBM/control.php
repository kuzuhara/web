<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";
  $friction;
  $restitution;
  $i;
  $fullname="";


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

  //���ʃZ�b�g�̍s�����擾����
  $rows = mysql_num_rows($result);
  $rows2 = mysql_num_rows($result2);


  function insert($id, $name, $friction, $restitution){
    $sql = "INSERT INTO furniture (id, name, friction, restitution) VALUES ($id, $name, $friction, $restitution)";
    $result_flag = mysql_query($sql);
    print 'NNN';
    if (!$result) {
      die('SELECT�N�G���[�����s���܂����B'.mysql_error());
      print 'mmm';
    }
  }

//  insert(1,'�^���X', 0.1, 0.8);

  function quote_smart($value)
  {
    // ���l�ȊO���N�I�[�g����
    if (!is_numeric($value)) {
        $value = '"' . mysql_real_escape_string($value) . '"';
    }
    return $value;
  }

  //�\������f�[�^���쐬
  if($rows){
    $i=0;
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td>".$row["id"]."</td><td>".$row["friction"]."</td><td>".$row["restitution"]."</td><td>".$row["name"]."</td>";
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
    $msg = $rows."���̃f�[�^������܂��B";
    $chunk = $rows;
  }else{
    $msg = "�f�[�^������܂���B";
  }
  if($rows2){
    while($row2 = mysql_fetch_array($result2)) {
      $tempHtml2 .= "<tr>";
      $tempHtml2 .= "<td>".$row2["wX"]."</td><td>".$row2["wY"]."</td><td>".$row2["wZ"]."</td><td>".$row2["x"]."</td><td>".$row2["y"]."</td><td>".$row2["z"]."</td><td>".$row2["rX"]."</td><td>".$row2["rY"]."</td><td>".$row2["rZ"]."</td><td>".$row2["mass"]."</td><td>".$row2["density"]."</td><td>".$row["useMass"]."</td><td>".$row2["color"]."</td><td>".$row2["texture"]."</td><td>".$row2["useTexture"]."</td>";
      $tempHtml2 .= "</tr>\n";
    }
    $msg2 = $rows2."���̃f�[�^������܂��B";
  }else{
    $msg2 = "�f�[�^������܂���B";
  }

  //���ʕێ��p���������J������
  mysql_free_result($result);
  mysql_free_result($result2);

  // MySQL�ւ̐ڑ������
  mysql_close($link) or die("MySQL�ؒf�Ɏ��s���܂����B");
  echo $fullname;
?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
    <title>�S���\��</title>
  </head>
  <body>
    <h3>furniture�e�[�u��</h3>
    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>���C</td><td>����</td><td>name</td></tr>
      <?= $tempHtml ?>
    </table>

//�����E�Ƌ�������ɓn����悤�ɂ���
    <hr>
    <form action="cgi-bin/formmail.cgi" method="post">
      <p>�������F<br>
      <select id="roomSelect">
      </select></p>
    </form>


    <hr>
    <form method="post" action="">
    
    <button type="submit" name="button1" value="�_�~�[������">�ǉ�</button>
    </form>
    <hr>

    <h3>box�e�[�u��</h3>
    <?= $msg2 ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffff"><td>id</td><td>��x</td><td>����</td><td>name</td></tr>
      <?= $tempHtml2 ?>
    </table>




<script type="text/javascript">var rows = "<?= $rows ?>";</script>
<script type="text/javascript">var restitution = JSON.parse('<?php echo  $jsonRestitution; ?>');</script>
<script type="text/javascript">
//	var name = JSON.parse('<?php echo  $jsonName; ?>');
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


