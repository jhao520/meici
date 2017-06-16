require(['config'],function(){

	require(['jquery','animation','common','cookie','loginstatus'],function($,animation,com,cookie,loginstatus){

		// 检测登录状态
		loginstatus.loginstatus();
		// 导航 鼠标划过显示
		animation.nav();
		// 顶部app二维码
		animation.sideApp($('.down_ewm_app'),$('.down_app'));
		// 右侧边栏app二维码
		animation.sideApp($('.sidebar_app'),$('.side_app_ewm')); 
		// 顶部购物车
		animation.sideApp($('.shoping_car'),$('.header_car')); 

		// 检测cookie
		var goodslist = getCookie('goodslist');
		goodslist = goodslist ? JSON.parse(goodslist) : [];
		// 顶部购物车列表
		cookie.renderTop(goodslist);

		let pageNum = 1;
		let qty = 20;
		let pageQty = 1;

		// 请求数据
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

		// 设置分页
		$('.pagination').on('click','.page_num',function(){

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

		}).on('click','.page_prev',function(){
			pageNum--;
			if(pageNum <= 1){
				pageNum = 1;
			}
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
		}).on('click','.page_next',function(){
			pageNum++;
			if(pageNum >= pageQty){
				pageNum = pageQty
			}
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

		// 价格排序
		$('.price_px i').removeClass();
		var on_off = false;
		$('.li_screen').on('click','.price_px',function(){
			if(on_off){
				var desc = '降序';
				$(this).find('i').addClass('desc').removeClass('asc');
				on_off = false;
			}else{
				var desc = '升序';
				$(this).find('i').addClass('asc').removeClass('desc');
				on_off = true;
			}
			$.ajax({
				url:'../api/list.php',
				dataType:'json',
				data:{
					page:pageNum,
					qty:qty,
					desc:desc,
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
						<p><span>${Number(item.price)}</span></p>
					</li>
				`
			}).join('');

			$('.li_pro_con ul').html(html);

			pageQty = Math.ceil(res.total/res.qty);

			var page_str = '<span class="page_prev">上一页</span>';
			for(var i=1;i<=pageQty;i++){
				page_str += `<span ${res.pageNum==i?'class="active page_num"':'class="page_num"'}>${i}</span>`
			}
			page_str += '<span class="page_next">下一页</span>';

			$('.pagination').html(page_str);


			if(pageNum == 1){
				$('.page_prev').hide().siblings().show();
			}else if(pageNum == pageQty){
				$('.page_next').hide().siblings().show();
			}

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
		}).on('click','.clear_all',function(){
			$(this).prev().html();
			$(this).closest('.list_scr_all ').hide();
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

		// 删除列表商品-->顶部
		$('.hcc_info').on('click','.hcc_Lis_del',function(){
			delPro($(this))
		});

		// 删除商品的 cookie + 页面内容
		function delPro(current){
			console.log(current[0]);
			cookie.delCookie(current,goodslist);
			cookie.renderTop(goodslist);
			cookie.renderDoc(goodslist);
			
			if($('.hcc_info_c').has('.hcc_info_c_lis')[0] == undefined){
				$('.hcc_info').hide().siblings().show();
			}

			if($('.cart_con_list table').has('tr')[0] == undefined){
				$('.cart_content').hide();
				$('.cart_none').show();
			}
		}

	});
});