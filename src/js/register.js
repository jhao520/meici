require(['config'],function(){

	require(['jquery','common'],function($,com){

		// 设置时间戳					 
		var now = new Date();
		now.setDate(now.getFullYear() + 1);


		var on_off = false;

		$('#username').blur(function(){
			var username = $('#username').val();

			if(!/^[1][3-9][\d]{9}$/.test(username)){
				$('.err_out').text('请输入正确的手机号');
			}else{
				$('.err_out').text('');

				$.ajax({
					url:'../api/login.php',
					data:{
						username:$('#username').val(),
						password:$('#password').val()
					},
					success:function(res){
						console.log(res)
						if(res == 1){
							$('.err_out').text('此用户已存在');
							return;
						}
					}

				});

			}

		});

		$('#password').blur(function(){
			var password = $('#password').val();
			var password2 = $('#password2').val();

			if(!/\S{6,18}/.test(password)){
				$('.err_out').text('请输入6-18位密码');
				return ;
			}else{
				$('.err_out').text('');
			}

		});


		function formValidation(){

			var username = $('#username').val();
			var password = $('#password').val();
			var password2 = $('#password2').val();

			if(!/^[1][3-9][\d]{9}$/.test(username)){
				$('.err_out').text('请输入正确的手机号');
				return ;
			}else{
				$('.err_out').text('');
				if(!/\S{6,18}/.test(password)){
					$('.err_out').text('请输入6-18位密码');
					return ;
				}else{
					$('.err_out').text('');
					if(password != password2){
						$('.err_out').text('两次输入的密码不一致');
						return ;
					}else{
						$('.err_out').text('');
					}
				}
			}

			on_off = true;
		}

		$('.login_btn').on('click',function(){

			formValidation();
			if(on_off){

				$.ajax({
					url:'../api/reg.php',
					data:{
						username:$('#username').val(),
						password:$('#password').val()
					},
					success:function(res){
						console.log(res)
						if(res == 1){
							$('.err_out').text('此用户已存在');
							return;
						}else{
							var pswd = $('#password').val();
							var pswdjm = '';
							for(var i=0;i<pswd.length;i++){
								pswdjm += pswd[i].charCodeAt()*5-10;
							}

							setCookie('meiciuser',$('#username').val(),now.toUTCString(),"/");
							setCookie('meicipswd',pswdjm,now.toUTCString(),"/");

							window.location.href = "../index.html";

						}

					}

				});

			}
		
		});

	});

});