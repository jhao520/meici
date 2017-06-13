require(['config'],function(){

	require(['jquery','animation'],function($,animation){
		// 导航 鼠标划过显示
		animation.nav();

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
					<li data-guid="${item.id}">
						<a class="pro_pic" href="javascript:;"><img src="../img/${item.imgurl}-1.jpg" alt="${item.name}"></a>
						<a class="pro_tit" href="javascript:;">
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
		var listr = '';
		$( ".list_scr" ).on('click','.list_title',function(){
			$(this).parent().siblings().find('.list_cond').slideUp();
			$(this).next().slideToggle();

			if($(this).find('.font_s').text() == '-'){
				$('.font_s').text('+');
			}else{
				$(this).parent().siblings().find('.font_s').text('+');
				$(this).find('.font_s').text('-');
			}

		})
		// 打开子选项
		.on('click','.pro_cond span',function(){
			if(!$(this).closest('li').hasClass('li_opt_one')){
				$(this).closest('li').find('ul').slideToggle();
				$(this).find('i').toggleClass('open');
			}
		})
		// 勾选全部
		.on('click','.li_opt_all',function(){
			$('.list_scr_all').show();
			$(this).parent().children().find('i').toggleClass('check');
		})
		// 勾选单个
		.on('click','.li_opt_one',function(){
			$(this).find('i').toggleClass('check');

			$('.list_scr_all').show();

			if($(this).find('i').hasClass('check')){
				listr += $(this).find('a').text() + ' ';
				var lispan = $(this).closest('.list_cond').prev().children().eq(0).text();
				console.log(listr);

				$('.las_c').text(listr);

				$('.las_c span').text(lispan);

			}

			if($(this).parent().find('.li_opt_one').find('i').hasClass('check')){
				$(this).parent().find('.li_opt_all i').addClass('check');
			}else{
				$(this).parent().find('.li_opt_all i').removeClass('check');
			}
		});


		// 侧导航随窗口滚动置顶
		let theTop = $( ".list_scr" )[0].offsetTop;
		$(window).scroll(function(){
		let theBot = $('.li_pro_con')[0].offsetTop + $('.li_pro_con').outerHeight() - $( ".list_scr" ).outerHeight();
			// console.log(theTop,theBot,$(window).scrollTop());
			if($(window).scrollTop() > theTop){
				$( ".list_scr" ).css({position:'fixed',top:10});
			}
			if($(window).scrollTop() < theTop){
				$( ".list_scr" ).css({position:'relative',top:0});
			}
			if($(window).scrollTop() >= theBot){
				$( ".list_scr" ).css({position:'absolute',top:theBot});
			}
		});

		// 跳转到详情页，并传送id
		$('.li_pro_con').on('click','li',function(){
			var id = $(this).data('guid');
			window.location.href = '../html/details.html?id='+ id;
		});

	});
});