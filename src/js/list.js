require(['config'],function(){

	require(['jquery','header'],function($,header){
		header.nav();

		let pageNum = 1;
		let qty = 20;
		let pageQty = 1;

		$.ajax({
			url:'../api/list.php',
			dataType:'json',
			data:{
				page:pageNum,
				qty:qty
			},
			success:function(res){
				showList(res);
			}
		});

		$('.pagination').on('click','span',function(){

			pageNum = Number($(this).text());

			$.ajax({
				url:'../api/list.php',
				dataType:'json',
				data:{
					page:pageNum,
					qty:qty
				},
				success:function(res){
					showList(res);
				}
			});

		});


		function showList(res){
			let html = res.data.map(item=>{
				return `
					<li>
						<a class="pro_pic" href="details.html"><img src="../img/${item.imgurl}" alt="${item.name}"></a>
						<a class="pro_tit" href="details.html">
							<b>${item.brand}</b><br>${item.name}
						</a>
						<p><span>${item.price}</span></p>
					</li>
				`
			}).join('');

			$('.li_pro_con ul').html(html);



			pageQty = Math.ceil(res.total/res.qty);

			var page_str = '<span class="prev">上一页</span>';
			for(var i=1;i<=pageQty;i++){
				page_str += `<span ${res.pageNum==i?'class="active"':''}>${i}</span>`
			}
			page_str += '<span class="next">下一页</span>';

			$('.pagination').html(page_str);

		}



		// 侧导航手风琴效果
		$( ".list_menu" ).on('click','.list_title',function(){
			$(this).parent().siblings().find('.list_cond').slideUp();
			$(this).next().slideToggle();
			if($(this).find('.font_s').text() == '-'){
				$(this).parent().siblings().find('.font_s').text('-');
				$(this).find('.font_s').text('+');
			}else{
				$(this).parent().siblings().find('.font_s').text('+');
				$(this).find('.font_s').text('-');
			}
		});

	});
});