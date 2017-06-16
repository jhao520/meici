
	define(['jquery','common','cookie'],function($,com,cookie){

		return {

			addCookie:function(current,res,goodslist){
				// 设置时间戳					 
				var now = new Date();
				now.setDate(now.getFullYear() + 1);

				var $curLi = current.closest('.pro_list_specific');
				var guid = $curLi.data('guid');

				res.data.map(item=>{

					if(item.id == guid){
						for(var i=0;i<goodslist.length;i++){
							if(goodslist[i].guid === guid){
								goodslist[i].qty++;
								break;
							}
						}

						if(i===goodslist.length){
							var goods = {
								guid:guid,
								imgurl:`/pro/img/${item.imgurl}-1.jpg`,
								brand:item.brand,
								name:item.name,
								price:Number(item.price),
								color:item.color,
								size:item.size,
								qty:1
							}

							goodslist.push(goods);
						}

						setCookie('goodslist',JSON.stringify(goodslist),now.toUTCString(),"/");
		
					}
		
				});


			},
		
			delCookie:function(current,goodslist){
				// 设置时间戳					 
				var now = new Date();
				now.setDate(now.getFullYear() + 1);

				var guid = current.closest('.pro_list_specific').data('guid');

				for(var i=0;i<goodslist.length;i++){
					if(goodslist[i].guid === guid){
						goodslist.splice(i,1);

						setCookie('goodslist',JSON.stringify(goodslist),now.toUTCString(),"/");
						break;
					}
				}

			},

			// 顶部购物车
			renderTop:function(goodslist){
				// 总价
				var total = 0;
				// 总数
				var pro_num = 0;
				// 写入顶部购物车
				let hcarli = goodslist.map(item=>{
					total += item.price*item.qty;
					pro_num += item.qty;
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
								<span class="hcc_price">${Number(item.price)}</span>
								<span class="hcc_number c_gray">${item.qty}</span>
							</div>
							<div class="hcc_Lis_del absolute">╳</div>
						</div>
					`;
				}).join('');
				$('.hcc_info_c').html(hcarli);

				// 写入总价
				$('.hcc_total_price').text(total);
				// 写入总数
				$('.pro_num').text(pro_num);

				// 如果商品数量为空，隐藏列表，显示提示为空
				$('.hcc_info').show().siblings().hide();
				if($('.hcc_info_c').has('.hcc_info_c_lis')[0] == undefined){
					$('.hcc_info').hide().siblings().show();
					$('.pro_num').text(0);
				}

				// 跳转到详情页，并传送id
				$('.hcc_info_c').on('click','a',function(){
					var id = $(this).closest('.hcc_info_c_lis').data('guid');
					window.location.href = '/pro/html/details.html?id='+ id;
				});

			},

			// 页面购物车
			renderDoc:function(goodslist){
				var total = 0;
				var pro_num = 0;
				// 写入页面购物车
				let carli = goodslist.map(item=>{
					total += item.price*item.qty;
					pro_num += item.qty;
					return `
						<tr data-guid="${item.guid}" class="clear pro_list_specific">
							<td class="ccl_con center relative clear">
								<input type="checkbox" class="ccl_check" checked>
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
							<td class="ccl_price center cct3">￥${Number(item.price)}</td>
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
				// 写入总数
				$('.pro_num').text(pro_num);

				$('.cart_content').show();
				$('.cart_none').hide();

				// 如果商品数量为空，隐藏列表，显示提示为空
				if($('.cart_con_list table').has('tr')[0] == undefined){
					$('.cart_content').hide();
					$('.cart_none').show();
				}

			}

		}

	});

