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
      die('INSERT�N�G���[�����s���܂����B'.mysql_error());
    }
  }




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

//insert(1,'�^���X', 0.1, 0.8);
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

  //�\������f�[�^���쐬
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
//  echo $fullname;

echo "<a href='control.php'>�߂�</a>";

?>

<html>
  <head>
    <h3>furniture�e�[�u��</h3>
    <meta http-equiv="Content-Type" content="text/html" charset="SHIFT-JIS"; >
    <title>�ǉ��\��</title>
  </head>
  <body>

    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>name</td><td>���C</td><td>����</td></tr>
      <?= $tempHtml ?>
    </table>

    <hr>

    <p><?php echo 'ID : ', $a , ' name : ' , $b,' ���C : ',$c ,' ���� : ', $d ; ?></p>
 <br>
 <a href='control.php'>�߂�</a>
  </body>
