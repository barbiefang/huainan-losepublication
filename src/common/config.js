let url_config = ""

if(process.env.NODE_ENV === 'development'){
	 // url_config = 'http://36.139.83.189:9000/'  // 测试  
	 // url_config = 'http://112.30.211.206:9000/'  // 灰度 
	 url_config = 'https://produce.huainannet.com/'  // 生产

}else{
	 // url_config = 'http://36.139.83.189:9000/' //测试
	 // url_config = 'http://112.30.211.206:9000/'  // 灰度 
	url_config = 'https://produce.huainannet.com' // 生产
}
export default url_config
