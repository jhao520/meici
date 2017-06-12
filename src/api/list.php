<?php
	
	// 1、链接数据库
	// 配置参数
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = 'meici';

	// 连接数据库
	$conn = new mysqli($servername,$username,$password,$database);

	// 检测连接
	if($conn->connect_errno){
		die('连接失败'.$conn->connect_errno);
	}

	// 设置字符集
	$conn->set_charset('utf8');

	// 分页
	$page = isset($_GET['page']) ? $_GET['page'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 20;

	// 查询数据库
	$sql = "select * from goods limit ".($page-1)*$qty.",".$qty;


	// 获取查询结果
	$result = $conn->query($sql);

	// 使用查询结果
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	// 查询总数
	
	$res = array(
		'pageNum'=>$page,
		'qty'=>$qty,
		'total'=>$conn->query('select count(*) from goods')->fetch_row()[0],
		'data'=>$rows,
	);



	echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>