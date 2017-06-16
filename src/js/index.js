require(['config'],function(){
	require(['jquery','animation','common','cookie','loginstatus'],function($,animation,com,cookie,loginstatus){

		// 导航 鼠标划过显示
		animation.nav();
		// banner图轮播
		animation.slides();
		// 顶部app二维码
		animation.sideApp($('.down_ewm_app'),$('.down_app'));
		// 右侧边栏app二维码
		animation.sideApp($('.sidebar_app'),$('.side_app_ewm')); 
		// 顶部购物车
		animation.sideApp($('.shoping_car'),$('.header_car')); 
		// 检测登录状态
		loginstatus.loginstatus();

		// 设置时间戳					 
		var now = new Date();
		now.setDate(now.getFullYear() + 1);

		// 检测cookie
		var goodslist = getCookie('goodslist');
		goodslist = goodslist ? JSON.parse(goodslist) : [];
		// 顶部购物车
		cookie.renderTop(goodslist);

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

		$.ajax({
			url:'api/list.php',
			dataType:'json',
			data:{
				qty:100
			},
			success:function(res){
				let beingSold = res.data.map(item=>{
					return `
						<li class="pro_list_specific" data-guid="${item.id}">
							<a href="javascript:;">
								<img src="img/${item.imgurl}-1.jpg" alt="">
								<p>${item.brand}</p><p>${item.name}</p>
							</a>
							<p class="s_gray">已加入收藏</p>
						</li>
					`;
				}).join('');
				$('.being_sold ul').html(beingSold);

				// 跳转到详情页，并传送id
				$('.being_sold').on('click','li',function(){
					var id = $(this).closest('.pro_list_specific').data('guid');
					window.location.href = 'html/details.html?id='+ id;
				});
				
				// 产品展示轮播
				animation.roll();
			}

		});
	});
});