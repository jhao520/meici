require(['config'],function(){

	require(['jquery','animation','gdszoom','common','cookie'],function($,animation,gdsz,com,cookie){

		// 导航 鼠标划过显示
		animation.nav();
		// 顶部app二维码
		animation.sideApp($('.down_ewm_app'),$('.down_app'));
		// 右侧边栏app二维码
		animation.sideApp($('.sidebar_app'),$('.side_app_ewm')); 
		// 顶部购物车
		animation.sideApp($('.shoping_car'),$('.header_car')); 
		// 返回顶部
		animation.toTop();


		// 请求数据
		$.ajax({
			url:'../api/list.php',
			dataType:'json',
			success:function(res){
				console.log(res);

				// 猜你喜欢
				let carProRec = res.data.map(item=>{
					return `
						<li class="pro_list_specific" data-guid="${item.id}">
							<a href="javascript:;" class="db">
								<img src="../img/${item.imgurl}-1.jpg" alt="">
								<div class="car_rec_name">
									<span class="rnt">${item.brand}</span><br>
									<span class="rnm">${item.name}</span>
								</div>
							</a>
							<div class="car_rec_pri">${item.price}.00</div>
							<div><a class="add_car" href="javascript:;">添加到购物袋</a></div>
						</li>
					`;
				}).join('');
				$('.car_rec_cont ul').html(carProRec);

				// 推荐->动画
				var idx = 0;
				var speed = 4;
				var liWidth = $('.car_rec_cont li').outerWidth(true);
				$('.car_rec_cont ul').css({width:liWidth*res.qty});
				$('.car_rec_cont').on('click','.car_rec_next',function(){
					idx++;
					if(idx > res.qty/speed-1){
						idx = 0;
						$('.car_rec_cont ul').css({left:30});
					}
					$('.car_rec_cont ul').stop().animate({left:liWidth*speed*-idx+30});
				}).on('click','.car_rec_prev',function(){
					idx--;
					if(idx < 0){
						idx = res.qty/speed -1;
						$('.car_rec_cont ul').css({left:liWidth*speed*-idx+30});
					}
					$('.car_rec_cont ul').stop().animate({left:liWidth*speed*-idx+30});
				});

				// 加入购物车
				$('.car_rec_cont').on('click','.add_car',function(){
					addCookie($(this));
				});

				// 设置cookie
				var goodslist = getCookie('goodslist');
				goodslist = goodslist ? JSON.parse(goodslist) : [];
				// 数量加
				function addCookie(current){

					var $curLi = current.closest('.pro_list_specific');
					var guid = $curLi.data('guid');
					for(var i=0;i<goodslist.length;i++){
						if(goodslist[i].guid === guid){
							goodslist[i].qty++;
							break;
						}
					}

					if(i===goodslist.length){
						var goods = {
							guid:guid,
							imgurl:$curLi.find('img').attr('src'),
							brand:$curLi.find('.rnt').text(),
							name:$curLi.find('.rnm').text(),
							price:$curLi.find('.car_rec_pri').text(),
							qty:1
						}

						goodslist.push(goods);
					}
					setCookie('goodslist',JSON.stringify(goodslist));
					renderTop();
					renderDoc();

				}


				renderTop();
				function renderTop(){
					var total = 0;
					// 写入顶部购物车
					let hcarli = goodslist.map(item=>{
						total += item.price*item.qty;
						return `
							<!-- 商品列表 -->
							<div  class="hcc_info_c_lis relative clear pro_list_specific" data-guid="${item.guid}">
								<div class="hcc_lis_img fl">
									<a href="javascript:;"><img src="${item.imgurl}" alt=""></a>
								</div>
								<div class="hcc_lis_con fl">
									<span class="hlc_name full_line">
										<a href="javascript:;">${item.brand}</a>
									</span>
									<span class="c_gray full_line">${item.name}</span>
									<span class="global">全球购</span>
									<span class="hcc_price">${item.price}</span>
									<span class="hcc_number c_gray">${item.qty}</span>
								</div>
								<div class="hcc_Lis_del absolute">╳</div>
							</div>
						`;
					}).join('');
					$('.hcc_info_c').html(hcarli);
					// 写入总价
					$('.hcc_total_price').text(total);

					$('.hcc_info').show().siblings().hide();
					if($('.hcc_info_c').has('.hcc_info_c_lis')[0] == undefined){
						$('.hcc_info').hide().siblings().show();
					}
				}


				renderDoc();
				function renderDoc(){
					var total = 0;
					var pro_num = 0;
					// 写入页面购物车
					let carli = goodslist.map(item=>{
						total += item.price*item.qty;
						pro_num += item.qty;
						return `
							<tr data-guid="${item.guid}" class="clear pro_list_specific">
								<td class="ccl_con center relative clear">
									<input type="checkbox" checked>
									<div class="ccl_img fl"><a href="javascript:;"><img src="${item.imgurl}" alt=""></a></div>
									<div class="ccl_info fl">
										<div class="ccl_name">
											<a href="javascript:;">
												<span>${item.brand}</span><br><span>${item.name}</span>
											</a>
										</div>
										<div class="ccl_prop">
											<span class="ccl_color">颜色：${item.color}</span><br>
											<span class="global">全球购</span>
										</div>
									</div>
								</td>
								<td class="ccl_price center cct3">${item.price}</td>
								<td class="center cct4">
									<div class="car_num">
										<div class="car_num_m mauto clear">
											<a class="num_red fl" href="javascript:;">-</a>
											<input type="text" class="car_int fl" value="${item.qty}">
											<a class="num_add fr" href="javascript:;">+</a>
										</div>
									</div>
								</td>
								<td class="center lh144 cct5">￥<span class="subtotal">${item.price*item.qty}</span></td>
								<td class="center">
									<div class="center ccl_btn mauto">
										<a href="javascript:;">加入收藏</a><br>
										<a class="ccl_del" href="javascript:;">删除</a>
									</div>
								</td>
							</tr>
						`;
					}).join('');
					$('.cart_con_list table').html(carli);
					// 写入总价
					$('.pro_total').text(total);
					$('.pro_num').text(pro_num);

					$('.cart_content').show();
					$('.cart_none').hide();

					if($('.cart_con_list table').has('tr')[0] == undefined){
						$('.cart_content').hide();
						$('.cart_none').show();
					}

				}

				// 数量加
				$('.cart_con_list').on('click','.num_add',function(){
					addCookie($(this));
				})
				// 数量减
				.on('click','.num_red',function(){
					
					var guid = $(this).closest('.pro_list_specific').data('guid');

					for(var i=0;i<goodslist.length;i++){
						if(goodslist[i].guid === guid){

							goodslist[i].qty--;

							if(goodslist[i].qty <= 0){
								goodslist[i].qty = 0;
							}
							setCookie('goodslist',JSON.stringify(goodslist));
							break;
						}
					}			
					renderTop();
					renderDoc();
					
				})
				// 弹窗确认
				.on('click','.ccl_del',function(){
					$('.pop_up').show();
				});

				// 删除列表商品-->页面
				$('.pop_up').on('click','.p_yes',function(){
					delCookie($('.ccl_del'));
					$('.pop_up').hide();
				}).on('click','.p_no',function(){
					$('.pop_up').hide();
				}).on('click','.p_box_close',function(){
					$('.pop_up').hide();
				});

				// 删除列表商品-->顶部
				$('.hcc_info').on('click','.hcc_Lis_del',function(){
					delCookie($(this));
				});

				// 删除cookie
				function delCookie(current){

					var guid = current.closest('.pro_list_specific').data('guid');
					console.log(guid);

					for(var i=0;i<goodslist.length;i++){
						if(goodslist[i].guid === guid){
							goodslist.splice(i,1);
							console.log(i,1)
							setCookie('goodslist',JSON.stringify(goodslist));
							break;
						}
					}

					renderTop();
					renderDoc();
					
					if($('.hcc_info_c').has('.hcc_info_c_lis')[0] == undefined){
						$('.hcc_info').hide().siblings().show();
					}

					if($('.cart_con_list table').has('tr')[0] == undefined){
						$('.cart_content').hide();
						$('.cart_none').show();
					}

				}

			}

		});

	});

});