<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Reverse Text</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<main>
		<header>
			<h1>Reverse Text</h1>
		</header>
		<div id="form-box">
			<form action="index.php" method="get">
				<textarea name="strng" placeholder="Text to reverse" autofocus></textarea>
				<input type="submit" value="Reverse">
			</form>
		</div>
		<div id="reversed-box">
			
				<?php 
					error_reporting(E_ERROR | E_PARSE);
					function utf8_strrev($str){
					    preg_match_all('/./us', $str, $ar);
					    return join('', array_reverse($ar[0]));
					}
					$str = $_GET['strng'];
					echo "<textarea id='reversed' placeholder='Reversed text'>";
					echo utf8_strrev($str);
					echo "</textarea>";
				?>
			</textarea>
		</div>
	</main>
</body>
</html>