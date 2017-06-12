require(['config'],function(){

	require(['jquery','header','gdszoom'],function($,header,gdsz){
		console.log($,header,gdsz);
		header.nav();

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