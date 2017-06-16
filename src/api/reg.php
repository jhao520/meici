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

	// 获取全部的用户名
	$uname = array_column($rows,"username");

	// 遍历所有用户名，如有重复，返回1
	for($i=0;$i<count($uname);$i++){
		if($username === $uname[$i]){
			echo '1';
			//关闭连接
			$conn->close();
			return;
			exit;
		}else{
			echo '0';
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