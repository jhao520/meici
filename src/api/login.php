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

	$uname = array_column($rows,"username");
	$pswd = array_column($rows,"password");

	for($i=0;$i<count($uname);$i++){
		for($j=0;$j<count($pswd);$j++){
			if($username == $uname[$i] && $password == $pswd[$j]){
				// echo json_encode('Error: 用户名重复',JSON_UNESCAPED_UNICODE);
				// echo json_encode($uname,JSON_UNESCAPED_UNICODE);
				echo 'true';
				//关闭连接
				$conn->close();
				return;
				exit;
			}
		}
	}


	//关闭连接
	$conn->close();

?>