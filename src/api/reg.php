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

	for($i=0;$i<count($uname);$i++){
		if($username == $uname[$i]){
			// echo json_encode('Error: 用户名重复',JSON_UNESCAPED_UNICODE);
			// echo json_encode($uname,JSON_UNESCAPED_UNICODE);
			echo $uname[$i];
			//关闭连接
			$conn->close();
			return;
			exit;
		}
	}

	// 查询数据库
	$sql = "insert into user(username,password) values('$username','$password')";


	// 获取查询结果
	$result = $conn->query($sql);

	if($result){
		echo "数据写入成功";
	}else{
		echo "Error: " . $sql . "<br>" . $conn->error;
	}


	//关闭连接
	$conn->close();

?>