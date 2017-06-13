<?php
	
	include 'connect.php';
	// 分页
	$page = isset($_GET['page']) ? $_GET['page'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 20;
	// $id = isset($_GET['id']) ? $_GET['id'] : 1;

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

	//关闭连接
	$conn->close();
?>