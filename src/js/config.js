require.config({
	// baseUrl:'js',

	// 防止缓存
	urlArgs: 'v='+Date.now(),

	// 配置别名
	paths:{
		'jquery':'../lib/jquery-3.2.1',

		'gdszoom':'../lib/jquery-gdszoom/jquery.gdszoom'

	},

	// 添加依赖
	shim:{
		'gdszoom':['jquery']
	}
	
	
});