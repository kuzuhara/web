<?php
  $url = "mysql103.phy.lolipop.lan";
  $user = "LAA0737712";
  $pass = "Aodai7010";
  $db = "LAA0737712-aodaisimu";

  // MySQL�֐ڑ�����
  $link = mysql_connect($url,$user,$pass) or die("MySQL�ւ̐ڑ��Ɏ��s���܂����B");

  // �f�[�^�x�[�X��I������
  $sdb = mysql_select_db($db,$link) or die("�f�[�^�x�[�X�̑I���Ɏ��s���܂����B");

  // �N�G���𑗐M����
  $sql = "SELECT * FROM furniture";
  $result = mysql_query($sql, $link) or die("�N�G���̑��M�Ɏ��s���܂����B<br />SQL:".$sql);

  //���ʃZ�b�g�̍s�����擾����
  $rows = mysql_num_rows($result);

  //�\������f�[�^���쐬
  if($rows){
    while($row = mysql_fetch_array($result)) {
      $tempHtml .= "<tr>";
      $tempHtml .= "<td>".$row["id"]."</td><td>".$row["friction"]."</td><td>".$row["restitution"]."</td><td>".$row["name"]."</td>";
      $tempHtml .= "</tr>\n";
    }
    $msg = $rows."���̃f�[�^������܂��B";
  }else{
    $msg = "�f�[�^������܂���B";
  }

  //���ʕێ��p���������J������
  mysql_free_result($result);

  // MySQL�ւ̐ڑ������
  mysql_close($link) or die("MySQL�ؒf�Ɏ��s���܂����B");
?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
    <title>�S���\��</title>
  </head>
  <body>
    <h3>�S���\��</h3>
    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>���C</td><td>����</td><td>name</td></tr>
      <?= $tempHtml ?>
    </table>

    <hr>
    <h3>box��\��</h3>
    <?= $msg ?>
    <table width = "200" border = "0">
      <tr bgcolor="##ccffcc"><td>id</td><td>���C</td><td>����</td><td>name</td></tr>
      <?= $tempHtml ?>
    </table>

  </body>
</html>

//�Q�ڂ̃e�[�u����\��������
