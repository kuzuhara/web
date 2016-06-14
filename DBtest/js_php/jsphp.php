<html>
<head>
<title>jsphp</title>
<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
</head>

<body>
<?php
$foo = "foo";
?>
<script type="text/javascript">var foo = "<?= $foo ?>";</script>
<script type="text/javascript" src="script.js"></script>

</body>
</html>

