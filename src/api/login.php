<?php
	
	include 'connect.php';
	// 接收数据
	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';

	// 加密密码
	$password = md5($password);

	$msq = "select * from user";

	$res = $conn->query($msq);

	// 使用查询结果
	$rows = $res->fetch_all(MYSQLI_ASSOC);

	// 获取数组长度
	// $length = count($rows);
	
	
	for($i=0;$i<count($rows);$i++){
		$user=array_search($username,$rows[$i]);
		$pswd=array_search($password,$rows[$i]);

		if($user!=false && $pswd!=false){
			echo '1';
		}else{
			echo '0';
		}

	}

	//关闭连接
	$conn->close();

?>