// import baseUrl from '../baseUrl';
let baseUrl='https://produce.huainannet.com'; // 数据的请求接口前缀
import qs from 'qs' // 处理data
const request = (params) => {
	/*
	 * 1.初始化值
	 */
	let _self = this;
	let url = params.url;
	let method = params.method || 'GET';
	let data = params.data || {};
	/*
	 * 3.添加头部
	 */
	let defaultOpot = {
		'Terminal-Type': 'innerH5',
		'Content-Type': 'application/json;charset=UTF-8',
	}
	/*
	 * 4.处理 POST
	 */
	let header = {}
	method = method.toUpperCase()
	if (method == 'POST') {
		header = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
		data = qs.stringify(data)
	}
	// 5.请求地址
	const requestUrl = baseUrl + url;
	uni.showLoading({
		title: '加载中...'
	});
	// 6.用 Promise 创建回调
	return new Promise((resolve, reject) => {
		uni.request({
				url: requestUrl,
				method: method,
				header: Object.assign({}, defaultOpot, header),
				data: data,
				dataType: 'json',
			})
			.then(res => { // 成功
				if (res[1] && res[1].statusCode === 200) {
					let {
						data: dataType
					} = res[1]
					switch (dataType.code * 1) { // 拦截返回参数
						case 0:
							resolve(dataType)
							break;
						case 200:
							resolve(dataType)
							break;
						case 1003:
							uni.showModal({
								title: '登录已过期',
								content: '很抱歉，登录已过期，请重新登录',
								confirmText: '重新登录',
								success: function(res) {
									if (res.confirm) { // 点击确定
										//去登录页面
										console.log('用户');
										uni.navigateTo({
											// 切记这儿需要哈pages.json保持一致；不能有.vue后缀
											url: '/pages/views/login/index'
										});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
							break;
						case -1:
							uni.showModal({
								title: '请求数据失败',
								content: '获取数据失败！',
								confirmText: '确定',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
							break
					}
				}
			})
			.catch(err => { // 错误
				reject(err)
			})
			.finally(() => {
				console.log('不管是否成功都要执行')
				uni.hideLoading();
			})
	})
}
export default request