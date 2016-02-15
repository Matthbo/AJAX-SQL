<?php 

$db = new mysqli("localhost", "root", "", "AJAX-SQL");

if($_SERVER["REQUEST_METHOD"] == "GET"){
	$query = "select * from activiteiten";
	$result = $db->query($query);

	$list = $result->fetch_all(MYSQLI_ASSOC);

	echo json_encode($list);
} else if($_SERVER["REQUEST_METHOD"] == "POST"){

	if(isset($_POST['item'])){
		$omschrijving = $db->escape_string($_POST['item']);

		$query = "insert into activiteiten (omschrijving) value ('$omschrijving')";
		$result = $db->query($query);
		echo "success";
	}else if(isset($_POST['edit']) && isset($_POST['id'])){
		$omschrijving = $db->escape_string($_POST['edit']);
		$id = $db->escape_string($_POST['id']);

		$query = "update activiteiten set omschrijving='$omschrijving' where id='$id'";
		$result = $db->query($query);
		echo "success";
	}else if(isset($_POST['delID'])){
		$id = $db->escape_string($_POST['delID']);

		$query = "delete from activiteiten where id='$id'";
		$result= $db->query($query);
		echo "success";
	}else{
		echo "PHP couldn't get an item!";
	}
}
?>