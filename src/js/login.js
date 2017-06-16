require(['config'],function(){

	require(['jquery','common'],function($,com){

		// 设置时间戳					 
		var now = new Date();
		now.setDate(now.getFullYear() + 1);

		var on_off = false;

		$('#username').blur(function(){
			var username = $('#username').val();

			if(!/^[1][3-9][\d]{9}$/.test(username)){
				$('.err_out').text('请输入手机号');
			}else{
				$('.err_out').text('');
			}

		});

		$('#password').blur(function(){
			var password = $('#password').val();
			if(!/\S{6,18}/.test(password)){
				$('.err_out').text('请输入密码');
				return ;
			}else{
				$('.err_out').text('');
			}

		});

		function formValidation(){
			var username = $('#username').val();
			var password = $('#password').val();

			if(!/^[1][3-9][\d]{9}$/.test(username)){
				$('.err_out').text('请输入手机号');
				return ;
			}else{
				$('.err_out').text('');
				if(!/\S{6,18}/.test(password)){
					$('.err_out').text('请输入密码');
					return ;
				}else{
					$('.err_out').text('');
				}
			}

			on_off = true;
		}

		$('.login_btn').on('click',function(){

			formValidation();

			if(on_off){

				$.ajax({
					url:'../api/login.php',
					data:{
						username:$('#username').val(),
						password:$('#password').val()
					},
					success:function(res){
						console.log(res);
						if(res == 1){
							
							$('.err_out').text('');
							var pswd = $('#password').val();
							var pswdjm = '';
							for(var i=0;i<pswd.length;i++){
								pswdjm += pswd[i].charCodeAt()*5-10;
							}

							// 是否保存cookie
							if($('#login_auto')[0].checked){
								// 长期保存
								setCookie('meiciuser',$('#username').val(),now.toUTCString(),"/");
								setCookie('meicipswd',pswdjm,now.toUTCString(),"/");

							}else{
								// 当前使用
								now.setDate(now.getDate);
								setCookie('meiciuser',$('#username').val(),now.toUTCString(),"/");
								setCookie('meicipswd',pswdjm,now.toUTCString(),"/");

							}

							history.back();
						}else{
							$('.err_out').text('用户名或密码错误');
						}
					}

				});

			}

		});


	});

});