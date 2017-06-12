require(['config'],function(){

	require(['jquery','animation','gdszoom'],function($,animation,gdsz){

		// 导航 鼠标划过显示
		animation.nav();

		$('.pic_large').gdszoom({width:100,height:100});


		/*$.ajax({
			url:'../api/list.php',
			dataType:'json',
			data:{
				page:pageNum,
				qty:qty
			},
			success:function(res){
				showList(res);
			}
		});*/


	});
});