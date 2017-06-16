require(['config'],function(){

	require(['jquery','animation','gdszoom','common','cookie','loginstatus'],function($,animation,gdsz,com,cookie,loginstatus){

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
		animation.toTop();

		// 检测cookie
		var goodslist = getCookie('goodslist');
		goodslist = goodslist ? JSON.parse(goodslist) : [];
		// 顶部购物车
		cookie.renderTop(goodslist);

		// 截取列表页传来的数据
		var data = location.search.substring(1);
		var arr = data.split('&');
		var id;
		arr.forEach(function(item){
			id = item.split('=')[1];
		});

		// 请求数据，根据列表页传的id得到相应数据
		$.ajax({
			url:'../api/list.php',
			dataType:'json',
			data:{
				id:id,
				qty:100
			},
			success:function(res){
				// console.log(res);
				// 商品详情
				let pic = res.data.map(item=>{
					if(item.id == id){
						return `
							<div class="pro_pic fc1 clear relative"  data-guid="${item.id}">
								<!-- 缩略图 -->
								<div class="pic_small fl relative">
									<div class="prev jt"></div>
									<div class="next jt"></div>
									<div class="pic_small_li">
										<ul>
											<li><a href="javascript:;"><img class="border" src="../img/${item.imgurl}-1.jpg" alt=""></a></li>
											<li><a href="javascript:;"><img src="../img/${item.imgurl}-2.jpg" alt=""></a></li>
											<li><a href="javascript:;"><img src="../img/${item.imgurl}-3.jpg" alt=""></a></li>
											<li><a href="javascript:;"><img src="../img/${item.imgurl}-4.jpg" alt=""></a></li>
										</ul>							
									</div>
								</div>
								<!-- 大图 -->
								<div class="pic_large fl relative">
									<a href="javascript:;"><img src="../img/${item.imgurl}-1.jpg" data-big="../img/${item.imgurl}-1.jpg" ></a>
								</div>
							</div>
						`;
					}
				}).join('');
				let info = res.data.map(item=>{
					if(item.id == id){
						return `
							<!-- 介绍 -->
							<div class="pro_info pro_list_specific fc1" data-guid="${item.id}">
								<!-- 商品名字 -->
								<h1><a href="/">${item.brand}</a></h1>
								<!-- 品牌 标题	 -->
								<div class="clear">
									<span class="pro_info_tit fl">${item.name}</span>
									<span class="global fl">全球购</span>
								</div>
								<!-- 价格 -->
								<div class="pro_info_pirce">
									<div class="clear span_w55">
										<span>美西价</span><i></i><b>${Number(item.price)}.00</b>
									</div>
								</div>
								<!-- 颜色 -->
								<div class="pro_info_color">
									<div class="clear span_w55">
										<span>颜色</span>
										<ul class="clear">
											<li title="${item.color}">${item.color}</li>
										</ul>
									</div>
								</div>
								<!-- 大小 -->
								<div class="pro_info_size">
									<div class="clear span_w55">
										<span>尺码</span>
										<ul class="clear">
											<li><a href="javascript:;">${item.size}</a></li>
										</ul>
									</div>
									<p><a href="javascript:;">查看尺码说明</a></p>
								</div>
								<!-- 购买按钮 -->
								<div class="pro_info_btn">
									<div class="clear">
										<div class="fl add_buy"><button>即刻购买</button></div>
										<div class="fl add_car"><button>加入购物袋</button></div>
										<!-- 收藏 -->
										<div class="fl pro_collec">
											<a href="javascript:;"></a>
										</div>
										<!-- 分享 -->
										<div class="fl pro_share relative">
											<!-- 默认隐藏  鼠标划过显示 -->
											<div class="share_links absolute dn">
												<div class="jiao absolute"></div>
												<div class="psl_c bg_fff absolute">
													<a class="ps_wx" href="javascript:;"></a>
													<a class="ps_xl" href="javascript:;"></a>
													<a class="ps_qq" href="javascript:;"></a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 到货时间 退货说明 -->
								<div class="pro_info_exp">
									<ul class="clear">
										<li>
											<span>到货时间</span>
											<p>该商品到货时间预计15-20个工作日,具体时间受海关放行效率影响。</p>
										</li>
										<li>
											<span>退货说明</span>
											<p>若该商品无质量问题不支持退换货 </p>
										</li>
									</ul>
								</div>
							</div>
						`;
					}
				}).join('');
				$('.goodspro').html(pic + info);

				// 商品颜色
				switch($('.pro_info_color li').text()){
					case "黑色":
						$('.pro_info_color li').addClass('black');
						break;
					case "白色":
						$('.pro_info_color li').addClass('white');
						break;
					case "红色":
						$('.pro_info_color li').addClass('red');
						break;
					case "蓝色":
						$('.pro_info_color li').addClass('blue');
						break;
					case "绿色":
						$('.pro_info_color li').addClass('green');
						break;
					case "灰色":
						$('.pro_info_color li').addClass('gray');
						break;
					case "多色":
						$('.pro_info_color li').addClass('multicolor');
						break;
				}
				
				// 鼠标移入小图，切换大图路径
				$('.pic_small').on('mouseenter','li',function(){
					$(this).siblings().find('img').removeClass('border');
					$(this).find('img').addClass('border');
					$('.pic_large').find('img').attr({src:$(this).find('img').prop('src')});
					$('.pic_large').find('img').attr('data-big',$(this).find('img').prop('src'));
				});

				// 放大镜
				$('.pic_large').gdszoom({width:390,height:462});

				// 加入购物车
				var num=0;
				var total = 0;
				$('.add_car').click(function(){
					// 添加cookie
					cookie.addCookie($(this),res,goodslist);
					// 顶部购物车
					cookie.renderTop(goodslist);

					// 删除列表商品
					$('.hcc_Lis_del').click(function(){
						$(this).closest('.hcc_info_c_lis').remove();
						// 如果列表为空，隐藏
						if($('.hcc_info_c').has('.hcc_info_c_lis')[0] == undefined){
							$('.hcc_info').hide().siblings().show();
						}
					});



				});
				// 尺寸说明 跳转
				$('.pro_info_size p a').click(function(){
					$(window).scrollTop($('.pro_tab').offset().top);
					$('#tab li').eq(1).addClass('active').siblings().removeClass('active');
					$('.pro_main').eq(1).show().siblings().hide();
				});

				// 分享
				$('.pro_share').on('mouseenter',function(){
					$('.share_links').show();
				}).on('mouseleave',function(){
					$('.share_links').hide();
				});


				// 商品详情大图
				let proImg = res.data.map(item=>{
					if(item.id == id){
						return `
							<ul class="clear">
								<li><img src="../img/${item.imgurl}-1.jpg" alt=""></li>
								<li><img src="../img/${item.imgurl}-2.jpg" alt=""></li>
								<li><img src="../img/${item.imgurl}-3.jpg" alt=""></li>
								<li><img src="../img/${item.imgurl}-4.jpg" alt=""></li>
							</ul>
						`;
					}
				}).join('');
				$('.pro_img').html(proImg);


				// 推荐
				let recomCont = res.data.map(item=>{
					return `
						<li data-guid="${item.id}"><a href="javascript:;">
							<img src="../img/${item.imgurl}-1.jpg" alt="">
							<div class="recom_name">
								<span class="rnt">${item.brand}</span><br>
								<span class="rnm">${item.name}</span><br>
								<span class="rnf">￥${Number(item.price)}.00</span>
							</div>
						</a></li>
					`;
				}).join('');
				$('.recom_cont ul').html(recomCont);

				// 推荐->动画
				var idx = 0;
				var speed = 4;
				var liWidth = $('.recom_cont li').outerWidth(true);
				$('.recom_cont ul').css({width:liWidth*res.qty});
				$('.recom_cont').on('click','.rec_next',function(){
					idx++;
					if(idx > res.qty/speed-1){
						idx = 0;
						$('.recom_cont ul').css({left:30});
					}
					$('.recom_cont ul').stop().animate({left:liWidth*speed*-idx + 30});
				}).on('click','.rec_prev',function(){
					idx--;
					if(idx < 0){
						idx = res.qty/speed -1;
						$('.recom_cont ul').css({left:liWidth*speed*-idx + 30});
					}
					$('.recom_cont ul').stop().animate({left:liWidth*speed*-idx + 30});
				});


				// 即刻购买
				$('.add_buy').on('click','button',function(){
					// console.log(666);
					var id = $(this).closest('.pro_info').data('guid');
					window.location.href = '../html/cart.html?id='+ id;
				});


			}


		});
		
		// 售后，tab标签切换
		$('#tab').on('click','li',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.pro_main').eq($(this).index()).show().siblings().hide();
		});

		// 跳转到详情页，并传送id
		$('.recom_cont').on('click','li',function(){
			var id = $(this).data('guid');
			window.location.href = '../html/details.html?id='+ id;
		});


		// 删除列表商品-->顶部
		$('.hcc_info').on('click','.hcc_Lis_del',function(){
			delPro($(this))
		});

		// 删除商品的 cookie + 页面内容
		function delPro(current){
			// console.log(current[0]);
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