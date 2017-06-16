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
		// 返回顶部
		animation.toTop();

		// 设置时间戳					 
		var now = new Date();
		now.setDate(now.getFullYear() + 1);
		// 检测cookie
		var goodslist = getCookie('goodslist');
		goodslist = goodslist ? JSON.parse(goodslist) : [];
		// 顶部购物车
		cookie.renderTop(goodslist);
		// 页面购物车
		cookie.renderDoc(goodslist);

		// 请求数据
		$.ajax({
			url:'../api/list.php',
			dataType:'json',
			data:{
				qty:100
			},
			success:function(res){
				// console.log(res);

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
							<div class="car_rec_pri">￥${Number(item.price)}.00</div>
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
					cookie.addCookie($(this),res,goodslist);
					cookie.renderTop(goodslist.reverse());
					cookie.renderDoc(goodslist);
				});


				// 数量加
				$('.cart_con_list').on('click','.num_add',function(){
					cookie.addCookie($(this),res,goodslist);
					cookie.renderTop(goodslist);
					cookie.renderDoc(goodslist);
				})
				// 数量减
				.on('click','.num_red',function(){
					
					var guid = $(this).closest('.pro_list_specific').data('guid');

					for(var i=0;i<goodslist.length;i++){
						if(goodslist[i].guid === guid){

							goodslist[i].qty--;

							if(goodslist[i].qty <= 1){
								goodslist[i].qty = 1;
							}

							setCookie('goodslist',JSON.stringify(goodslist),now.toUTCString());
							break;
						}
					}			
					cookie.renderTop(goodslist);
					cookie.renderDoc(goodslist);

				})
				// 弹窗确认
				.on('click','.ccl_del',function(){
					$('.pop_up').show();
				});


				// 勾选
				$('.cart_content').on('click','.ccl_check',function(){

					var $pro_Num = $('.cart_con_bar').find('.pro_num').text()*1;
					var $pro_total = $('.pro_total').text()*1;
					var thePrice = $(this).closest('.pro_list_specific').find('.subtotal').text()*1;
					var theNum = $(this).closest('.pro_list_specific').find('.car_int').val()*1;

					// console.log($pro_Num,theNum,$pro_total,thePrice)
					if(!this.checked){
						// 写入总价
						$('.pro_total').text($pro_total-thePrice);
						// 写入总数
						$('.cart_con_bar').find('.pro_num').text($pro_Num-theNum);

						
					}else{
						// 写入总价
						$('.pro_total').text($pro_total+thePrice);
						// 写入总数
						$('.cart_con_bar').find('.pro_num').text($pro_Num+theNum);
					}
					gouxuan(this);

				}).on('click','.allcpro input',function(){
					console.log($pro_Num,$pro_total)
					if(!this.checked){
						$('.allcpro input').prop({checked:false});
						$('.ccl_check').prop({checked:false});
						// 写入总价
						$('.pro_total').text(0);
						// 写入总数
						$('.cart_con_bar').find('.pro_num').text(0);
						return;
					}else{
						$('.allcpro input').prop({checked:true});
						$('.ccl_check').prop({checked:true});
						// 写入总价
						$('.pro_total').text($pro_total);
						// 写入总数
						$('.cart_con_bar').find('.pro_num').text($pro_Num);
					}
				});
				function gouxuan(the){
					$('.ccl_check').each(function(i){
						if(!the.checked){
							$('.allcpro input').prop({checked:false});
							return;
						}else{
							$('.allcpro input').prop({checked:true});
						}
					})
				}


				// 删除列表商品-->页面
				$('.pop_up').on('click','.p_yes',function(){
					delPro($('.ccl_del'));
					$('.pop_up').hide();
				}).on('click','.p_no',function(){
					$('.pop_up').hide();
				}).on('click','.p_box_close',function(){
					$('.pop_up').hide();
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

			}

		});

		// 跳转到详情页，并传送id
		$('.car_rec_cont').on('click','li .db',function(){
			var id = $(this).closest('.pro_list_specific').data('guid');
			window.location.href = '../html/details.html?id='+ id;
		});


	});

});