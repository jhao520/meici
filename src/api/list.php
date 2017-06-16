<?php
	
	include 'connect.php';
	// 分页
	$page = isset($_GET['page']) ? $_GET['page'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 20;
	$desc = isset($_GET['desc']) ? $_GET['desc'] : '';

	// SQL语句

	// 查询数据库
	if($desc == "降序"){
		$sql = "select * from (select * from goods order by price desc) temp_table limit ".($page-1)*$qty.",".$qty;
	}else if($desc == "升序"){
		$sql = "select * from (select * from goods order by price asc) temp_table limit ".($page-1)*$qty.",".$qty;
	}else{
		$sql = "select * from goods limit ".($page-1)*$qty.",".$qty;
	}	


	// 获取查询结果
	$result = $conn->query($sql);

	// 使用查询结果
	$rows = $result->fetch_all(MYSQLI_ASSOC);

	// 查询总数
	
	$res = array(
		'pageNum'=>$page,
		'qty'=>$qty,
		'价格排序'=>$desc,
		'total'=>$conn->query('select count(*) from goods')->fetch_row()[0],
		'data'=>$rows,
	);



	echo json_encode($res,JSON_UNESCAPED_UNICODE);

	//关闭连接
	$conn->close();
?>