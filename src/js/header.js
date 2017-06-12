define(['jquery'],function($){
	return {
		// 导航 鼠标划过显示
		nav:function(){
			$('#nav').on('mouseenter','.nav_t li',function(){
				$(this).siblings().find('i').hide();
				$(this).find('i').show()
				$('.nav_menu').eq($(this).index()).show().siblings().hide();
			}).on('mouseleave',function(){
				$('.nav_menu').hide();
				$('.nav_t').find('i').hide();
			});
			// $('.nav_menu').on('mouseleave',function(){
			// 	$(this).hide();
			// 	$('.nav_t').find('i').hide();
			// });

		},

		slides:function(){

		}

	}

});