
	define(['jquery','common','cookie'],function($,com,cookie){

		return {

			loginstatus:function(){
				// 判断是否登录
				var meiciuser = getCookie('meiciuser');
				meiciuser = meiciuser ? JSON.parse(meiciuser) : [];
				if(getCookie('meiciuser') != ''){
					var welcome = $('<a/>').text('欢迎你：'+meiciuser);
					$('.login_status').html(welcome);
					$('.exit').show();
				}
				
				// 退出登录
				$('.exit a').on('click',function(){
					var now = new Date('2000-1-1');
					setCookie('meiciuser','null',now.toUTCString(),"/");
					window.location.reload(true);
					var ls = $('<a href="html/register.html">注册</a><a href="html/login.html">登录</a>')
					$('.login_status').html(ls);
					$('.exit').hide();
					return;
				});
				
			}

		}

	});

