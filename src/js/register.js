require(['config'],function(){

	require(['jquery'],function($){

		$('.login_btn').on('click',function(){
			database();
		});

		$('#username').blur(function(){
			database();
		});


		function database(){
			$.ajax({
				url:'../api/reg.php',
				data:{
					username:$('#username').val(),
					password:$('#password').val()
				},
				success:function(res){
					var username = $('#username').val();

					if(username != res){
						$('.err_out').text('');
					}else{
						$('.err_out').text('此用户名已被占用');
					}
				}

			});
		}

	});

});