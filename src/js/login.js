require(['config'],function(){

	require(['jquery'],function($){

		$('.login_btn').on('click',function(){
			database();
		});


		function database(){
			$.ajax({
				url:'../api/login.php',
				data:{
					username:$('#username').val(),
					password:$('#password').val()
				},
				success:function(res){

					if(res){
						console.log(res);
						$('.err_out').text('');
						window.location.href = "../index.html";
					}else{
						$('.err_out').text('用户名或密码错误');
					}
				}

			});
		}

	});

});