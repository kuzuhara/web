<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";



  function update($id, $name, $friction, $restitution){

    $sql = sprintf("UPDATE furniture SET name = %s, friction = %s ,restitution = %s WHERE id = %s", quote_smart($name),$friction,$restitution, $id);

    //���M����
    $result_flag = mysql_query($sql);

    if (!$result_flag) {
      die('UPDATE�N�G���[�����s���܂����B'.mysql_error());
    }
  }

  function quote_smart($value)
  {
      // ���l�ȊO���N�I�[�g����
      if (!is_numeric($value)) {
        $value = "'" . mysql_real_escape_string($value) . "'";
      }
      return $value;
  }

$link = mysql_connect($url,$user,$pass) or die("MySQL�ւ̐ڑ��Ɏ��s���܂����B");

  // �f�[�^�x�[�X��I������
  $sdb = mysql_select_db($db,$link) or die("�f�[�^�x�[�X�̑I���Ɏ��s���܂����B");

  // �N�G���𑗐M����
  $sql = "SELECT * FROM furniture";
  $result = mysql_query($sql, $link) or die("�N�G���̑��M�Ɏ��s���܂����B<br />SQL:".$sql);


  $result = mysql_query('SELECT id,name,friction,restitution FROM furniture');
  if (!$result) {
    die('SELECT�N�G���[�����s���܂����B'.mysql_error());
  }




  $i = $_GET['id-update'];
  $j = $_GET['friction-update'];
  $k = $_GET['restitution-update'];
  $l = $_GET['name-update'];

  echo $i;
  echo $j;
  echo $k;
  echo $l;

  update($i,$l,$j,$k);


  if($rows){
    $i=0;
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td>".$row["id"]."</td><td>".$row["friction"]."</td><td>".$row["restitution"]."</td><td>".$row["name"]."</td>";
      $tempHtml .= "</tr>\n";
      $fullname=sprintf("%s%s,", $fullname, $row["name"]);
      $friction[$i]=$row["friction"];
      $restitution[$i]=$row["restitution"];
      $i++;
    }
    $jsonFriction=json_encode($friction);
    $jsonRestitution=json_encode($restitution);
    $msg = $rows."���̃f�[�^������܂��B";
    $chunk = $rows;
  }else{
    $msg = "�f�[�^������܂���B";
  }

$close_flag = mysql_close($link);

if ($close_flag){
    print('<p>�ؒf�ɐ������܂����B</p>');
}
echo "<a href='control.php'>�߂�</a>";
?>

<html>
<head>
<title>UPDATE</title>
<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
</head>

<body>
 <a href='control.php'>�߂�</a>
</body>

