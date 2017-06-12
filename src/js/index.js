require(['config'],function(){
	require(['jquery','animation'],function($,animation){

		// 导航 鼠标划过显示
		animation.nav();
		// banner图轮播
		animation.slides();
		// 产品展示轮播
		animation.roll();

	});
});