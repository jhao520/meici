require(['config'],function(){
	require(['jquery','animation','gdszoom','common','cookie'],function($,animation,gdsz,com,cookie){

		// 导航 鼠标划过显示
		animation.nav();
		// banner图轮播
		animation.slides();
		// 产品展示轮播
		animation.roll();
		// 顶部app二维码
		animation.sideApp($('.down_ewm_app'),$('.down_app'));
		// 右侧边栏app二维码
		animation.sideApp($('.sidebar_app'),$('.side_app_ewm')); 
		// 顶部购物车
		animation.sideApp($('.shoping_car'),$('.header_car')); 


		var goodslist = getCookie('goodslist');
		goodslist = goodslist ? JSON.parse(goodslist) : [];

		console.log(goodslist);


	});
});