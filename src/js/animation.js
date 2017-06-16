define(['jquery'],function($){
	return {
		// 导航 鼠标划过显示
		nav:function(){
			var timeout;
			$('#nav').on('mouseenter','.nav_t li',function(){
				$(this).siblings().find('i').hide();
				clearTimeout(timeout);
				timeout = setTimeout(()=>{
					$(this).find('i').stop().show();
					$('.nav_menu').eq($(this).index()).stop(true,true).show().siblings().hide();

				},300);
			}).on('mouseleave',function(){
				clearTimeout(timeout);
				$('.nav_menu').hide();
				$('.nav_t').find('i').hide();
			});
		},

		// 轮播图
		slides:function(){
			var $ban = $('.banner');
			var $ul = $ban.find('ul');
			var $li = $ban.find('ul li');
			$ban.find('li').eq(0).clone().appendTo($ul);
			var index = 0;

			clearInterval(timer);
			var timer = setInterval(next,3000);

			$ban.on('mouseenter',function(){
				$ul.siblings().show();
				clearInterval(timer);
			}).on('mouseleave',function(){
				$ul.siblings().hide();
				timer = setInterval(next,3000);
			});

			$('.ban_prev').click(function(){
				if(index <= 0){
					index = $li.length;
					$ul.css({left:$li.outerWidth()*-index});
				}
				index--;
				show();
			});
			$('.ban_next').click(function(){
				next();
			});
			function next(){
				index++;
				if(index > $li.length){
					index = 1;
					$ul.css({left:0});
				}
				show();
			}
			function show(){
				$ul.stop().animate({left:$li.outerWidth()*-index});
			}
		},

		// 滚动图
		roll:function(){
			var idx = 0;
			var $ul = $('.sold_ul');
			var $li = $('.sold_ul li');
			var speed = $li.outerWidth(true);
			var timer = setInterval(next,2000);

			$('.being_sold').on('mouseenter',function(){
				clearInterval(timer);
			}).on('mouseleave',function(){
				timer = setInterval(next,2000);
			});

			$('.rec_prev').click(function(){
				if(idx <= 0){
					idx = $('.sold_ul li').length-5;
					$ul.css({left:speed*-idx});
				}
				idx--;
				rolling();
			});

			$('.rec_next').click(function(){
				next();
			});

			function next(){
				idx++;
				if(idx > $('.sold_ul li').length-6){
					idx = 0;
					$('.sold_ul').css({left:speed})
				}
				rolling();
			}

			function rolling(){
				$('.sold_ul').css({width:speed*$('.sold_ul li').length})
				.stop().animate({left:speed*-idx});
			}

		},

		// 鼠标划过显示
		sideApp:function(sel,ect){
			sel.on('mouseenter',function(){
				ect.stop().fadeIn('fast');
			}).on('mouseleave',function(){
				ect.stop().fadeOut('fast');
			});
		},

		// 返回顶部
		toTop:function(){
			$('.to_top').click(function(){
				console.log(document.offset);
				$(window).scrollTop(0);
			});
		}


	}

});