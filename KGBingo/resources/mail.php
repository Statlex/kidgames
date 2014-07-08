<?php 

	$name = $_GET['name'];
	$words = $_GET['words'];
	$description = $_GET['description'];

	$message = 'name:'.$name.'words:'.$words.'description:'.$description;

	mail("turovtsov@mail.ru", "Bingo - proposition", $message);

	echo $message;

?>